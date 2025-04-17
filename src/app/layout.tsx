import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "@/core/styles/globals.css";
import {NextIntlClientProvider} from "next-intl";
import {defaultLocale} from "@/locales/config/locales";
import {ToastContainer} from "react-toastify";
import React from "react";
import {getMessages} from "next-intl/server";
import {AllProviders} from "@/core/providers/AllProviders";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Очистные сооружения",
        template: `%s - Очистные сооружения`,
    },
    metadataBase: new URL("https://web.ziz.kz/"),
    description: "Очистные сооружения | Системы водоочистки и фильтрации",
    keywords: [
        "Очистные сооружения",
        "Водоочистка",
        "Фильтрация воды",
        "Экология",
        "Очистка сточных вод",
    ],
    authors: [
        {
            name: "ZIZ INC.",
            url: "https://web.ziz.kz/",
        },
    ],
    creator: "ZIZ INC.",
    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: "https://web.ziz.kz/",
        title: "Очистные сооружения",
        description: "Современные решения для очистки воды и сточных вод.",
        siteName: "Очистные сооружения",
        images: [
            {
                url: "https://web.ziz.kz/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Очистные сооружения - системы водоочистки",
            },
        ],
    },
    generator: "Next.js",
    icons: {
        icon: "/icons/favicon.ico",
        shortcut: "/icons/favicon.ico",
        apple: "/icons/favicon.png",
    },
    // manifest: "https://web.ziz.kz/site.webmanifest",
};


export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();

    return (
        <html lang={defaultLocale}>
        <head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <NextIntlClientProvider messages={messages}>
            <AllProviders>
                {children}
                <ToastContainer
                    limit={3}
                    toastClassName={
                        "font-bold bg-accent text-accent-foreground flex items-center p-4 z-1002"
                    }
                />
            </AllProviders>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
