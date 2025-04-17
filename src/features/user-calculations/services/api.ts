import {IPaginatedResponse, IPaginationParams, IResponse} from "@/shared";
import {DEFAULT_PAGINATION_PARAMS} from "@/shared/lib/constants";
import {createApiService} from "@/shared/services/api";
import {apiClient} from "@/shared/services/client";
import {ICalculationRowData} from "@/features/user-calculations/types/api";

const api = createApiService(apiClient);

export const getUserCalculations = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<ICalculationRowData>>> =>
    api.getPaginatedWithHandle<ICalculationRowData>("/api/manager-instruments/user-calculations", params);


export const getUserCalculationById = (
    id: number
): Promise<IResponse<ICalculationRowData>> =>
    api.getWithHandle<ICalculationRowData>(`/api/manager-instruments/user-calculations/${id}`);
