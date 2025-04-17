import {useAltoBioCleanCalculations} from "@/features/household-goods/hooks/useAbCalculations";
import {formatDisinfectionUnitDiameterData} from "@/features/household-goods/lib/utils";
import {IAltoBioCleanSelectItem} from "@/features/household-goods/types/ab";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {Select} from "@/shared/components/Select";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle,} from "@/shared/components/ui/card";
import {Label} from "@/shared/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import {FileSpreadsheet} from "lucide-react";
import {useTranslations} from "next-intl";
import React from "react";
import {useAbStore} from "../store/useAbStore";
import {CommonFields} from "@/features/common/components/CommonFields";

export function AbCalculatorComponent() {
    const t = useTranslations(
        "features.household-goods.components.AbCalculatorComponent",
    );
    const submitAltoBioClean = useAltoBioCleanCalculations();

    return (
        <div className="flex flex-col w-full gap-12 pb-10 overflow-auto">
            <CommonFields/>
            <AbForm/>
            <AbTable/>
            <Card className="w-full border-muted py-0 gap-0">
                <CardHeader className="h-full items-center bg-muted rounded-t-lg py-4">
                    <CardTitle>{t("notesTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">{t("notesBody")}</CardContent>
            </Card>
            <div className="flex items-center justify-end mt-8 gap-2 text-lg fixed bottom-4 right-4">
                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={() => {
                        submitAltoBioClean.mutate();
                    }}
                >
                    {t("calculateAb")}
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


export const AbForm: React.FC = () => {
    const t = useTranslations(
        "features.household-goods.components.AbCalculatorComponent",
    );
    const {ab, setField, altoBioCleanItems, selectedAltoBioCleanItem} =
        useAbStore();
    const {wastewaterConsumption, volley, supplyDepth} = ab;

    return (
        <div className="w-full flex flex-col gap-6 items-start justify-between">
            <span className="text-foreground font-medium text-2xl">{t("AB")}</span>

            {/* Initial Data Section */}
            <Label className="text-foreground font-medium text-xl">
                {t("initialData")}
            </Label>

            {/* Wastewater Consumption Input */}
            <FloatingLabelInput
                type="number"
                step="any"
                label={t("wastewaterConsumption")}
                name="altaBioSelect"
                value={wastewaterConsumption}
                onChange={(e) =>
                    setField("ab", {
                        ...ab,
                        wastewaterConsumption: Number(e.target.value),
                    })
                }
            />

            {/* Alto Bio Clean List Dropdown */}
            <div className="w-full">
                <Select<IAltoBioCleanSelectItem>
                    name="altaBio"
                    label={t("objectInformation")}
                    options={altoBioCleanItems}
                    optionLabelKeys={["name"]}
                    optionValueKey="id"
                    className="w-full"
                    wrapperClassName="w-full gap-6 p-0"
                    labelClassName="text-xl"
                    value={selectedAltoBioCleanItem}
                    onChange={(value) => setField("selectedAltoBioCleanItem", value)}
                />
            </div>

            {/* Volley Input */}
            <FloatingLabelInput
                label={t("volley")}
                type="number"
                step="any"
                name="abVolley"
                value={volley}
                onChange={(e) =>
                    setField("ab", {...ab, volley: Number(e.target.value)})
                }
            />

            {/* Feeder Depth Input */}
            <FloatingLabelInput
                type="number"
                step="any"
                label={t("feederDepth")}
                name="abFeederDepth"
                value={supplyDepth}
                onChange={(e) =>
                    setField("ab", {...ab, supplyDepth: Number(e.target.value)})
                }
            />
        </div>
    );
};


const AbTable: React.FC = () => {
    const t = useTranslations(
        "features.household-goods.components.AbCalculatorComponent",
    );
    const {selectedAltoBioCleanItem, altoBioCleanSubmitResult} = useAbStore();
    const total =
        (altoBioCleanSubmitResult?.data?.cost?.alta_bio_clean_price || 0) +
        (altoBioCleanSubmitResult?.data?.cost?.total_cost_neck || 0);

    return (
        <div className="w-full flex flex-col items-start justify-between gap-4">
            <span className="font-medium text-2xl">{t("AB")}</span>
            <Table className="caption-top text-md rounded-lg border border-muted">
                <TableCaption className="bg-muted text-lg font-bold p-4 rounded-t-md border-b border-muted">
                    {t("recommendedEquipments")}
                </TableCaption>
                <TableHeader className="font-bold [&_tr]:border-b border-muted bg-card-primary">
                    <TableRow className="border-b border-muted">
                        <TableHead className="border border-muted">{t("number")}</TableHead>
                        <TableHead className="border border-muted">
                            {t("equipmentType")}
                        </TableHead>
                        <TableHead className="border border-muted">{t("price")}</TableHead>
                        <TableHead className="border border-muted">
                            {t("neckSpecification")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted text-center">1</TableCell>
                        <TableCell className="border border-muted">
                            {selectedAltoBioCleanItem?.name}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {altoBioCleanSubmitResult?.data?.cost?.alta_bio_clean_price}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {formatDisinfectionUnitDiameterData(altoBioCleanSubmitResult?.data?.counts)}
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted rounded-b-lg">
                        <TableCell className="border border-muted text-center rounded-bl-lg">
                            2
                        </TableCell>
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted rounded-br-lg">
                            {altoBioCleanSubmitResult?.data?.cost?.total_cost_neck}
                        </TableCell>
                        <TableCell className="border border-muted"></TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter className="rounded-b-xl">
                    <TableRow className="border-b border-muted rounded-b-xl">
                        <TableCell
                            colSpan={2}
                            className="border border-muted text-end rounded-b-xl"
                        >
                            {t("total")}
                        </TableCell>
                        <TableCell colSpan={2} className="border border-muted rounded-b-xl">
                            {total}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};
