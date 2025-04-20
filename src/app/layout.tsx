/*
 * Copyright (c) 2025. Sayat Raykul
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/core/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";
import { getLocale } from "next-intl/server";
import { ClientProvidersWrapper } from "@/core/providers/ClientProvidersWrapper";
import { ReactNode } from "react";

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
  description:
    "A modern boilerplate for building scalable web applications with **Next.js 15**, **TypeScript**, and integrated **i18n** (internationalization). Perfect for developers looking for authentication (Next-Auth), schema validation (Zod), and responsive designs (Tailwind CSS).\n",
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
    title: "Next Intl Auth",
    description: "Next Intl Auth Boilerplate",
    siteName: "Next Intl Auth",
    images: [
      {
        url: "https://next-intl-auth-mu.vercel.app/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Next Intl Auth",
      },
    ],
  },
  generator: "Next js",
  icons: {
    icon: "/assets/logo",
    shortcut: "/assets/logo",
    apple: "/assets/logo",
  },
  manifest: "https://next-intl-auth-mu.vercel.app/icons/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <title>Next Intl Auth</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ClientProvidersWrapper>
            {children}
            <ToastContainer
              limit={3}
              toastClassName={
                "font-bold bg-accent text-accent-foreground flex items-center p-4 z-1002"
              }
            />
          </ClientProvidersWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
