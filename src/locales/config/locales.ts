/*
 * Copyright (c) 2025. Sayat Raykul
 */

export type Locale = (typeof locales)[number];

export const locales = ["kk", "ru", "en"] as const;
export const defaultLocale: Locale = "ru";
