/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";
import { useTranslations } from "next-intl";
import { useProfile } from "@/features/authentication";

export default function Home() {
  const { data } = useProfile();
  const t = useTranslations("app.(ui).page");
  return (
    <div className="flex flex-col h-full items-center justify-center w-full">
      <span>{t("welcomeMessage", { username: data?.firstname ?? "" })}</span>
    </div>
  );
}
