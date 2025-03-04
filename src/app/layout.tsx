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
        default: "Next Intl Auth",
        template: `%s - Next Intl Auth`,
    },
    metadataBase: new URL("https://github.com/Sayyat/next-intl-auth"),
    description: "A modern boilerplate for building scalable web applications with **Next.js 15**, **TypeScript**, and integrated **i18n** (internationalization). Perfect for developers looking for authentication (Next-Auth), schema validation (Zod), and responsive designs (Tailwind CSS).\n",
    keywords: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next-Auth",
        "Internationalization",
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
        locale: "en_US",
        url: "https://next-intl-auth-mu.vercel.app",
        title: "Your Project Name",
        description: "A brief description of your project for Open Graph.",
        siteName: "Next Intl Auth",
        images: [
            {
                url: "https://yourprojectdomain.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Next Intl Auth",
            },
        ],
    },
    generator: "Next js",
    icons: {
        icon: "/globe.svg",
        shortcut: "/globe.svg",
        apple: "/globe.svg",
    },
    manifest: "https://next-intl-auth-mu.vercel.app/site.webmanifest",
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
                        "font-bold bg-accent text-accent-foreground flex items-center p-4 z-[1002]"
                    }
                />
            </AllProviders>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
