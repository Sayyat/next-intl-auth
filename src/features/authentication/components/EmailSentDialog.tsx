/*
 * Copyright (c) 2025. Sayat Raykul
 */

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/button";

// ShadCN Dialog Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TAuthModal } from "@/core/types/header";
import { Mail } from "lucide-react";

interface IEmailSentDialogProps {
  open: boolean;
  setCurrentModal: (modal: TAuthModal) => void;
}

export const EmailSentDialog: React.FC<IEmailSentDialogProps> = ({
  open,
  setCurrentModal,
}) => {
  const t = useTranslations(
    "features.authentication.components.EmailSentDialog",
  );

  return (
    <Dialog open={open} onOpenChange={() => setCurrentModal(undefined)}>
      <DialogContent
        className="max-w-[506px] sm:max-w-[506px] p-0 rounded-xl sm:rounded-xl shadow-lg bg-background text-primary-foreground [&>button]:hidden"
        aria-describedby={undefined}
      >
        <div className="flex flex-col p-8 gap-8 items-center justify-center text-center">
          <Mail
            style={{ width: "8rem", height: "8rem" }}
            className="text-button"
          />
          <DialogTitle className="text-xl font-bold">{t("head")}</DialogTitle>
          <DialogDescription>{t("body")}</DialogDescription>
        </div>
        <div className="bg-background border-t border-muted flex p-8 rounded-xl sm:rounded-xl">
          <Button
            variant="link"
            className="w-full py-3 text-xl bg-button-accent text-primary-foreground rounded-3xl"
            onClick={() => setCurrentModal("login")}
          >
            {t("close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
