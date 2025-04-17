import {ICity} from "@/features/common";

export interface ICalculationRowData {
    id: number;
    name: string;
    organization: string;
    city: ICity;
    object_name: string;
    created_at: string;
}

export interface IItemsPerPage {
    value: number;
    label: string;
}