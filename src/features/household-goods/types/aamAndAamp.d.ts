import {IDiameterNumberPair} from "./api";

// Request payload type
export interface IBufferCapacityPayload {
    waste_water_flow: number;
    total_volume: number;
    count_salvos: number;
    inlet_depth: number;
}

export interface ICleaningStationPayload {
    waste_water_flow: number;
    inlet_depth: number;
}

export interface IDisinfectionUnitPayload {
    waste_water_flow: number;
    inlet_depth: number;
}

// API Response Types
// Cleaning Station
export interface ICleaningStationData {
    model: string;
    performance: number;
    quantity: number;
    total_performance: number;
    price_per_unit: number;
    total_price: number;
    price: number;
    annual_technical_water_consumption: number;
    coagulant_consumption_daily: number;
    neck_630: number;
    neck_955: number;
    neck_1220: number;
}

export interface IAggregatedCountItem {
    counts: IDiameterNumberPair;
    total_segments: number;
}


export interface IAggregatedCountsMap {
    "630": IAggregatedCountItem
    "955": IAggregatedCountItem
    "1220": IAggregatedCountItem
}


export interface IAggregatedCost {
    costs: IDiameterNumberPair;
    total_cost: number;
}


export interface IAggregatedCostsMap {
    "630": IAggregatedCost
    "955": IAggregatedCost
    "1220": IAggregatedCost
}

export interface ICleaningStationResponse {
    aggregated_counts: IAggregatedCountsMap,
    overall_total_segments: number;
    aggregated_costs: IAggregatedCostsMap,
    overall_neck_total_cost: number;
    cleaning_station_data: ICleaningStationData;
}


// Disinfection Unit
export interface IIndividualCosts {
    diameter_630_sum: IDiameterNumberPair;
    diameter_955_sum: IDiameterNumberPair;
    diameter_1220_sum: IDiameterNumberPair;
}

export interface IDisinfectionUnitCounts {
    diameter_630: IDiameterNumberPair;
    diameter_955: IDiameterNumberPair;
    diameter_1220: IDiameterNumberPair;
}

// Disinfection Unit API Response
export interface IDisinfectionUnitResponse {
    data: {
        counts: IDisinfectionUnitCounts
        cost: {
            individual_costs: IIndividualCosts
            grand_total_sum: number;
            grand_total_one_line: number;
            alta_bio_total: number;
            price_per_unit: number;
            quantity: number;
            performance: number;
            model: string;
        };
    };
}

// Buffer capacity data
export interface IHourlyData {
    hour: number;
    volley: number;
    hourly_average: number;
    pumping: number;
    remaining: number;
}

export interface ICalculateBufferResult {
    hours_data: IHourlyData[];
    final_remaining: number;
    max_remaining: number;
}

export interface IAllocationData {
    count: number;
    remainder: number;
}


export interface IDiameterAllocation {
    "500": IAllocationData;
    "1000": IAllocationData;
    "1500": IAllocationData;
    "2000": IAllocationData;
    "2500": IAllocationData;
    "3000": IAllocationData;
}

export interface IBufferCapacityDiameterData {
    neck_piece_length: number;
    allocation: IDiameterAllocation;
    final_remainder: number;
}

export interface INeckData {
    "630": IBufferCapacityDiameterData;
    "955": IBufferCapacityDiameterData;
    "1220": IBufferCapacityDiameterData;
}

export interface ICostBreakdownDiameterItem {
    count: number;
    cost_per_price: number;
    total_cost: number;
}

export interface ICostBreakdownDiameter {
    "500"?: ICostBreakdownDiameterItem;
    "1000"?: ICostBreakdownDiameterItem;
    "1500"?: ICostBreakdownDiameterItem;
    "2000"?: ICostBreakdownDiameterItem;
    "2500"?: ICostBreakdownDiameterItem;
    "3000"?: ICostBreakdownDiameterItem;
}

export interface ICostBreakdown {
    "630"?: ICostBreakdownDiameter;
    "955"?: ICostBreakdownDiameter;
    "1220"?: ICostBreakdownDiameter;
}

// Buffer Capacity API Response
export interface IBufferCapacityResponse {
    need_buffer_name: string;
    need_buffer_volume: number;
    number_containers: number;
    price_per_unit: number;
    neck_total: number;
    calculate_buffer_result: ICalculateBufferResult;
    necks_data: INeckData;
    cost_breakdown: ICostBreakdown;
}
