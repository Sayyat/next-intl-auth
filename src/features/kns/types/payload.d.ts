import {ICalculationActivities} from "@/features/kns/types/api";

export interface ICalculationSensorPayload {
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationSensorPayloadWrapper {
    payload: ICalculationSensorPayload;
    activities: ICalculationActivities
}

export interface ICalculationPumpAtmPayload {
    price: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationPumpAtmPayloadWrapper {
    payload: ICalculationPumpAtmPayload;
    activities: ICalculationActivities
}

export interface ICalculationAdditionalValvesPayload {
    pump_pressure_pipe_diameter_id: number;
    price: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationAdditionalValvesPayloadWrapper {
    payload: ICalculationAdditionalValvesPayload;
    activities: ICalculationActivities
}


export interface ICalculationAdditionalCheckValvesPayload {
    pump_pressure_pipe_diameter_id: number;
    price: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationAdditionalCheckValvesPayloadWrapper {
    payload: ICalculationAdditionalCheckValvesPayload;
    activities: ICalculationActivities
}

export interface ICalculationChainPayload {
    accepted_dimensions_height_id: number;
    pump_weight: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationChainPayloadWrapper {
    payload: ICalculationChainPayload;
    activities: ICalculationActivities
}


export interface ICalculationPipeAssemblyPayload {
    accepted_dimensions_height_id: number;
    pump_pressure_pipe_diameter_id: number;
    pressure_collector_count_id: number;
    supply_manifold_depth: number;
    pressure_collector_depth: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationPipeAssemblyPayloadWrapper {
    payload: ICalculationPipeAssemblyPayload;
    activities: ICalculationActivities
}


export interface ICalculationBasketPayload {
    supply_manifold_count: number;
    supply_manifold_diameter_id: number;
}

export interface ICalculationBasketPayloadWrapper {
    payload: ICalculationBasketPayload;
    activities: ICalculationActivities
}


export interface ICalculationInletPipePayload {
    supply_manifold_count: number;
    supply_manifold_diameter_id: number;
}

export interface ICalculationInletPipePayloadWrapper {
    payload: ICalculationInletPipePayload;
    activities: ICalculationActivities
}

export interface ICalculationPressurePipePayload {
    pressure_collector_count_id: number;
    pressure_collector_diameter_id: number;
}

export interface ICalculationPressurePipePayloadWrapper {
    payload: ICalculationPressurePipePayload;
    activities: ICalculationActivities
}

export interface ICalculationLadderPayload {
    accepted_dimensions_height_id: number;
}

export interface ICalculationLadderPayloadWrapper {
    payload: ICalculationLadderPayload;
    activities: ICalculationActivities
}

export interface ICalculationPressureGaugePayload {
    pressure_collector_count_id: number;
}

export interface ICalculationPressureGaugePayloadWrapper {
    payload: ICalculationPressureGaugePayload;
    activities: ICalculationActivities
}

export interface ICalculationGuidePipesPayload {
    accepted_dimensions_height_id: number;
    pump_pipe_guides_diameter_id: number;
    pump_workers: number;
    pump_reserve: number;
}

export interface ICalculationGuidePipesPayloadWrapper {
    payload: ICalculationGuidePipesPayload;
    activities: ICalculationActivities
}

export interface ICalculationControlCabinetPayload {
    count: number,
    control_cabinet: {
        pump_workers: number;
        pump_reserve: number;
        pump_rated_current: number;
        pump_rated_power: number;
        additional_electrical_equipment_1_rated_current: number;
        additional_electrical_equipment_1_count: number;
        additional_electrical_equipment_2_rated_current: number;
        additional_electrical_equipment_2_count: number;
        additional_electrical_equipment_3_rated_current: number;
        additional_electrical_equipment_3_count: number;
        additional_electrical_equipment_4_rated_current: number;
        additional_electrical_equipment_4_count: number;
        additional_electrical_equipment_5_rated_current: number;
        additional_electrical_equipment_5_count: number;
        additional_electrical_equipment_6_rated_current: number;
        additional_electrical_equipment_6_count: number;
    }
}

export interface ICalculationControlCabinetPayloadWrapper {
    payload: ICalculationControlCabinetPayload;
    activities: ICalculationActivities
}

export interface ICalculationKnsBuildingPayload {
    accepted_dimensions_diameter_id: number;
    accepted_dimensions_height_id: number;
}

export interface ICalculationKnsBuildingPayloadWrapper {
    payload: ICalculationKnsBuildingPayload;
    activities: ICalculationActivities
}

export type ICalculationControlCabinetPodiumPayload = object

export interface ICalculationControlCabinetPodiumPayloadWrapper {
    payload: ICalculationControlCabinetPodiumPayload;
    activities: ICalculationActivities
}

export interface ICalculationNeckPayload {
    accepted_dimensions_diameter_id: number;
}

export interface ICalculationNeckPayloadWrapper {
    payload: ICalculationNeckPayload;
    activities: ICalculationActivities
}

export interface ICalculationCoverPayload {
    accepted_dimensions_diameter_id: number;
}

export interface ICalculationCoverPayloadWrapper {
    payload: ICalculationCoverPayload;
    activities: ICalculationActivities
}


export interface ICalculationCombinedPayloadWrapper {
    basket: ICalculationBasketPayload,
    chain: ICalculationChainPayload,
    control_cabinet: ICalculationControlCabinetPayload,
    control_cabinet_podium: ICalculationControlCabinetPodiumPayload,
    cover: ICalculationCoverPayload,
    guide_pipes: ICalculationGuidePipesPayload,
    inlet_pipe: ICalculationInletPipePayload,
    kns_building: ICalculationKnsBuildingPayload,
    ladder: ICalculationLadderPayload,
    neck: ICalculationNeckPayload,
    pipe_assembly: ICalculationPipeAssemblyPayload,
    pressure_pipe: ICalculationPressurePipePayload,
    pressure_gauge: ICalculationPressureGaugePayload,
    pump_atm: ICalculationPumpAtmPayload,
    additional_valves: ICalculationAdditionalValvesPayload,
    additional_check_valves: ICalculationAdditionalCheckValvesPayload,
    sensors: ICalculationSensorPayload,
    activities: ICalculationActivities
}