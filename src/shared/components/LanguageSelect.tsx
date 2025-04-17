"use client";

import React, {useState, useEffect} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";
import {Globe} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Locale, locales, defaultLocale} from "@/locales/config/locales";
import {getUserLocale, setUserLocale} from "@/locales/config/server";

/**
 * A dropdown-based LanguageSelect that visually matches your "ThemeToggle" style:
 * - A button with a globe icon
 * - On click, a dropdown menu with each locale item
 */
export function LanguageSelect() {
    const t = useTranslations("shared.components.LanguageSelect");
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);

    useEffect(() => {
        (async () => {
            const locale = await getUserLocale();
            setCurrentLocale(locale);
        })();
    }, []);

    async function handleLocaleChange(locale: Locale) {
        await setUserLocale(locale);
        setCurrentLocale(locale);
        router.refresh(); // Refresh the page to apply the new locale
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-primary rounded-l-xl">
                    <Globe className="size-[1.2rem]"/>
                    <span className="sr-only">{t("label")}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        className="cursor-pointer"
                        onClick={() => handleLocaleChange(locale)}
                    >
                        {/* If you want to mark the currentLocale with a check or style, do so here */}
                        {t(locale)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
