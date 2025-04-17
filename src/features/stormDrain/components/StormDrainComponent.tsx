import React from "react";
import {useTranslations} from "next-intl";
import {FileSpreadsheet} from "lucide-react";
import {Button} from "@/shared/components/ui/button";

export function StormDrainComponent() {
    const t = useTranslations("features.kns.components.KnsComponent");

    const total = 50000;

    const handleSubmit = () => {
        console.log("submit");
    };

    return (
        <div className="flex flex-col w-full gap-12 pb-10">
            <div className="flex items-center justify-end gap-2 text-lg">
                <span className="font-bold">{t("total")}:</span>
                <span>{total}</span>
            </div>

            <div className="flex items-center justify-end mt-8 gap-2 text-lg fixed bottom-4 right-4">
                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={handleSubmit}
                >
                    {t("calculate")}
                </Button>
                <Button
                    className="bg-background border border-card-foreground text-card-foreground rounded-xl flex items-center"
                    onClick={() => {
                        console.log(t("downloadHouseholdCalculation"));
                    }}
                >
                    <FileSpreadsheet/>
                    <span>{t("downloadHouseholdCalculation")}</span>
                </Button>
                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={() => {
                        console.log(t("submitApplication"));
                    }}
                >
                    {t("submitApplication")}
                </Button>
            </div>
        </div>
    );
}
