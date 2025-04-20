/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { createTranslator } from "next-intl";
import kkMessages from "../messages/kk.json";
import enMessages from "../messages/en.json";
import ruMessages from "../messages/ru.json";
import { defaultLocale, Locale } from "./locales";
import { getUserLocale } from "./server";

const messages = {
  kk: kkMessages,
  en: enMessages,
  ru: ruMessages,
};

export const getTranslator = async (locale?: Locale) => {
  if (!locale) {
    locale = (await getUserLocale()) as Locale;
  }
  const translations = messages[locale] || messages[defaultLocale]; // Default to 'en' if locale is unavailable
  return createTranslator({ locale, messages: translations });
};
