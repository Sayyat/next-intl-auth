/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { z } from "zod";
import { TSimpleTranslator } from "@/locales/config/translation";

export const createRegisterSchema = (t: TSimpleTranslator<"auth">) => {
  return z
    .object({
      email: z.string().email(t("errors.email.invalid")),
      firstname: z.string().min(1, t("errors.firstname.min")),
      lastname: z.string().min(1, t("errors.lastname.min")),
      middle_name: z.string().min(1, t("errors.lastname.min")),
      birthdate: z.string().min(1, t("errors.lastname.min")),
      iin: z.string().min(1, t("errors.lastname.min")),

      phone_number: z
        .string()
        .min(11, t("errors.phone.min")) // Ensures at least 7 digits
        .max(15, t("errors.phone.max")) // Limits to 15 digits
        .regex(/^\+?[1-9]\d{6,14}$/, t("errors.phone.invalid")), // Allows optional "+" & ensures valid digits
      address: z.string().min(1, t("errors.lastname.min")),

      city_id: z.coerce
        .number({
          required_error: t("errors.city.required"),
        })
        .min(0, t("errors.city.required")),
      password: z
        .string()
        .min(8, t("errors.password.min", { min: 8 }))
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, t("errors.password.weak")),

      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t("errors.password.mismatch"),
      path: ["confirm"],
    });
};

export const createLoginSchema = (t: TSimpleTranslator<"auth">) => {
  return z.object({
    email: z.string().email(t("errors.email.invalid")),
    password: z.string().min(5, t("errors.password.min", { min: 5 })),
  });
};

export const createEditProfileSchema = (t: TSimpleTranslator<"auth">) => {
  return z.object({
    email: z.string().email(t("errors.email.invalid")),
    firstname: z.string().min(1, t("errors.firstname.min")),
    lastname: z.string().min(1, t("errors.lastname.min")),
    middle_name: z.string().min(1, t("errors.lastname.min")),
    birthdate: z.string().min(1, t("errors.lastname.min")),
    iin: z.string().min(1, t("errors.lastname.min")),

    phone_number: z
      .string()
      .min(11, t("errors.phone.min")) // Ensures at least 7 digits
      .max(15, t("errors.phone.max")) // Limits to 15 digits
      .regex(/^\+?[1-9]\d{6,14}$/, t("errors.phone.invalid")), // Allows optional "+" & ensures valid digits
    address: z.string().min(1, t("errors.lastname.min")),

    city_id: z.coerce
      .number({
        required_error: t("errors.city.required"),
      })
      .min(0, t("errors.city.required"))
      .optional(),
  });
};

export const createResetSchema = (t: TSimpleTranslator<"auth">) => {
  return z.object({
    email: z.string().email(t("errors.email.invalid")),
  });
};
