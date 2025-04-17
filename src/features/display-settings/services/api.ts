import {IPaginatedResponse, IPaginationParams, IResponse} from "@/shared";
import {DEFAULT_PAGINATION_PARAMS} from "@/shared/lib/constants";
import {createApiService} from "@/shared/services/api";
import {apiClient} from "@/shared/services/client";
import {IRowData} from "@/features/display-settings/types/api";

const api = createApiService(apiClient);

export const getSettings = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IRowData>>> =>
    api.getPaginatedWithHandle<IRowData>("/api/manager-instruments/display-data", params);

export const postRowSettings = (
    payload: IRowData
): Promise<IResponse<IRowData>> =>
    api.postWithHandle<IRowData>("/api/calculation/pump_atm", payload);
