/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("core.components.Footer");

  return (
    <div className="flex items-center justify-center gap-2 h-8">
      <span>{t("createdBy")}</span>
      <span>{new Date().getFullYear()}</span>
    </div>
  );
}
