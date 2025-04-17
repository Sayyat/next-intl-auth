import {handleResponse} from "@/shared/services/api";
import {
    IBufferCapacityResponse,
    ICleaningStationResponse,
    IDisinfectionUnitResponse,
    IDisinfectionUnitPayload
} from "@/features/household-goods/types/aamAndAamp";
import {IResponse} from "@/shared";
import axios from "axios";

export const apiClient = axios.create({
    headers: {"Content-Type": "application/json"},
});


// Fetch Buffer Capacity Data (POST request with payload)
export const fetchBufferCapacity = async (payload: IDisinfectionUnitPayload): Promise<IResponse<IBufferCapacityResponse>> => {
    return await handleResponse<IBufferCapacityResponse>(
        apiClient.post("/api/proxy/buffer_capacity/", payload) // Use proxy route
    );
};

// Fetch Cleaning Station Data (POST request with payload)
export const fetchCleaningStation = async (payload: IDisinfectionUnitPayload): Promise<IResponse<ICleaningStationResponse>> => {
    return await handleResponse<ICleaningStationResponse>(
        apiClient.post("/api/proxy/cleaning_station/", payload) // Use proxy route
    );
};

// Fetch Disinfection Unit Data (POST request with payload)
export const fetchDisinfectionUnit = async (payload: IDisinfectionUnitPayload): Promise<IResponse<IDisinfectionUnitResponse>> => {
    return await handleResponse<IDisinfectionUnitResponse>(
        apiClient.post("/api/proxy/disinfection_unit/", payload) // Use proxy route
    );
};
