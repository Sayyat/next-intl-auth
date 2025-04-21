/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { KZ, RU, US, type FlagComponent } from "country-flag-icons/react/3x2";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Locale, locales, defaultLocale } from "@/locales/config/locales";
import { getUserLocale, setUserLocale } from "@/locales/config/server";
import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared"; // твоя утилита для классов

const localeFlags: Record<Locale, FlagComponent> = {
  kk: KZ,
  ru: RU,
  en: US,
};

export function LanguageSelect() {
  const t = useTranslations("shared.components.LanguageSelect");
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);

  const CurrentFlagIcon = localeFlags[currentLocale];

  useEffect(() => {
    (async () => {
      const locale = await getUserLocale();
      setCurrentLocale(locale);
    })();
  }, []);

  const handleLocaleChange = useCallback(
    async (locale: Locale) => {
      await setUserLocale(locale);
      setCurrentLocale(locale);
      router.refresh();
    },
    [router],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          key={currentLocale}
          variant="outline"
          size="icon"
          className="bg-background rounded-xl p-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-background rounded-xl border border-input"
          >
            <CurrentFlagIcon className="w-6 h-6 object-cover flex-shrink-0 rounded-sm pointer-events-none" />
          </motion.div>
          <span className="sr-only">{t("label")}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="w-48 p-2 bg-popover shadow-lg rounded-xl"
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex flex-col gap-1"
        >
          {locales.map((locale) => {
            const FlagIcon = localeFlags[locale];
            const isActive = currentLocale === locale;

            return (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-muted font-semibold"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {/* Фиксированная и несжимаемая иконка флага */}
                <FlagIcon className="w-6 h-4 object-cover rounded-sm flex-shrink-0 pointer-events-none" />

                {/* Текст занимает всё доступное пространство */}
                <span className="flex-1 truncate">{t(locale)}</span>

                {/* Галочка справа */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
