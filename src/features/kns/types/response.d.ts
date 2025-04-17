import {TActivity} from "@/features/kns/types/api";

export interface IKnsDiameterItem {
    id: number;
    diameter: number;
}

export interface IKnsQuantityItem {
    id: number;
    quantity: number;
}

export interface IKnsHeightItem {
    id: number;
    height: number;
}

export interface IKnsControlCabinetItem {
    id: number;
    value: number;
}

export interface ICalculationResponse {
    activity: TActivity,
    count: number,
    specification_name: string,
    activity_unit_price: number,
    total_activity_price: number,
    unit_price: number,
    total_price: number,
}

