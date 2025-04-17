import {z} from "zod";
import {TranslationValues} from "use-intl";

export const createRegisterSchema = (t: (key: string, values?: TranslationValues) => string) => {
    return z
        .object({
            email: z.string().email(t("auth.errors.email.invalid")),
            firstname: z.string().min(1, t("auth.errors.firstname.min")),
            lastname: z.string().min(1, t("auth.errors.lastname.min")),
            middle_name: z.string().min(1, t("auth.errors.lastname.min")),
            birthdate: z.string().min(1, t("auth.errors.lastname.min")),
            iin: z.string().min(1, t("auth.errors.lastname.min")),


            phone_number: z
                .string()
                .min(11, t("auth.errors.phone.min")) // Ensures at least 7 digits
                .max(15, t("auth.errors.phone.max")) // Limits to 15 digits
                .regex(/^\+?[1-9]\d{6,14}$/, t("auth.errors.phone.invalid")), // Allows optional "+" & ensures valid digits
            address: z.string().min(1, t("auth.errors.lastname.min")),

            city_id: z
                .coerce.number({
                    required_error: t("auth.errors.city.required")
                })
                .min(0, t("auth.errors.city.required")),
            password: z
                .string()
                .min(8, t("auth.errors.password.min", {min: 8}))
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, t("auth.errors.password.weak")),

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


export const createEditProfileSchema = (t: (key: string, values?: TranslationValues) => string) => {
    return z
        .object({
            email: z.string().email(t("auth.errors.email.invalid")),
            firstname: z.string().min(1, t("auth.errors.firstname.min")),
            lastname: z.string().min(1, t("auth.errors.lastname.min")),
            middle_name: z.string().min(1, t("auth.errors.lastname.min")),
            birthdate: z.string().min(1, t("auth.errors.lastname.min")),
            iin: z.string().min(1, t("auth.errors.lastname.min")),


            phone_number: z
                .string()
                .min(11, t("auth.errors.phone.min")) // Ensures at least 7 digits
                .max(15, t("auth.errors.phone.max")) // Limits to 15 digits
                .regex(/^\+?[1-9]\d{6,14}$/, t("auth.errors.phone.invalid")), // Allows optional "+" & ensures valid digits
            address: z.string().min(1, t("auth.errors.lastname.min")),

            city_id: z
                .coerce.number({
                    required_error: t("auth.errors.city.required")
                })
                .min(0, t("auth.errors.city.required"))
                .optional(),
        })
};


export const createResetSchema = (
    t: (key: string, values?: TranslationValues) => string
) => {
    return z.object({
        email: z.string().email(t("auth.errors.email.invalid")),
    });
};
