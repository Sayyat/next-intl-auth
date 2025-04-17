// Request payload type
export interface CalculationRequest {
    total_volume: number;
    waste_water_flow: number;
    count_salvos: number;
    inlet_depth: number;
    disinfection: boolean;
    dehydration: boolean;
}

// API Response Types
// Cleaning Station
export interface DiameterNumberPair {
    "500": number;
    "1000": number;
    "1500": number;
    "2000": number;
    "2500": number;
    "3000": number;
}

export interface DiameterCostsData {
    diameter_630_costs: DiameterNumberPair;
    diameter_955_costs: DiameterNumberPair;
    diameter_1220_costs: DiameterNumberPair;
}

export interface CleaningStationCostsData {
    grand_total_sum: number;
    cleaning_station: number;
    grand_total_one_line: number;
    сleaning_station_data: number;
    model: string;
    performance: number;
    quantity: number;
}

export interface CleaningStationResponse {
    data: {
        diameter_630: DiameterNumberPair;
        diameter_955: DiameterNumberPair;
        diameter_1220: DiameterNumberPair;
        cost: DiameterCostsData;
        costs: CleaningStationCostsData;
    };
}


// Disinfection Unit

export interface DisinfectionUnitCosts {
    grand_total_sum: number;
    alta_bio_total: number;
    price_per_unit: number;
    cleaning_station_data: number;
    quantity: number;
    performance: number;
    model: string;
}

// Disinfection Unit API Response
export interface DisinfectionUnitResponse {
    data: {
        diameter_630: DiameterNumberPair;
        diameter_955: DiameterNumberPair;
        diameter_1220: DiameterNumberPair;
        cost: DiameterCostsData;
        costs: DisinfectionUnitCosts;
    };
}



export interface HourlyData {
    hour: number;
    volley: number;
    hourly_average: number;
    pumping: number;
    remaining: number;
}

export interface CalculateBufferResult {
    hours_data: HourlyData[];
    final_remaining: number;
    max_remaining: number;
}

export interface AllocationData {
    count: number;
    remainder: number;
}


export interface DiameterAllocation {
    "500": AllocationData;
    "1000": AllocationData;
    "1500": AllocationData;
    "2000": AllocationData;
    "2500": AllocationData;
    "3000": AllocationData;
}

export interface BufferCapacityDiameterData {
    neck_piece_length: number;
    allocation: DiameterAllocation;
    final_remainder: number;
}

// Buffer Capacity API Response
export interface BufferCapacityResponse {
    need_buffer_name: string;
    need_buffer_volume: number;
    number_containers: number;
    price_per_unit: number;
    neck_total: number;
    calculate_buffer_result: CalculateBufferResult;
    diameter_630: BufferCapacityDiameterData;
    diameter_1220: BufferCapacityDiameterData;
}
