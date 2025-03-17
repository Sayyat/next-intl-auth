import {z} from "zod";
import {TranslationValues} from "use-intl";

export const createRegisterSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z
        .object({
            firstname: z
                .string()
                .min(1, t("auth.errors.firstname.min")),
            lastname: z
                .string()
                .min(1, t("auth.errors.lastname.min")),
            email: z.string().email(t("auth.errors.email.invalid")),
            age: z
                .coerce.number({
                    invalid_type_error: t("auth.errors.age.typeError"),
                })
                .min(0, t("auth.errors.age.min"))
                .max(70, t("auth.errors.age.max")),
            status: z
                .string()
                .min(1, t("auth.errors.status.required")),
            password: z
                .string()
                .min(8, t("auth.errors.password.min", { min: 8 }))
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    t("auth.errors.password.weak")
                ),
            confirm: z.string(),
        })
        .refine((data) => data.password === data.confirm, {
            message: t("auth.errors.password.mismatch"),
            path: ["confirm"],
        });
};

export const createLoginSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z.object({
        email: z.string().email(t("auth.errors.email.invalid")),
        password: z.string().min(5, t("auth.errors.password.min", {min: 5})),
    });
};

export const createResetSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z.object({
        email: z.string().email(t("auth.errors.email.invalid")),
    });
};
