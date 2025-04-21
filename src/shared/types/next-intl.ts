/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { Locale } from "@/locales/config/locales";
import { TMessages } from "@/locales/config/translation-types";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: TMessages;
  }
}
