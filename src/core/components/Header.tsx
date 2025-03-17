"use client";

import React, {useState, useEffect} from "react";
import {signOut, useSession} from "next-auth/react";
import {LanguageSelect} from "@/shared/components/LanguageSelect";
import {useTranslations} from "next-intl";
import {Menu, X, LogOut, Moon, Sun} from "lucide-react";
import {useTheme} from "@/shared/hooks/useTheme";
import {ThemeSelect} from "@/shared/components/ThemeSelect";

export function Header() {
    const {data} = useSession();
    const t = useTranslations("app.(ui)._components.Header");

    const [menuOpen, setMenuOpen] = useState(false);
    const {theme, toggleTheme} = useTheme()
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false); // Automatically close menu on desktop dimensions
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className="flex justify-between items-center p-4 border-b bg-primaryBackgroundColor relative">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-bold text-primaryColor">
                {t("title")}
            </h1>

            {/* Mobile: Language Selector, Theme Switcher, and Hamburger Menu */}
            <div className="flex items-center gap-4 md:hidden">
                <div className="flex items-start">
                    <LanguageSelect/>
                    <ThemeSelect/>
                </div>
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="text-primaryColor"
                    aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 text-primaryColor">
                <div className="flex items-start">
                    <LanguageSelect/>
                    <ThemeSelect/>
                </div>
                <span className="text-primaryColor">{data?.user?.email || t("unknownUser")}</span>
                <button
                    onClick={() => signOut()}
                    className="flex items-center text-primaryColor hover:text-red-600"
                    aria-label={t("signOut")}
                >
                    <LogOut className="w-5 h-5 md:w-6 md:h-6 mr-1"/>
                    <span>{t("signOut")}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    role="dialog"
                    className="absolute top-16 right-4 w-64 bg-primaryBackgroundColor border border-secondaryBorderColor rounded-lg shadow-lg p-4 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        {/* User Info */}
                        <div className="text-lg text-primaryColor text-center">
                            {data?.user?.email || t("unknownUser")}
                        </div>

                        {/* Logout Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => signOut()}
                                className="flex w-32 items-center p-2 rounded-lg border border-red-500 justify-center text-errorColor"
                                aria-label={t("signOut")}
                            >
                                <LogOut className="w-6 h-6 mr-2"/>
                                <span>{t("signOut")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
