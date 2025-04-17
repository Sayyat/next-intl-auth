import React, {Fragment} from "react";
import {useTranslations} from "next-intl";
import {useKnsCalculations} from "@/features/kns/hooks/useKnsCalculations";
import {useKnsStore} from "@/features/kns/store/useKnsStore";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {Button} from "@/shared/components/ui/button";
import {Select} from "@/shared/components/Select";
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
import {Calculator, FileSpreadsheet, Minus, Plus, RefreshCcw} from "lucide-react";
import {
    ICalculationResponse,
    IKnsControlCabinetItem,
    IKnsDiameterItem,
    IKnsHeightItem,
    IKnsQuantityItem
} from "@/features/kns/types/response";
import {useKnsInitialData} from "@/features/kns/hooks/useKnsInitialData";
import {cn, IResponse} from "@/shared";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/shared/components/ui/tooltip";
import {Loading} from "@/shared/components/svg/Loading";
import {CommonFields} from "@/features/common/components/CommonFields";

export function KnsComponent() {
    const t = useTranslations("features.kns.components.KnsComponent");
    const knsCalculations = useKnsCalculations();
    const {resetForm} = useKnsStore();
    useKnsInitialData()
    return (
        <div className="flex flex-col w-full gap-12 pb-10 overflow-auto">
            <CommonFields/>
            <KnsForm/>
            <KnsResultTable/>
            <div className="flex items-center justify-end mt-8 gap-2 text-lg fixed bottom-4 right-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="bg-background border border-card-foreground text-card-foreground rounded-xl flex items-center"
                            onClick={resetForm}
                        >
                            <RefreshCcw/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t("resetForm")}</p>
                    </TooltipContent>
                </Tooltip>

                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={() => {
                        knsCalculations.calculationMutation.mutate();
                    }}
                    disabled={knsCalculations.loading}
                >
                    {knsCalculations.loading ? <Loading/> : <Calculator/>}
                    <span>{t("showCalculationResults")}</span>
                </Button>
                <Button
                    className="bg-background border border-card-foreground text-card-foreground rounded-xl flex items-center"
                    onClick={() => {
                        console.log(t("downloadKnsCalculation"));
                    }}
                >
                    <FileSpreadsheet/>
                    <span>{t("downloadKnsCalculation")}</span>
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

const KnsForm: React.FC = () => {
    const t = useTranslations("features.kns.components.KnsComponent");
    const {
        deal,
        initialData,
        supplyManifold,
        pressureCollector,
        pump,
        dimensionCalculations,
        acceptedDimensions,
        accordingCustomerRequirementsDimensionCalculations,
        additionalEquipmentList,
        errors,
        addAdditionalEquipment,
        updateAdditionalEquipment,
        removeAdditionalEquipment,
        setField,
    } = useKnsStore();

    return (
        <div className="w-full flex flex-col gap-6 items-start">
            {/* Данные сделки */}
            <span className="text-foreground font-medium text-2xl">{t("dealData")}</span>
            <FloatingLabelInput
                type="text"
                name="dealNumber"
                label={t("dealNumber")}
                value={deal.dealNumber ?? ""}
                onChange={(e) => setField("deal", {...deal, dealNumber: e.target.value})}
                error={errors.deal?.dealNumber?._errors[0]}
            />
            <FloatingLabelInput
                type="text"
                name="knsNumber"
                label={t("knsNumber")}
                value={deal.knsNumber ?? ""}
                onChange={(e) => setField("deal", {...deal, knsNumber: e.target.value})}
                error={errors.deal?.knsNumber?._errors[0]}
            />
            {/* Начальные данные */}
            <span className="text-foreground font-medium text-2xl">{t("initialData")}</span>
            <FloatingLabelInput
                type="number"
                name="initialDataFlowRate"
                label={t("flowRate")}
                value={initialData.flowRate ?? ""}
                min={0}
                onChange={(e) =>
                    setField("initialData", {...initialData, flowRate: Number(e.target.value)})
                }
                error={errors.initialData?.flowRate?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="initialDataPressure"
                label={t("pressure")}
                value={initialData.pressure ?? ""}
                min={0}
                onChange={(e) =>
                    setField("initialData", {...initialData, pressure: Number(e.target.value)})
                }
                error={errors.initialData?.pressure?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="initialDataPrice"
                label={t("price")}
                value={initialData.price ?? ""}
                min={0}
                onChange={(e) =>
                    setField("initialData", {...initialData, price: Number(e.target.value)})
                }
                error={errors.initialData?.price?._errors[0]}
            />
            <Select<IKnsControlCabinetItem>
                name="initialDataControlCabinet"
                label={t("controlCabinet")}
                options={useKnsStore.getState().controlCabinetItems}
                optionValueKey="id"
                optionLabelKeys={["value"]}
                wrapperClassName="p-0"
                value={initialData.controlCabinet}
                onChange={(value) =>
                    setField("initialData", {...initialData, controlCabinet: value})
                }
                error={errors.initialData?.controlCabinet?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("supplyManifold")}</span>
            <Select<IKnsDiameterItem>
                name="supplyManifoldDiameter"
                label={t("diameter")}
                options={useKnsStore.getState().supplyManifoldDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={supplyManifold.diameter}
                onChange={(value) =>
                    setField("supplyManifold", {...supplyManifold, diameter: value})
                }
                error={errors.supplyManifold?.diameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="supplyManifoldDepth"
                label={t("depth")}
                value={supplyManifold.depth ?? ""}
                min={0}
                onChange={(e) =>
                    setField("supplyManifold", {...supplyManifold, depth: Number(e.target.value)})
                }
                error={errors.supplyManifold?.depth?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="supplyManifoldAmount"
                label={t("quantity")}
                value={supplyManifold.amount ?? ""}
                min={0}
                onChange={(e) =>
                    setField("supplyManifold", {...supplyManifold, amount: Number(e.target.value)})
                }
                error={errors.supplyManifold?.amount?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("pressureManifold")}</span>
            <Select<IKnsDiameterItem>
                name="pressureManifoldDiameter"
                label={t("diameter")}
                options={useKnsStore.getState().pressureCollectorDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={pressureCollector.diameter}
                onChange={(value) =>
                    setField("pressureCollector", {...pressureCollector, diameter: value})
                }
                error={errors.pressureCollector?.diameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pressureCollectorDepth"
                label={t("depth")}
                value={pressureCollector.depth ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pressureCollector", {...pressureCollector, depth: Number(e.target.value)})
                }
                error={errors.pressureCollector?.depth?._errors[0]}
            />
            <Select<IKnsQuantityItem>
                name="pressureManifoldCounts"
                label={t("quantity")}
                options={useKnsStore.getState().pressureCollectorCounts}
                optionValueKey="id"
                optionLabelKeys={["quantity"]}
                wrapperClassName="p-0"
                value={pressureCollector.amount}
                onChange={(value) =>
                    setField("pressureCollector", {...pressureCollector, amount: value})
                }
                error={errors.pressureCollector?.amount?._errors[0]}
            />
            {/* Данные насоса */}
            <span className="text-foreground font-medium text-xl">{t("pump")}</span>
            <FloatingLabelInput
                type="number"
                name="pumpWorking"
                label={t("pumpHeight")}
                value={pump.height ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, height: Number(e.target.value)})
                }
                error={errors.pump?.height?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpDiameter"
                label={t("pumpDiameter")}
                value={pump.diameter ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, diameter: Number(e.target.value)})
                }
                error={errors.pump?.diameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpLength"
                label={t("pumpLength")}
                value={pump.length ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, length: Number(e.target.value)})
                }
                error={errors.pump?.length?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpWidth"
                label={t("pumpWidth")}
                value={pump.width ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, width: Number(e.target.value)})
                }
                error={errors.pump?.width?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpWorking"
                label={t("working")}
                value={pump.working ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, working: Number(e.target.value)})
                }
                error={errors.pump?.working?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpReserve"
                label={t("reserve")}
                value={pump.reserve ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, reserve: Number(e.target.value)})
                }
                error={errors.pump?.reserve?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpStartsPerHour"
                label={t("startsPerHour")}
                value={pump.startsPerHour ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, startsPerHour: Number(e.target.value)})
                }
                error={errors.pump?.startsPerHour?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpTotalStarts"
                label={t("totalStarts")}
                value={pump.totalStarts ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, totalStarts: Number(e.target.value)})
                }
                error={errors.pump?.totalStarts?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpPower"
                label={t("nominalPower")}
                value={pump.power ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, power: Number(e.target.value)})
                }
                error={errors.pump?.power?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpAmperage"
                label={t("nominalAmperage")}
                value={pump.amperage ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, amperage: Number(e.target.value)})
                }
                error={errors.pump?.amperage?._errors[0]}
            />
            <Select<IKnsDiameterItem>
                name="pumpPressurePipeDiameters"
                label={t("pressurePipeDiameter")}
                options={useKnsStore.getState().pumpPressurePipeDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={pump.pressurePipeDiameter}
                onChange={(value) =>
                    setField("pump", {...pump, pressurePipeDiameter: value})
                }
                error={errors.pump?.pressurePipeDiameter?._errors[0]}
            />
            <Select<IKnsDiameterItem>
                name="pumpPipeGuideDiameter"
                label={t("pipeGuideDiameter")}
                options={useKnsStore.getState().pumpPipeGuidesDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={pump.pipeGuideDiameter}
                onChange={(value) =>
                    setField("pump", {...pump, pipeGuideDiameter: value})
                }
                error={errors.pump?.pipeGuideDiameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="pumpWeight"
                label={t("pumpWeight")}
                value={pump.weight ?? ""}
                min={0}
                onChange={(e) =>
                    setField("pump", {...pump, weight: Number(e.target.value)})
                }
                error={errors.pump?.weight?._errors[0]}
            />

            <span className="text-foreground font-medium text-xl">{t("dimensionsCalculation")}</span>
            <FloatingLabelInput
                type="number"
                name="dimensionCalculationsRecommendedDiameter"
                label={t("recommendedDiameter")}
                value={dimensionCalculations.recommendedDiameter ?? ""}
                min={0}
                onChange={(e) =>
                    setField("dimensionCalculations", {
                        ...dimensionCalculations, recommendedDiameter: Number(e.target.value)
                    })
                }
                error={errors.dimensionCalculations?.recommendedDiameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="dimensionCalculationsrecommendedHeight"
                label={t("recommendedHeight")}
                value={dimensionCalculations.recommendedHeight ?? ""}
                min={0}
                onChange={(e) =>
                    setField("dimensionCalculations", {
                        ...dimensionCalculations, recommendedHeight: Number(e.target.value)
                    })
                }
                error={errors.dimensionCalculations?.recommendedHeight?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("dimensionsByCustomer")}</span>
            <Select<IKnsDiameterItem>
                name="dimensionsByCustomerRequiredDiameter"
                label={t("requiredDiameter")}
                options={useKnsStore.getState().accordingCustomerRequirementsDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={accordingCustomerRequirementsDimensionCalculations.requiredDiameter}
                onChange={(value) =>
                    setField("accordingCustomerRequirementsDimensionCalculations",
                        {...accordingCustomerRequirementsDimensionCalculations, requiredDiameter: value})
                }
                error={errors.accordingCustomerRequirementsDimensionCalculations?.requiredDiameter?._errors[0]}
            />
            <FloatingLabelInput
                type="number"
                name="dimensionsByCustomerPermissibleHeight"
                label={t("allowableHeight")}
                value={accordingCustomerRequirementsDimensionCalculations.allowableHeight ?? ""}
                min={0}
                onChange={(e) =>
                    setField("accordingCustomerRequirementsDimensionCalculations", {
                        ...accordingCustomerRequirementsDimensionCalculations, allowableHeight: Number(e.target.value)
                    })
                }
                error={errors.accordingCustomerRequirementsDimensionCalculations?.allowableHeight?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("acceptedDimensions")}</span>
            <Select<IKnsHeightItem>
                name="acceptedDimensionsHeight"
                label={t("height")}
                options={useKnsStore.getState().acceptedDimensionsHeights}
                optionValueKey="id"
                optionLabelKeys={["height"]}
                wrapperClassName="p-0"
                value={acceptedDimensions.height}
                onChange={(value) =>
                    setField("acceptedDimensions", {...acceptedDimensions, height: value})
                }
                error={errors.acceptedDimensions?.height?._errors[0]}
            />
            <Select<IKnsDiameterItem>
                name="acceptedDimensionsDiameter"
                label={t("diameter")}
                options={useKnsStore.getState().acceptedDimensionsDiameters}
                optionValueKey="id"
                optionLabelKeys={["diameter"]}
                wrapperClassName="p-0"
                value={acceptedDimensions.diameter}
                onChange={(value) =>
                    setField("acceptedDimensions", {...acceptedDimensions, diameter: value})
                }
                error={errors.acceptedDimensions?.diameter?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("additionalEquipments")}</span>
            {additionalEquipmentList.map((equipment, index) => (
                <Fragment key={`equipment-${index}`}>
                    <div className="w-full flex items-center justify-between">
                        <span
                            className="text-foreground font-medium text-xl"
                        >
                            {t("additionalEquipment", {index: index + 1})}
                        </span>
                        <Button
                            className="text-card-foreground bg-destructive hover:bg-destructive/80 rounded-xl"
                            onClick={() => {
                                removeAdditionalEquipment(index)
                            }}
                        >
                            <Minus/>
                            <span>{t("remove")}</span>
                        </Button>
                    </div>
                    <FloatingLabelInput
                        type="number"
                        name={`equipment-${index}-power`}
                        label={t("nominalPower")}
                        value={equipment.power ?? ""}
                        min={0}
                        onChange={(e) =>
                            updateAdditionalEquipment(index, {
                                power: Number(e.target.value),
                            })
                        }
                        error={errors.additionalEquipmentList?.[index]?.power?._errors[0]}
                    />
                    <FloatingLabelInput
                        type="number"
                        name={`equipment-${index}-amperage`}
                        label={t("nominalAmperage")}
                        value={equipment.amperage ?? ""}
                        min={0}
                        onChange={(e) =>
                            updateAdditionalEquipment(index, {
                                amperage: Number(e.target.value),
                            })
                        }
                        error={errors.additionalEquipmentList?.[index]?.amperage?._errors[0]}
                    />
                    <FloatingLabelInput
                        type="number"
                        name={`equipment-${index}-quantity`}
                        label={t("quantity")}
                        value={equipment.amount ?? ""}
                        min={0}
                        onChange={(e) =>
                            updateAdditionalEquipment(index, {
                                amount: Number(e.target.value),
                            })
                        }
                        error={errors.additionalEquipmentList?.[index]?.amount?._errors[0]}
                    />
                </Fragment>
            ))}
            {additionalEquipmentList.length < 5 && (
                <Button
                    className="text-card-foreground rounded-xl"
                    onClick={() => {
                        addAdditionalEquipment()
                    }}
                >
                    <Plus/>
                    <span>{t("add")}</span>
                </Button>
            )}
        </div>
    );
};

const KnsResultTable: React.FC = () => {
    const t = useTranslations("features.kns.components.KnsComponent");
    const {
        sensorResult,
        pumpAtmResult,
        additionalValvesResult,
        additionalCheckValvesResult,
        chainResult,
        pipeAssemblyResult,
        basketResult,
        inletPipeResult,
        pressurePipeResult,
        ladderResult,
        pressureGaugeResult,
        guidePipesResult,
        controlCabinetResult,
        knsBuildingResult,
        controlCabinetPodiumResult,
        neckResult,
        coverResult,
        combinedResult,
    } = useKnsStore();

    const tableData: Record<string, IResponse<ICalculationResponse> | undefined> = {
        sensors: sensorResult,
        pumpATM: pumpAtmResult,
        additionalGateValves: additionalValvesResult,
        additionalCheckValves: additionalCheckValvesResult,
        chain: chainResult,
        pipeNode: pipeAssemblyResult,
        basket: basketResult,
        inletPipe: inletPipeResult,
        pressurePipe: pressurePipeResult,
        ladder: ladderResult,
        manometer: pressureGaugeResult,
        guidePipes: guidePipesResult,
        controlCabinet: controlCabinetResult,
        knsBuilding: knsBuildingResult,
        controlCabinetPodium: controlCabinetPodiumResult,
        neck: neckResult,
        cover: coverResult,
    }


    const total = combinedResult?.success
        ? combinedResult.data.total_activity_price :
        Object.values(tableData)
            .filter((item) => item !== undefined && item?.success)
            .reduce((acc, item) => acc + (item.data.total_activity_price ?? 0), 0)

    console.log({total, combinedResult})
    return (
        <div className="w-full flex flex-col items-start gap-4">
            <Table className="caption-top text-md rounded-md border border-muted">
                <TableCaption className="bg-muted text-lg font-bold p-4 rounded-t-md border-b border-muted">
                    {t("knsEquipmentCalculation")}
                </TableCaption>
                <TableHeader className="font-bold [&_tr]:border-b border-muted bg-card-primary">
                    <TableRow>
                        <TableHead className="border border-muted">{t("number")}</TableHead>
                        <TableHead className="border border-muted">{t("name")}</TableHead>
                        <TableHead className="border border-muted">{t("quantity")}</TableHead>
                        <TableHead className="border border-muted">{t("specification")}</TableHead>
                        <TableHead className="border border-muted">{t("price")}</TableHead>
                        <TableHead className="border border-muted">{t("totalCost")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(tableData).map(([key, response], index) => {
                        const value = response?.success ? response.data : undefined;
                        const error = !response?.success && response?.error ? response.error : "";

                        // Create the row content
                        const rowContent = (
                            <TableRow key={`row-${index}`}
                                      className={cn(error && "bg-destructive hover:bg-destructive/50")}>
                                <TableCell className="border border-muted">{index + 1}</TableCell>
                                <TableCell className="border border-muted">{t(key)}</TableCell>
                                <TableCell className="border border-muted">{value?.count}</TableCell>
                                <TableCell className="border border-muted">{value?.specification_name}</TableCell>
                                <TableCell className="border border-muted">
                                    {(Number(value?.activity_unit_price) || 0).toFixed(2)}
                                </TableCell>
                                <TableCell className="border border-muted">
                                    {(Number(value?.total_activity_price) || 0).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        );

                        // If error exists, wrap with Tooltip. Otherwise, just return the row.
                        return error ? (
                            <Tooltip key={`tooltip-${index}`}>
                                <TooltipTrigger asChild>
                                    {rowContent}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{error}</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            rowContent
                        );
                    })}

                </TableBody>
                <TableFooter>
                    <TableRow className="border-b border-muted rounded-b-xl">
                        <TableCell colSpan={4} className="border border-muted text-end rounded-b-xl">
                        </TableCell>
                        <TableCell colSpan={1} className="border border-muted text-end rounded-b-xl">
                            {t("total")}
                        </TableCell>
                        <TableCell colSpan={1} className="border border-muted rounded-b-xl">
                            {(Number(total) ?? 0).toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default KnsComponent;
