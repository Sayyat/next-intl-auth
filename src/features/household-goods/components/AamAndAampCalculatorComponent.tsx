import {useAamAndAampCalculations} from "@/features/household-goods/hooks/useAamAndAampCalculations";
import {
    formatBufferCapacityAllocation,
    formatCleaningStationDiameterData,
    formatDisinfectionUnitDiameterData,
} from "@/features/household-goods/lib/utils";
import {useAamAndAampStore} from "@/features/household-goods/store/useAamAndAampStore";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle,} from "@/shared/components/ui/card";
import {Label} from "@/shared/components/ui/label";
import {Switch} from "@/shared/components/ui/switch";
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
import {CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {CommonFields} from "@/features/common/components/CommonFields";

export function AamAndAampCalculatorComponent() {
    const t = useTranslations(
        "features.household-goods.components.AamAndAampCalculatorComponent",
    );
    const submitAamp = useAamAndAampCalculations();

    const {recalculateComputedFields} = useAamAndAampStore();
    return (
        <div className="flex flex-col w-full gap-12 pb-10 overflow-auto">
            <CommonFields/>
            <AamAampForm/>
            <AamAampAbTable/>
            <Card className="w-full border-muted py-0 gap-0">
                <CardHeader className="items-center bg-muted rounded-t-lg py-4">
                    <CardTitle>{t("notesTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">{t("notesBody")}</CardContent>
            </Card>

            <BufferFillingSchedule/>
            <div className="flex items-center justify-end mt-8 gap-2 text-lg fixed bottom-4 right-4">
                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={() => {
                        recalculateComputedFields(); // Ensure computed values are correct
                        submitAamp.mutate();
                    }}
                >
                    {t("calculateAamAndAamp")}
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

export const AamAampForm: React.FC = () => {
    const t = useTranslations(
        "features.household-goods.components.AamAndAampCalculatorComponent",
    );
    const {deal, aamp, setField} = useAamAndAampStore();

    const {dealNumber} = deal;
    const {
        wastewaterConsumption,
        totalVolumeOfVolleys,
        volleyCount,
        volleyDischargePerTime,
        timeBetweenVolleys,
        feederDepth,
        disinfection,
        dehydration,
    } = aamp;

    return (
        <div className="w-full flex flex-col gap-6 items-start">
            <span className="text-foreground font-medium text-2xl">
                {t("aamAndAamp")}
            </span>
            <span className="text-foreground font-medium text-xl">
                {t("dealData")}
            </span>

            {/* Deal Data Section */}
            <FloatingLabelInput
                type="text"
                name="dealNumber"
                label={t("dealNumber")}
                value={dealNumber}
                onChange={(e) =>
                    setField("deal", {...deal, dealNumber: e.target.value})
                }
            />

            {/* Initial Data Section */}
            <span className="text-foreground font-medium text-xl">
                {t("initialData")}
            </span>
            {[
                {
                    name: "wastewaterConsumption",
                    value: wastewaterConsumption,
                    label: t("wastewaterConsumption"),
                },
                {
                    name: "totalVolumeOfVolleys",
                    value: totalVolumeOfVolleys,
                    label: t("totalVolumeOfVolleys"),
                },
                {name: "volleyCount", value: volleyCount, label: t("volleyCount")},
                {name: "feederDepth", value: feederDepth, label: t("feederDepth")},
            ].map(({name, value, label}) => (
                <FloatingLabelInput
                    key={name}
                    type="number"
                    step="any"
                    name={name}
                    label={label}
                    value={value}
                    onChange={(e) =>
                        setField("aamp", {...aamp, [name]: Number(e.target.value)})
                    }
                />
            ))}

            {/* Readonly Computed Fields */}
            {[
                {
                    name: "volleyDischargePerTime",
                    value: volleyDischargePerTime,
                    label: t("volleyDischargePerTime"),
                },
                {
                    name: "timeBetweenVolleys",
                    value: timeBetweenVolleys,
                    label: t("timeBetweenVolleys"),
                },
            ].map(({name, value, label}) => (
                <FloatingLabelInput
                    key={name}
                    type="number"
                    step="any"
                    name={name}
                    label={label}
                    value={value}
                    disabled
                />
            ))}

            {/* ShadCN Switches for Boolean Fields */}
            <div className="w-full flex items-center justify-between">
                <Label className="text-gray-700">{t("disinfection")}</Label>
                <Switch
                    checked={disinfection}
                    onCheckedChange={(checked) =>
                        setField("aamp", {...aamp, disinfection: checked})
                    }
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <Label className="text-gray-700">{t("dehydration")}</Label>
                <Switch
                    checked={dehydration}
                    onCheckedChange={(checked) =>
                        setField("aamp", {...aamp, dehydration: checked})
                    }
                />
            </div>
        </div>
    );
};

const AamAampAbTable: React.FC = () => {
    const t = useTranslations(
        "features.household-goods.components.AamAndAampCalculatorComponent",
    );
    const {aamp, aampResults} = useAamAndAampStore();
    const {disinfection, dehydration} = aamp;

    const total =
        (aampResults?.cleaningStation?.cleaning_station_data?.total_price || 0) +
        (aampResults?.cleaningStation?.overall_neck_total_cost || 0) +
        (aampResults?.disinfectionUnit?.data.cost.alta_bio_total || 0) +
        (aampResults?.disinfectionUnit?.data.cost.grand_total_sum || 0) +
        (aampResults?.bufferCapacity?.neck_total || 0);

    return (
        <div className="w-full flex flex-col items-start justify-between gap-4">
            <span className="font-medium text-2xl">{t("aamAndAamp")}</span>
            <Table className="caption-top text-md rounded-md border border-muted">
                <TableCaption className="bg-muted text-lg font-bold p-4 rounded-t-md border-b border-muted">
                    {t("recommendedEquipments")}
                </TableCaption>
                <TableHeader className="font-bold [&_tr]:border-b border-muted bg-card-primary">
                    <TableRow className="border-b border-muted">
                        <TableHead className="border border-muted">{t("number")}</TableHead>
                        <TableHead className="border border-muted">
                            {t("equipmentType")}
                        </TableHead>
                        <TableHead className="border border-muted">{t("model")}</TableHead>
                        <TableHead className="border border-muted">
                            {t("quantity")}
                        </TableHead>
                        <TableHead className="border border-muted">
                            {t("unitPrice")}
                        </TableHead>
                        <TableHead className="border border-muted">{t("price")}</TableHead>
                        <TableHead className="border border-muted">
                            {t("neckSpecification")}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="border-b border-muted">
                        <TableCell rowSpan={2} className="border border-muted text-center">
                            1
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("cleaningStation")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.cleaningStation?.cleaning_station_data?.model}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.cleaningStation?.cleaning_station_data?.quantity}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.cleaningStation?.cleaning_station_data?.price_per_unit}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.cleaningStation?.cleaning_station_data?.total_price}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {formatCleaningStationDiameterData(aampResults?.cleaningStation?.aggregated_counts)}
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">
                            {
                                (aampResults?.cleaningStation?.cleaning_station_data?.neck_630 || 0)
                                + (aampResults?.cleaningStation?.cleaning_station_data?.neck_955 || 0)
                                + (aampResults?.cleaningStation?.cleaning_station_data?.neck_1220 || 0)
                            }
                        </TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.cleaningStation?.overall_neck_total_cost}
                        </TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell rowSpan={2} className="border border-muted text-center">
                            2
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("disinfectionUnit")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.model
                                : t("notRequired")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.quantity
                                : ""}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.price_per_unit
                                : ""}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.alta_bio_total
                                : ""}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? formatDisinfectionUnitDiameterData(aampResults?.disinfectionUnit?.data?.counts)
                                : ""}
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.grand_total_one_line
                                : ""}
                        </TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">
                            {disinfection
                                ? aampResults?.disinfectionUnit?.data?.cost?.grand_total_sum
                                : ""}
                        </TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell rowSpan={2} className="border border-muted text-center">
                            3
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("bufferCapacity")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.bufferCapacity?.need_buffer_name}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.bufferCapacity?.number_containers}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.bufferCapacity?.price_per_unit}
                        </TableCell>
                        <TableCell className="border border-muted text-red-500">
                            {aampResults?.bufferCapacity?.price_per_unit}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {formatBufferCapacityAllocation(aampResults?.bufferCapacity?.necks_data)}
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                        <TableCell className="border border-muted">
                            {aampResults?.bufferCapacity?.neck_total}
                        </TableCell>
                        <TableCell className="border border-muted">-</TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell rowSpan={2} className="border border-muted text-center">
                            4
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("dehydrationUnit")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {dehydration ? t("screwDehydrator") : t("notRequired")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {dehydration ? 1 : ""}
                        </TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell rowSpan={2} className="border border-muted text-center">
                            5
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("mechanicalCleaningUnit")}
                        </TableCell>
                        <TableCell className="border border-muted">
                            {t("grateOrAuger")}
                        </TableCell>
                        <TableCell className="border border-muted">1</TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                    </TableRow>
                    <TableRow className="border-b border-muted">
                        <TableCell className="border border-muted">{t("necks")}</TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                        <TableCell className="border border-muted"></TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className="border-b border-muted rounded-b-xl">
                        <TableCell
                            colSpan={5}
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

