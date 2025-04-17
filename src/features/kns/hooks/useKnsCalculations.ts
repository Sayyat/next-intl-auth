import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {
    postAdditionalCheckValves,
    postAdditionalValves,
    postBasket,
    postChain,
    postCombined,
    postControlCabinet,
    postControlCabinetPodium,
    postCover,
    postGuidePipes,
    postInletPipe,
    postKnsBuilding,
    postLadder,
    postNeck,
    postPipeAssembly,
    postPressureGauge,
    postPressurePipe,
    postPumpAtm,
    postSensor,
} from "@/features/kns/services/calculation";
import {useCommonStore, useCommonValidation} from "@/features/common";
import {useKnsStore} from "@/features/kns/store/useKnsStore";
import {useTranslations} from "next-intl";
import {createKnsStateSchema, zodErrors2KnsErrorsMap} from "@/features/kns/lib/zod";
import {useState} from "react";

export const useKnsCalculations = () => {
    const t = useTranslations("features.kns.hooks.useKnsCalculations");
    const calculationSchema = createKnsStateSchema(useTranslations("features.kns.errors"))
    const [loading, setLoading] = useState(false)
    const {validate} = useCommonValidation()


    const calculationMutation = useMutation({
        mutationFn: async () => {
            setLoading(true);
            // Get the latest state snapshot at submission time:
            const commonStore = useCommonStore.getState();
            const store = useKnsStore.getState();

            await validate()
            const parseResult = await calculationSchema.safeParseAsync(store);
            if (!parseResult.success) {
                const errors = zodErrors2KnsErrorsMap(parseResult.error.errors);
                console.log({rawErrors: parseResult.error.errors})
                console.log({errors})
                store.setErrors(errors);
                throw new Error("Validation failed");
            } else {
                store.clearErrors();
            }
            // Validation (guard clauses)
            if (!store.pump.pressurePipeDiameter) {
                toast.error(t("missing.pumpPressurePipeDiameter"));
                throw new Error("Missing pump.pressurePipeDiameter");
            }
            if (!store.pump.pipeGuideDiameter) {
                toast.error(t("missing.pumpPipeGuideDiameter"));
                throw new Error("Missing pump.pipeGuideDiameter");
            }
            if (!store.acceptedDimensions.height) {
                toast.error(t("missing.acceptedDimensionsHeight"));
                throw new Error("Missing acceptedDimensions.height");
            }
            if (!store.acceptedDimensions.diameter) {
                toast.error(t("missing.acceptedDimensionsDiameter"));
                throw new Error("Missing acceptedDimensions.diameter");
            }
            if (!store.pressureCollector.diameter) {
                toast.error(t("missing.pressureCollectorDiameter"));
                throw new Error("Missing pressureCollector.diameter");
            }
            if (!store.pressureCollector.amount) {
                toast.error(t("missing.pressureCollectorAmount"));
                throw new Error("Missing pressureCollector.amount");
            }
            if (!store.supplyManifold.diameter) {
                toast.error(t("missing.supplyManifoldDiameter"));
                throw new Error("Missing supplyManifold.diameter");
            }

            const activities = {activity: commonStore.jobStep?.activity}

            const postSensorPayload = {
                pump_reserve: store.pump.reserve ?? 0,
                pump_workers: store.pump.working ?? 0,
            }


            const postPumpAtmPayload = {
                price: store.initialData.price ?? 0,
                pump_workers: store.pump.working ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
            }

            const postAdditionalValvesPayload = {
                price: store.initialData.price ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
                pump_workers: store.pump.working ?? 0,
                pump_pressure_pipe_diameter_id: store.pump.pressurePipeDiameter?.id ?? 0,
            }

            const postAdditionalCheckValvesPayload = {
                price: store.initialData.price ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
                pump_workers: store.pump.working ?? 0,
                pump_pressure_pipe_diameter_id: store.pump.pressurePipeDiameter?.id ?? 0,
            }

            const postChainPayload = {
                accepted_dimensions_height_id: store.acceptedDimensions.height?.id ?? 0,
                pump_weight: store.pump.weight ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
                pump_workers: store.pump.working ?? 0,
            }

            const postPipeAssemblyPayload = {
                accepted_dimensions_height_id: store.acceptedDimensions.height.id ?? 0,
                pump_pressure_pipe_diameter_id: store.pump.pressurePipeDiameter.id ?? 0,
                pressure_collector_count_id: store.pressureCollector.amount?.id ?? 0,
                supply_manifold_depth: store.supplyManifold.depth ?? 0,
                pressure_collector_depth: store.pressureCollector.depth ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
                pump_workers: store.pump.working ?? 0,
            }

            const postBasketPayload = {
                supply_manifold_count: store.supplyManifold.amount ?? 0,
                supply_manifold_diameter_id: store.supplyManifold.diameter?.id ?? 0,
            }

            const postInletPipePayload = {
                supply_manifold_count: store.supplyManifold.amount ?? 0,
                supply_manifold_diameter_id: store.supplyManifold.diameter?.id ?? 0,
            }

            const postPressurePipePayload = {
                pressure_collector_count_id: store.pressureCollector.amount?.id ?? 0,
                pressure_collector_diameter_id: store.supplyManifold.diameter?.id ?? 0,
            }

            const postLadderPayload = {
                accepted_dimensions_height_id: store.acceptedDimensions.height?.id ?? 0,
            }

            const postPressureGaugePayload = {
                pressure_collector_count_id: store.pressureCollector.amount?.id ?? 0,
            }

            const postGuidePipesPayload = {
                accepted_dimensions_height_id: store.acceptedDimensions.height?.id ?? 0,
                pump_pipe_guides_diameter_id: store.pump.pipeGuideDiameter?.id ?? 0,
                pump_workers: store.pump.working ?? 0,
                pump_reserve: store.pump.reserve ?? 0,
            }
            const postControlCabinetPayload = {
                count: store.initialData.controlCabinet?.id ?? 0,
                control_cabinet: {
                    pump_workers: store.pump.working ?? 0,
                    pump_reserve: store.pump.reserve ?? 0,
                    pump_rated_current: store.pump.amperage ?? 0,
                    pump_rated_power: store.pump.power ?? 0,
                    additional_electrical_equipment_1_rated_current: store.additionalEquipmentList[0]?.amperage ?? 0,
                    additional_electrical_equipment_1_count: store.additionalEquipmentList[0]?.amount ?? 0,
                    additional_electrical_equipment_2_rated_current: store.additionalEquipmentList[1]?.amperage ?? 0,
                    additional_electrical_equipment_2_count: store.additionalEquipmentList[1]?.amount ?? 0,
                    additional_electrical_equipment_3_rated_current: store.additionalEquipmentList[2]?.amperage ?? 0,
                    additional_electrical_equipment_3_count: store.additionalEquipmentList[2]?.amount ?? 0,
                    additional_electrical_equipment_4_rated_current: store.additionalEquipmentList[3]?.amperage ?? 0,
                    additional_electrical_equipment_4_count: store.additionalEquipmentList[3]?.amount ?? 0,
                    additional_electrical_equipment_5_rated_current: store.additionalEquipmentList[4]?.amperage ?? 0,
                    additional_electrical_equipment_5_count: store.additionalEquipmentList[4]?.amount ?? 0,
                    additional_electrical_equipment_6_rated_current: store.additionalEquipmentList[5]?.amperage ?? 0,
                    additional_electrical_equipment_6_count: store.additionalEquipmentList[5]?.amount ?? 0,
                }
            }

            const postKnsBuildingPayload = {
                accepted_dimensions_diameter_id: store.acceptedDimensions.diameter?.id ?? 0,
                accepted_dimensions_height_id: store.acceptedDimensions.height?.id ?? 0,
            }

            const postNeckPayload = {
                accepted_dimensions_diameter_id: store.acceptedDimensions.diameter?.id ?? 0,
            }

            const postCoverPayload = {
                accepted_dimensions_diameter_id: store.acceptedDimensions.diameter?.id ?? 0,
            }

            const responses = await Promise.allSettled([
                postSensor({
                    payload: postSensorPayload,
                    activities,
                }),
                postPumpAtm({
                    payload: postPumpAtmPayload,
                    activities,
                }),
                postAdditionalValves({
                    payload: postAdditionalValvesPayload,
                    activities,
                }),
                postAdditionalCheckValves({
                    payload: postAdditionalCheckValvesPayload,
                    activities,
                }),
                postChain({
                    payload: postChainPayload,
                    activities,
                }),
                postPipeAssembly({
                    payload: postPipeAssemblyPayload,
                    activities,
                }),
                postBasket({
                    payload: postBasketPayload,
                    activities,
                }),
                postInletPipe({
                    payload: postInletPipePayload,
                    activities,
                }),
                postPressurePipe({
                    payload: postPressurePipePayload,
                    activities,
                }),
                postLadder({
                    payload: postLadderPayload,
                    activities,
                }),
                postPressureGauge({
                    payload: postPressureGaugePayload,
                    activities,
                }),
                postGuidePipes({
                    payload: postGuidePipesPayload,
                    activities,
                }),
                postControlCabinet({
                    payload: postControlCabinetPayload,
                    activities,
                }),
                postKnsBuilding({
                    payload: postKnsBuildingPayload,
                    activities,
                }),
                postControlCabinetPodium({
                    payload: {},
                    activities,
                }),
                postNeck({
                    payload: postNeckPayload,
                    activities,
                }),
                postCover({
                    payload: postCoverPayload,
                    activities,
                }),
                postCombined({
                    basket: postBasketPayload,
                    chain: postChainPayload,
                    control_cabinet: postControlCabinetPayload,
                    control_cabinet_podium: {},
                    cover: postCoverPayload,
                    guide_pipes: postGuidePipesPayload,
                    inlet_pipe: postInletPipePayload,
                    kns_building: postKnsBuildingPayload,
                    ladder: postLadderPayload,
                    neck: postNeckPayload,
                    pipe_assembly: postPipeAssemblyPayload,
                    pressure_pipe: postPressurePipePayload,
                    pressure_gauge: postPressureGaugePayload,
                    pump_atm: postPumpAtmPayload,
                    additional_valves: postAdditionalValvesPayload,
                    additional_check_valves: postAdditionalCheckValvesPayload,
                    sensors: postSensorPayload,
                    activities,
                })
            ]);

            const keys = [
                "sensorResult",
                "pumpAtmResult",
                "additionalValvesResult",
                "additionalCheckValvesResult",
                "chainResult",
                "pipeAssemblyResult",
                "basketResult",
                "inletPipeResult",
                "pressurePipeResult",
                "ladderResult",
                "pressureGaugeResult",
                "guidePipesResult",
                "controlCabinetResult",
                "knsBuildingResult",
                "controlCabinetPodiumResult",
                "neckResult",
                "coverResult",
                "combinedResult",
            ] as const;

            let hasErrors = false;
            responses.forEach((res, index) => {
                if (res.status === "rejected") {
                    return
                }
                useKnsStore.getState().setKnsResult(keys[index], res.value);
                if (!res.value.success) {
                    hasErrors = true
                }
            });

            if (hasErrors) {
                throw new Error();
            }

            return responses;
        },
        onSuccess: () => toast.success(t("success")),
        onError: (error) => toast.error(t("error")),
        onSettled: () => setLoading(false)
    });

    return {loading, calculationMutation}
};
