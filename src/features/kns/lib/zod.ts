import {z, ZodIssue} from "zod";
import {TranslationValues} from "use-intl";

// This function accepts a translator function and returns a translated schema.
export const createKnsStateSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z.object({
        deal: z.object({
            dealNumber: z.string({
                required_error: t("deal.dealNumber.required"),
                invalid_type_error: t("deal.dealNumber.invalid_type"),
            }),
            knsNumber: z.string({
                required_error: t("deal.knsNumber.required"),
                invalid_type_error: t("deal.knsNumber.invalid_type"),
            })
        }),
        initialData: z.object({
            flowRate: z
                .number({
                    required_error: t("initialData.flowRate.required"),
                    invalid_type_error: t("initialData.flowRate.invalid_type"),
                })
                .min(0, {message: t("initialData.flowRate.nonnegative")}),
            pressure: z
                .number({
                    required_error: t("initialData.pressure.required"),
                    invalid_type_error: t("initialData.pressure.invalid_type"),
                })
                .min(0, {message: t("initialData.pressure.nonnegative")}),
            price: z
                .number({
                    required_error: t("initialData.price.required"),
                    invalid_type_error: t("initialData.price.invalid_type"),
                })
                .min(0, {message: t("initialData.price.nonnegative")}),
            controlCabinet: z.object({
                id: z.number(),
                value: z.number(),
            }, {
                required_error: t("initialData.controlCabinet.required"),
                invalid_type_error: t("initialData.controlCabinet.invalid_type"),
            }),
        }).required(),

        supplyManifold: z.object({
            depth: z
                .number({
                    required_error: t("supplyManifold.depth.required"),
                    invalid_type_error: t("supplyManifold.depth.invalid_type"),
                })
                .min(0, {message: t("supplyManifold.depth.nonnegative")}),
            amount: z
                .number({
                    required_error: t("supplyManifold.amount.required"),
                    invalid_type_error: t("supplyManifold.amount.invalid_type"),
                })
                .min(0, {message: t("supplyManifold.amount.nonnegative")}),
            diameter: z
                .object({id: z.number()}, {
                    required_error: t("supplyManifold.diameter.required"),
                    invalid_type_error: t("supplyManifold.diameter.invalid_type"),
                }),
        }),

        pressureCollector: z.object({
            depth: z
                .number({
                    required_error: t("pressureCollector.depth.required"),
                    invalid_type_error: t("pressureCollector.depth.invalid_type"),
                })
                .min(0, {message: t("pressureCollector.depth.nonnegative")}),
            amount: z
                .object({id: z.number()}, {
                    required_error: t("pressureCollector.amount.required"),
                    invalid_type_error: t("pressureCollector.amount.invalid_type"),
                }),
            diameter: z
                .object({id: z.number()}, {
                    required_error: t("pressureCollector.diameter.required"),
                    invalid_type_error: t("pressureCollector.diameter.invalid_type"),
                }),
        }),

        pump: z.object({
            working: z
                .number({
                    required_error: t("pump.working.required"),
                    invalid_type_error: t("pump.working.invalid_type"),
                })
                .min(0, {message: t("pump.working.nonnegative")}),
            reserve: z
                .number({
                    required_error: t("pump.reserve.required"),
                    invalid_type_error: t("pump.reserve.invalid_type"),
                })
                .min(0, {message: t("pump.reserve.nonnegative")}),
            pressurePipeDiameter: z
                .object({id: z.number()}, {
                    required_error: t("pump.pressurePipeDiameter.required"),
                    invalid_type_error: t("pump.pressurePipeDiameter.invalid_type"),
                }),
            pipeGuideDiameter: z
                .object({id: z.number()}, {
                    required_error: t("pump.pipeGuideDiameter.required"),
                    invalid_type_error: t("pump.pipeGuideDiameter.invalid_type"),
                }),
            height: z
                .number({
                    required_error: t("pump.height.required"),
                    invalid_type_error: t("pump.height.invalid_type"),
                })
                .min(0, {message: t("pump.height.nonnegative")}),
            diameter: z
                .number({
                    required_error: t("pump.diameter.required"),
                    invalid_type_error: t("pump.diameter.invalid_type"),
                })
                .min(0, {message: t("pump.diameter.nonnegative")}),
            length: z
                .number({
                    required_error: t("pump.length.required"),
                    invalid_type_error: t("pump.length.invalid_type"),
                })
                .min(0, {message: t("pump.length.nonnegative")}),
            width: z
                .number({
                    required_error: t("pump.width.required"),
                    invalid_type_error: t("pump.width.invalid_type"),
                })
                .min(0, {message: t("pump.width.nonnegative")}),
            startsPerHour: z
                .number({
                    required_error: t("pump.startsPerHour.required"),
                    invalid_type_error: t("pump.startsPerHour.invalid_type"),
                })
                .min(0, {message: t("pump.startsPerHour.nonnegative")}),
            totalStarts: z
                .number({
                    required_error: t("pump.totalStarts.required"),
                    invalid_type_error: t("pump.totalStarts.invalid_type"),
                })
                .min(0, {message: t("pump.totalStarts.nonnegative")}),
            power: z
                .number({
                    required_error: t("pump.power.required"),
                    invalid_type_error: t("pump.power.invalid_type"),
                })
                .min(0, {message: t("pump.power.nonnegative")}),
            amperage: z
                .number({
                    required_error: t("pump.amperage.required"),
                    invalid_type_error: t("pump.amperage.invalid_type"),
                })
                .min(0, {message: t("pump.amperage.nonnegative")}),
            weight: z
                .number({
                    required_error: t("pump.weight.required"),
                    invalid_type_error: t("pump.weight.invalid_type"),
                })
                .min(0, {message: t("pump.weight.nonnegative")}),
        }),

        dimensionCalculations: z.object({
            recommendedDiameter: z
                .number({
                    required_error: t("dimensionCalculations.recommendedDiameter.required"),
                    invalid_type_error: t("dimensionCalculations.recommendedDiameter.invalid_type"),
                })
                .min(0, {
                    message: t("dimensionCalculations.recommendedDiameter.nonnegative"),
                }),
            recommendedHeight: z
                .number({
                    required_error: t("dimensionCalculations.recommendedHeight.required"),
                    invalid_type_error: t("dimensionCalculations.recommendedHeight.invalid_type"),
                })
                .min(0, {
                    message: t("dimensionCalculations.recommendedHeight.nonnegative"),
                }),
        }),

        accordingCustomerRequirementsDimensionCalculations: z.object({
            requiredDiameter: z
                .object({id: z.number()}, {
                    required_error: t("accordingCustomerRequirementsDimensionCalculations.requiredDiameter.required"),
                    invalid_type_error: t("accordingCustomerRequirementsDimensionCalculations.requiredDiameter.invalid_type"),
                }),
            allowableHeight: z
                .number({
                    required_error: t("accordingCustomerRequirementsDimensionCalculations.allowableHeight.required"),
                    invalid_type_error: t("accordingCustomerRequirementsDimensionCalculations.allowableHeight.invalid_type"),
                })
                .min(0, {
                    message: t("accordingCustomerRequirementsDimensionCalculations.allowableHeight.nonnegative"),
                }),
        }),

        acceptedDimensions: z.object({
            height: z
                .object({id: z.number()}, {
                    required_error: t("acceptedDimensions.height.required"),
                    invalid_type_error: t("acceptedDimensions.height.invalid_type"),
                }),
            diameter: z
                .object({id: z.number()}, {
                    required_error: t("acceptedDimensions.diameter.required"),
                    invalid_type_error: t("acceptedDimensions.diameter.invalid_type"),
                })
        }),

        additionalEquipmentList: z.array(
            z.object({
                power: z
                    .number({
                        required_error: t("additionalEquipment.power.required"),
                        invalid_type_error: t("additionalEquipment.power.invalid_type"),
                    })
                    .min(0, {message: t("additionalEquipment.power.nonnegative")}),
                amperage: z
                    .number({
                        required_error: t("additionalEquipment.amperage.required"),
                        invalid_type_error: t("additionalEquipment.amperage.invalid_type"),
                    })
                    .min(0, {message: t("additionalEquipment.amperage.nonnegative")}),
                amount: z
                    .number({
                        required_error: t("additionalEquipment.amount.required"),
                        invalid_type_error: t("additionalEquipment.amount.invalid_type"),
                    })
                    .min(0, {message: t("additionalEquipment.amount.nonnegative")}),
            })
        ),
    });
};


