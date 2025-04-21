/*
 * Copyright (c) 2025. Sayat Raykul
 */

// locales/config/translation.ts

import {
  createTranslator,
  useTranslations as useTranslationsBase,
} from "next-intl";

import { getUserLocale } from "./server";
import { defaultLocale } from "./locales";
import { TAllNamespaces, TKeysInsideNamespace } from "./translation-types";

import kkMessages from "../messages/kk.json";
import enMessages from "../messages/en.json";
import ruMessages from "../messages/ru.json";

const allMessages = {
  kk: kkMessages,
  en: enMessages,
  ru: ruMessages,
} as const;

// ТИП для переводчика
export type TSimpleTranslator<N extends TAllNamespaces> = <
  K extends TKeysInsideNamespace<N>,
>(
  key: K,
  values?: Record<string, any>,
) => string;

// Клиентская версия
export function useScopedTranslator<N extends TAllNamespaces>(namespace: N) {
  const t = useTranslationsBase();
  return ((key, values) =>
    t(`${namespace}.${key}` as any, values)) as TSimpleTranslator<N>;
}

// Серверная версия
export async function getScopedTranslator<N extends TAllNamespaces>(
  namespace: N,
) {
  const locale = (await getUserLocale()) || defaultLocale;
  const messages = allMessages[locale] || allMessages[defaultLocale];

  const translator = createTranslator({ locale, messages });

  return ((key, values) =>
    translator(`${namespace}.${key}` as any, values)) as TSimpleTranslator<N>;
}
