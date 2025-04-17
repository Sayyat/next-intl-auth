import {
    IAltoBioCleanPayload,
    IAltoBioCleanSelectItem,
    IAltoBioCleanSubmitPayload,
    IAltoBioCleanSubmitResult
} from "@/features/household-goods/types/ab";
import {handleResponse} from "@/shared/services/api";
import {apiClient} from "@/shared/services/client";
import {IResponse} from "@/shared";


// Fetch Alta Bio list (POST request with payload)
export const fetchAltoBioCleanList = async (payload: IAltoBioCleanPayload): Promise<IResponse<IAltoBioCleanSelectItem[]>> => {
    return await handleResponse<IAltoBioCleanSelectItem[]>(
        apiClient.get(`/api/alta_bio_clean/by_threshold?wastewater_flow=${payload.wastewater_flow}`),
    );
};

// Fetch Alta Bio list (POST request with payload)
export const submitAltoBioClean = async (payload: IAltoBioCleanSubmitPayload): Promise<IResponse<IAltoBioCleanSubmitResult>> => {
    return await handleResponse<IAltoBioCleanSubmitResult>(
        apiClient.post("/api/alta_bio_clean/calculation", payload),
    );
};