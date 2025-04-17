import {
    ICalculationAdditionalCheckValvesPayloadWrapper,
    ICalculationAdditionalValvesPayloadWrapper,
    ICalculationBasketPayloadWrapper,
    ICalculationChainPayloadWrapper, ICalculationCombinedPayloadWrapper,
    ICalculationControlCabinetPayloadWrapper,
    ICalculationControlCabinetPodiumPayloadWrapper,
    ICalculationCoverPayloadWrapper,
    ICalculationGuidePipesPayloadWrapper,
    ICalculationInletPipePayloadWrapper,
    ICalculationKnsBuildingPayloadWrapper,
    ICalculationLadderPayloadWrapper,
    ICalculationNeckPayloadWrapper,
    ICalculationPipeAssemblyPayloadWrapper,
    ICalculationPressureGaugePayloadWrapper,
    ICalculationPressurePipePayloadWrapper,
    ICalculationPumpAtmPayloadWrapper,
    ICalculationSensorPayloadWrapper
} from "@/features/kns/types/payload";
import {IResponse} from "@/shared";
import {ICalculationResponse} from "@/features/kns/types/response";
import {createApiService} from "@/shared/services/api";
import {apiClient} from "@/shared/services/client";

const api = createApiService(apiClient);

export const postSensor = (
    payload: ICalculationSensorPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/sensor", payload);

export const postPumpAtm = (
    payload: ICalculationPumpAtmPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/pump_atm", payload);

export const postAdditionalValves = (
    payload: ICalculationAdditionalValvesPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/additional_valves", payload);

export const postAdditionalCheckValves = (
    payload: ICalculationAdditionalCheckValvesPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/additional_check_valves", payload);

export const postChain = (
    payload: ICalculationChainPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/chain", payload);

export const postPipeAssembly = (
    payload: ICalculationPipeAssemblyPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/pipe_assembly", payload);

export const postBasket = (
    payload: ICalculationBasketPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/basket", payload);

export const postInletPipe = (
    payload: ICalculationInletPipePayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/inlet_pipe", payload);

export const postPressurePipe = (
    payload: ICalculationPressurePipePayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/pressure_pipe", payload);

export const postLadder = (
    payload: ICalculationLadderPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/ladder", payload);

export const postPressureGauge = (
    payload: ICalculationPressureGaugePayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/pressure_gauge", payload);

export const postGuidePipes = (
    payload: ICalculationGuidePipesPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/guide_pipes", payload);

export const postControlCabinet = (
    payload: ICalculationControlCabinetPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/control_cabinet", payload);

export const postKnsBuilding = (
    payload: ICalculationKnsBuildingPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/kns_building", payload);

export const postControlCabinetPodium = (
    payload: ICalculationControlCabinetPodiumPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/control_cabinet_podium", payload);

export const postNeck = (
    payload: ICalculationNeckPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/neck", payload);

export const postCover = (
    payload: ICalculationCoverPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/cover", payload);

export const postCombined = (
    payload: ICalculationCombinedPayloadWrapper
): Promise<IResponse<ICalculationResponse>> =>
    api.postWithHandle<ICalculationResponse>("/api/calculation/combined", payload);
