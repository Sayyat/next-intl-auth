import {useTranslations} from "next-intl";
import {createCommonStateSchema, useCommonStore} from "@/features/common";
import {zodErrors2CommonErrorsMap} from "@/features/common/lib/zod";

export const useCommonValidation = () => {
    const commonSchema = createCommonStateSchema(useTranslations("features.common.errors"))

    const validate = async () => {
        const store = useCommonStore.getState();
        const parseResult = await commonSchema.safeParseAsync(store);
        if (!parseResult.success) {
            const errors = zodErrors2CommonErrorsMap(parseResult.error.errors);
            console.log({rawErrors: parseResult.error.errors})
            console.log({errors})
            store.setErrors(errors);
            throw new Error("Validation failed");
        } else {
            store.clearErrors();
        }
    }

    return {validate}
}