import {IIndividualCostsData, IDiameterNumberPair} from "./api";

export interface IAltoBioCleanPayload {
    "wastewater_flow": number
}

export interface IAltoBioCleanSelectItem {
    "id": number,
    "name": string,
    "energy_consumption": number,
    "energy": number,
    "annual_energy_consumption": null,
    "annual_cost": null,
    "uv_lamps_count": null,
    "lamp_cost": null,
    "filters_count": null,
    "manufacturer": number,
    "neck": number,
    "neck_955": number,
    "neck_1220": number,
    "price": number
}


export interface IAltoBioCleanSubmitPayload {
    "volley": number,
    "supply_depth": number,
    "alta_bio_clean_id": number
}


export interface IAltaBioCleanCounts {
    diameter_630: IDiameterNumberPair;
    diameter_955: IDiameterNumberPair;
    diameter_1220: IDiameterNumberPair;
}

export interface IIndividualCostsData {
    diameter_630: IDiameterNumberPair;
    diameter_955: IDiameterNumberPair;
    diameter_1220: IDiameterNumberPair;
}

export interface IAltoBioCleanSubmitResult {
    "data": {
        counts: IAltaBioCleanCounts;
        cost: {
            individual_costs: IIndividualCostsData
            total_cost_neck: number;
            alta_bio_clean_price: number;
            grand_total_neck_count: number;
        };
    }
}
