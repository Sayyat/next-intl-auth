export type Locale = (typeof locales)[number];

export const locales = ["kk", "ru", "en"] as const;
export const defaultLocale: Locale = "en";
