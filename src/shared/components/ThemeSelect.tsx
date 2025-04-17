"use client"

import * as React from "react"
import {Laptop, Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {Button} from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {useTranslations} from "next-intl"

export function ThemeSelect() {
    const {setTheme, theme} = useTheme() // Получаем текущую тему и системную тему
    const t = useTranslations("shared.components.ThemeToggle")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative bg-background rounded-r-xl">
                    {theme === "light" && (
                        <Sun
                            className="size-[1.2rem] rotate-0 scale-100"/>
                    )}
                    {theme === "dark" && (
                        <Moon
                            className="size-[1.2rem] rotate-0 scale-100"/>
                    )}
                    {theme === "system" && (
                        <Laptop
                            className="size-[1.2rem] scale-100"/>
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    {t("light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    {t("dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    {t("system")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
