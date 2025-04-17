import {apiClient} from "@/shared/services/client";
import {handleResponse} from "@/shared/services/api";
import {
    IBufferCapacityResponse,
    ICleaningStationResponse,
    IDisinfectionUnitResponse,
    IDisinfectionUnitPayload
} from "@/features/household-goods/types/aamAndAamp";
import {IResponse} from "@/shared";

// Fetch Buffer Capacity Data (POST request with payload)
export const fetchBufferCapacity = async (payload: IDisinfectionUnitPayload): Promise<IResponse<IBufferCapacityResponse>> => {
    return await handleResponse<IBufferCapacityResponse>(
        apiClient.post("/api/buffer_capacity/", payload)
    );
};

// Fetch Cleaning Station Data (POST request with payload)
export const fetchCleaningStation = async (payload: IDisinfectionUnitPayload): Promise<IResponse<ICleaningStationResponse>> => {
    return await handleResponse<ICleaningStationResponse>(
        apiClient.post("/api/cleaning_station/", payload)
    );
};

// Fetch Disinfection Unit Data (POST request with payload)
export const fetchDisinfectionUnit = async (payload: IDisinfectionUnitPayload): Promise<IResponse<IDisinfectionUnitResponse>> => {
    return await handleResponse<IDisinfectionUnitResponse>(
        apiClient.post("/api/disinfection_unit/", payload)
    );
};
