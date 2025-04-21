/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import * as React from "react";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/shared"; // твоя утилита cn

const themeOptions = [
  {
    value: "light",
    labelKey: "light",
    icon: Sun,
  },
  {
    value: "dark",
    labelKey: "dark",
    icon: Moon,
  },
  {
    value: "system",
    labelKey: "system",
    icon: Laptop,
  },
] as const;

export function ThemeSelect() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("shared.components.ThemeToggle");

  const CurrentIcon =
    themeOptions.find((option) => option.value === theme)?.icon || Laptop;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          key={theme}
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
            <CurrentIcon className="size-4 text-foreground" />
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
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-muted font-semibold"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-foreground" />
                <span className="flex-1 truncate">{t(option.labelKey)}</span>
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