// Define the error format for the store
export type TKnsErrorsMap = {
    deal?: {
        dealNumber?: { _errors: string[] };
        knsNumber?: { _errors: string[] };
    };
    initialData?: {
        flowRate?: { _errors: string[] };
        pressure?: { _errors: string[] };
        price?: { _errors: string[] };
        controlCabinet?: { _errors: string[] };
    };
    supplyManifold?: {
        diameter?: { _errors: string[] };
        depth?: { _errors: string[] };
        amount?: { _errors: string[] };
    };
    pressureCollector?: {
        diameter?: { _errors: string[] };
        amount?: { _errors: string[] };
        depth?: { _errors: string[] };
    };
    pump?: {
        height?: { _errors: string[] };
        diameter?: { _errors: string[] };
        length?: { _errors: string[] };
        width?: { _errors: string[] };
        working?: { _errors: string[] };
        reserve?: { _errors: string[] };
        startsPerHour?: { _errors: string[] };
        totalStarts?: { _errors: string[] };
        power?: { _errors: string[] };
        amperage?: { _errors: string[] };
        pressurePipeDiameter?: { _errors: string[] };
        pipeGuideDiameter?: { _errors: string[] };
        weight?: { _errors: string[] };
    };

    dimensionCalculations?: {
        recommendedDiameter?: { _errors: string[] };
        recommendedHeight?: { _errors: string[] };
    }

    accordingCustomerRequirementsDimensionCalculations?: {
        requiredDiameter?: { _errors: string[] };
        allowableHeight?: { _errors: string[] };
    }

    acceptedDimensions?: {
        height?: { _errors: string[] };
        diameter?: { _errors: string[] };
    };
    additionalEquipmentList?: Array<{
        power?: { _errors: string[] };
        amperage?: { _errors: string[] };
        amount?: { _errors: string[] };
    }>;
};


// This function will handle the conversion from Zod errors to our deep structure
export const zodErrors2KnsErrorsMap = (errors: ZodIssue[]): TKnsErrorsMap => {
    const errorFormat: TKnsErrorsMap = {};

    errors.forEach((error) => {
        const path = error.path.join('.'); // Join path array to get a string path (e.g. 'deal.dealNumber')
        const message = error.message;

        const pathSegments = path.split('.');

        let currentLevel: any = errorFormat;

        // Loop over the path segments and ensure the correct structure for each
        for (let i = 0; i < pathSegments.length - 1; i++) {
            const segment = pathSegments[i] as keyof TKnsErrorsMap;

            // If currentLevel doesn't have this segment, create an empty object with _errors array
            if (!currentLevel[segment]) {
                currentLevel[segment] = {};
            }

            currentLevel = currentLevel[segment];
        }

        const lastSegment = pathSegments[pathSegments.length - 1] as keyof TKnsErrorsMap;

        // Ensure the last segment has the `_errors` field and push the message into it
        if (!currentLevel[lastSegment]) {
            currentLevel[lastSegment] = {_errors: []};
        }

        // Add the error message to the _errors array
        currentLevel[lastSegment]._errors.push(message);
    });

    return errorFormat;
};