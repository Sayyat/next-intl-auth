import {Button} from "@/shared/components/ui/button";
import {FileSpreadsheet} from "lucide-react";
import React from "react";
import {useTranslations} from "next-intl";

export function CalculationDetailsComponent() {
    const t = useTranslations("features.household-goods.components.CalculationDetailsComponent");
    return (
        <>
            <div className="flex items-center justify-end mt-8 gap-2 text-lg">
                <Button
                    className="bg-button-accent text-card-foreground rounded-xl"
                    onClick={() => {
                        console.log(t("showCalculationResults"))
                    }}
                >
                    {t("showCalculationResults")}
                </Button>
                <Button
                    className="border border-card-foreground text-card-foreground rounded-xl flex items-center"
                    onClick={() => {
                        console.log(t("downloadHouseholdCalculation"))
                    }}
                >
                    <FileSpreadsheet/>
                    <span>
                    {t("downloadHouseholdCalculation")}
                    </span>
                </Button>
                <Button
                    className="bg-button-accent text-card-foreground rounded-xl"
                    onClick={() => {
                        console.log(t("submitApplication"))
                    }}
                >
                    {t("submitApplication")}
                </Button>
            </div>
        </>
    )
}