/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { TAuthModal } from "@/core/types/header";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { LanguageSelect } from "@/shared/components/LanguageSelect";
import { ThemeSelect } from "@/shared/components/ThemeSelect";

import {
  EmailSentDialog,
  LoginDialog,
  ProfileDialog,
  ProfileImageIcon,
  RegisterDialog,
  ResetDialog,
  useProfile,
} from "@/features/authentication";

export function Header() {
  const { status } = useSession();
  const t = useTranslations("core.components.Header");
  const [currentModal, setCurrentModal] = useState<TAuthModal>();
  const { data: profile } = useProfile();

  return (
    <header className="bg-sidebar flex items-center justify-between gap-2">
      {/* Title */}
      <div className="gap-4 h-10 w-full grid grid-cols-[36px_1fr_72px_1fr] items-center">
        <ProfileImageIcon className="size-9" />
        <div className="flex flex-col items-start justify-between">
          {status === "loading" && <Skeleton className="w-full" />}
          {status === "unauthenticated" && (
            <Button
              className="w-full flex justify-start text-start text-button-accent underline p-0 text-lg"
              variant="link"
              onClick={() => setCurrentModal("login")}
            >
              <span>{t("authorize")}</span>
            </Button>
          )}
          {status === "authenticated" && (
            <div
              className="flex flex-col text-lg cursor-pointer"
              onClick={() => setCurrentModal("profile")}
            >
              <span>{profile?.firstname}</span>
              <span>{profile?.lastname}</span>
            </div>
          )}
        </div>

        <div className="flex flex-row">
          <LanguageSelect />
          <ThemeSelect />
        </div>

        {/* 🔍 Search Bar - Fixed Input */}
        <div className="flex items-center px-4 gap-2 border border-muted rounded-xl h-9 bg-background focus-within:ring-2 focus-within:ring-ring">
          <Search className="text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search")}
            className="w-full bg-transparent border-none outline-hidden focus:ring-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {currentModal === "login" && (
        <LoginDialog
          open={currentModal === "login"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "register" && (
        <RegisterDialog
          open={currentModal === "register"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "resetPassword" && (
        <ResetDialog
          open={currentModal === "resetPassword"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "emailSent" && (
        <EmailSentDialog
          open={currentModal === "emailSent"}
          setCurrentModal={setCurrentModal}
        />
      )}

      {currentModal === "profile" && (
        <ProfileDialog
          open={currentModal === "profile"}
          setCurrentModal={setCurrentModal}
        />
      )}
    </header>
  );
}
