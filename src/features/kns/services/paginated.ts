import {IPaginatedResponse, IPaginationParams, IResponse} from "@/shared";
import {IKnsDiameterItem, IKnsHeightItem, IKnsQuantityItem} from "@/features/kns/types/response";
import {DEFAULT_PAGINATION_PARAMS} from "@/shared/lib/constants";
import {createApiService} from "@/shared/services/api";
import {apiClient} from "@/shared/services/client";

const api = createApiService(apiClient);

export const getPumpPressurePipeDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/pump_pressure_pipe/diameter", params);

export const getPumpPipeGuidesDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/pump_pipe_guides/diameter", params);

export const getSupplyManifoldDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/supply_manifold/diameter", params);

export const getPressureCollectorDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/pressure_collector/diameter", params);

export const getPressureCollectorCounts = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsQuantityItem>>> =>
    api.getPaginatedWithHandle<IKnsQuantityItem>("/api/pressure_collector/count", params);

export const getAccordingCustomerRequirementsDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/according_customer_requirements/diameter", params);

export const getAcceptedDimensionsHeights = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsHeightItem>>> =>
    api.getPaginatedWithHandle<IKnsHeightItem>("/api/accepted_dimensions/height", params);

export const getAcceptedDimensionsDiameters = (
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<IResponse<IPaginatedResponse<IKnsDiameterItem>>> =>
    api.getPaginatedWithHandle<IKnsDiameterItem>("/api/accepted_dimensions/diameter", params);
