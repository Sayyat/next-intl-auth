import {z, ZodIssue} from "zod";
import {TranslationValues} from "use-intl";

// This function accepts a translator function and returns a translated schema.
export const createCommonStateSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z.object({
        jobStep: z.object({label: z.string(), activity: z.string()}, {
            required_error: t("jobStep.required"),
            invalid_type_error: t("jobStep.invalid_type"),
        }),
        city: z
            .object({id: z.number()}, {
                required_error: t("city.required"),
                invalid_type_error: t("city.invalid_type"),
            }),
        objectName: z
            .string({
                required_error: t("objectName.required"),
                invalid_type_error: t("objectName.invalid_type"),
            })
            .nonempty(t("objectName.required")),
    });
};


// Define the error format for the store
export type TCommonErrorsMap = {
    jobStep?: { _errors: string[] };
    city?: { _errors: string[] };
    objectName?: { _errors: string[] };
};


// This function will handle the conversion from Zod errors to our deep structure
export const zodErrors2CommonErrorsMap = (errors: ZodIssue[]): TCommonErrorsMap => {
    const errorFormat: TCommonErrorsMap = {};

    errors.forEach((error) => {
        const path = error.path.join('.'); // Join path array to get a string path (e.g. 'deal.dealNumber')
        const message = error.message;

        const pathSegments = path.split('.');

        let currentLevel: any = errorFormat;

        // Loop over the path segments and ensure the correct structure for each
        for (let i = 0; i < pathSegments.length - 1; i++) {
            const segment = pathSegments[i] as keyof TCommonErrorsMap;

            // If currentLevel doesn't have this segment, create an empty object with _errors array
            if (!currentLevel[segment]) {
                currentLevel[segment] = {};
            }

            currentLevel = currentLevel[segment];
        }

        const lastSegment = pathSegments[pathSegments.length - 1] as keyof TCommonErrorsMap;

        // Ensure the last segment has the `_errors` field and push the message into it
        if (!currentLevel[lastSegment]) {
            currentLevel[lastSegment] = {_errors: []};
        }

        // Add the error message to the _errors array
        currentLevel[lastSegment]._errors.push(message);
    });

    return errorFormat;
};