import React from "react";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {ChevronRight} from "lucide-react";

export function HouseholdGoodsCalculatorComponent() {
    const t = useTranslations(
        "features.household-goods.components.HouseholdGoodsCalculatorComponent",
    );

    return (
        <div className="flex flex-col w-full h-full gap-4">
            <header>{t("householdGoodsCalculator")}</header>
            <div className="flex w-full gap-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{t("aamAndAamp")}</CardTitle>
                        <CardDescription>{t("aamAndAampCalculator")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{t("aamAndAampCalculatorContent")}</p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href="/calculators/household-goods/aam-and-aamp"
                            className="flex items-center justify-between w-full bg-primary text-primary-foreground rounded-xl p-2"
                        >
                            <span>{t("go")}</span>
                            <ChevronRight/>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{t("ab")}</CardTitle>
                        <CardDescription>{t("abCalculator")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{t("abCalculatorContent")}</p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href="/calculators/household-goods/ab"
                            className="flex items-center justify-between w-full bg-primary text-primary-foreground rounded-xl p-2"
                        >
                            <span>{t("go")}</span>
                            <ChevronRight/>
                        </Link>
                    </CardFooter>
                </Card>


            </div>
        </div>
    );
}