const BufferFillingSchedule: React.FC = () => {
    const t = useTranslations(
        "features.household-goods.components.AamAndAampCalculatorComponent",
    );
    const {aampResults} = useAamAndAampStore();
    const hours_data =
        aampResults?.bufferCapacity?.calculate_buffer_result.hours_data.map(
            (item) => item.remaining,
        ) || [];
    const minimumHoursData = Math.min(...hours_data);
    const maximumHoursData = Math.max(...hours_data);

    return (
        <Card className="w-full bg-chart-background text-chart-foreground rounded-md">
            <CardHeader className="items-center">
                <CardTitle className="text-lg font-semibold">
                    {t("bufferFillingSchedule")}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer
                    width="100%"
                    height={300}
                    className="bg-chart-background text-chart-foreground rounded-md"
                >
                    <LineChart
                        data={
                            aampResults?.bufferCapacity?.calculate_buffer_result.hours_data
                        }
                        margin={{top: 20, right: 20, left: 0, bottom: 10}}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="gray"/>
                        <XAxis dataKey="hour" tick={{fill: "var(--chart-foreground)"}}/>
                        <YAxis
                            domain={[minimumHoursData, maximumHoursData]}
                            tick={{fill: "var(--chart-foreground)"}}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "black",
                                borderRadius: "8px",
                                color: "white",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="remaining"
                            stroke="#4A90E2"
                            strokeWidth={2}
                            dot={{fill: "#4A90E2", r: 4}}
                            activeDot={{r: 6}}
                        >
                            <LabelList
                                dataKey="bufferFill"
                                position="insideBottomLeft"
                                fill="var(--chart-foreground)"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};