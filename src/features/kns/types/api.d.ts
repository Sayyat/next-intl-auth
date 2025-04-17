import {TActivity} from "@/features/common/types/api";

export interface ICalculationActivities {
    activity?: TActivity | null;
}

export interface IAdditionalEquipment {
    power: number;
    amperage: number;
    amount: number;
}
