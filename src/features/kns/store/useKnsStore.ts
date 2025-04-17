// features/kns/store/useKnsStore.ts
import {create} from "zustand";
import {
    ICalculationResponse,
    IKnsControlCabinetItem,
    IKnsDiameterItem,
    IKnsHeightItem,
    IKnsQuantityItem
} from "@/features/kns/types/response";
import {IAdditionalEquipment} from "@/features/kns/types/api";
import {IResponse} from "@/shared";
import {TKnsErrorsMap} from "@/features/kns/lib/zod";

export interface IKnsState {
    // payload from user start
    deal: {
        dealNumber?: string | null;
        knsNumber?: string | null;
    };
    initialData: {
        flowRate?: number | null;
        pressure?: number | null;
        price?: number | null;
        controlCabinet?: IKnsControlCabinetItem | null;
    }

    supplyManifold: {
        diameter?: IKnsDiameterItem | null,
        depth?: number | null;
        amount?: number | null;
    }

    pressureCollector: {
        diameter?: IKnsDiameterItem | null,
        depth?: number | null;
        amount?: IKnsQuantityItem | null;
    }

    pump: {
        height?: number | null;
        diameter?: number | null;
        length?: number | null;
        width?: number | null;
        working?: number | null;
        reserve?: number | null;
        startsPerHour?: number | null;
        totalStarts?: number | null;
        power?: number | null;
        amperage?: number | null;
        pressurePipeDiameter?: IKnsDiameterItem | null;
        pipeGuideDiameter?: IKnsDiameterItem | null;
        weight?: number | null;
    }

    dimensionCalculations: {
        recommendedDiameter?: number | null;
        recommendedHeight?: number | null;
    }

    accordingCustomerRequirementsDimensionCalculations: {
        requiredDiameter?: IKnsDiameterItem | null;
        allowableHeight?: number | null;
    }

    acceptedDimensions: {
        height?: IKnsHeightItem | null;
        diameter?: IKnsDiameterItem | null;
    }

    additionalEquipmentList: IAdditionalEquipment[];
    // payload from user end

    // submission result start
    sensorResult?: IResponse<ICalculationResponse>;
    pumpAtmResult?: IResponse<ICalculationResponse>;
    additionalValvesResult?: IResponse<ICalculationResponse>;
    additionalCheckValvesResult?: IResponse<ICalculationResponse>;
    chainResult?: IResponse<ICalculationResponse>;
    pipeAssemblyResult?: IResponse<ICalculationResponse>;
    basketResult?: IResponse<ICalculationResponse>;
    inletPipeResult?: IResponse<ICalculationResponse>;
    pressurePipeResult?: IResponse<ICalculationResponse>;
    ladderResult?: IResponse<ICalculationResponse>;
    pressureGaugeResult?: IResponse<ICalculationResponse>;
    guidePipesResult?: IResponse<ICalculationResponse>;
    controlCabinetResult?: IResponse<ICalculationResponse>;
    knsBuildingResult?: IResponse<ICalculationResponse>;
    controlCabinetPodiumResult?: IResponse<ICalculationResponse>;
    neckResult?: IResponse<ICalculationResponse>;
    coverResult?: IResponse<ICalculationResponse>;
    combinedResult?: IResponse<ICalculationResponse>;
    // submission result end

    // options for selects start
    controlCabinetItems: IKnsControlCabinetItem[]; // will be set to initialData.amount via Select
    pumpPressurePipeDiameters: IKnsDiameterItem[]; // will be set to pump.pressurePipeDiameter via Select
    pumpPipeGuidesDiameters: IKnsDiameterItem[]; // will be set to pump.pressurePipeDiameter via Select
    supplyManifoldDiameters: IKnsDiameterItem[]; // will be set to supplyManifold.diameter via Select
    accordingCustomerRequirementsDiameters: IKnsDiameterItem[]; // will be set to accordingCustomerRequirementsDimensionCalculations.requiredDiameter via Select
    pressureCollectorDiameters: IKnsDiameterItem[]; // will be set to pressureCollector.amount via Select
    pressureCollectorCounts: IKnsQuantityItem[]; // will be set to pressureCollector.amount via Select
    acceptedDimensionsHeights: IKnsHeightItem[]; // will be set to acceptedDimensions.height via Select
    acceptedDimensionsDiameters: IKnsDiameterItem[]; // will be set to acceptedDimensions.diameter via Select

    errors: TKnsErrorsMap;
    // options for selects end

    // helper methods start
    setErrors: (errors: TKnsErrorsMap) => void;
    clearErrors: () => void;

    setField: (
        field: keyof IKnsState,
        value: IKnsState[keyof IKnsState]
    ) => void;

    setKnsResult: (
        key:
            | "sensorResult"
            | "pumpAtmResult"
            | "additionalValvesResult"
            | "additionalCheckValvesResult"
            | "chainResult"
            | "pipeAssemblyResult"
            | "basketResult"
            | "inletPipeResult"
            | "pressurePipeResult"
            | "ladderResult"
            | "pressureGaugeResult"
            | "guidePipesResult"
            | "controlCabinetResult"
            | "knsBuildingResult"
            | "controlCabinetPodiumResult"
            | "neckResult"
            | "coverResult"
            | "combinedResult",
        result: IResponse<ICalculationResponse>
    ) => void;

    addAdditionalEquipment: () => void;
    updateAdditionalEquipment: (index: number, value: Partial<IAdditionalEquipment>) => void;
    removeAdditionalEquipment: (index: number) => void;

    resetForm: () => void;
    // helper methods end
}

export const useKnsStore = create<IKnsState>((set) => ({
    deal: {dealNumber: "", knsNumber: ""},
    initialData: {
        flowRate: 1,
        pressure: 1,
        price: 1,
        controlCabinet: {id: 1, value: 1},
    },

    supplyManifold: {
        amount: 1,
        depth: 1,
    },

    pressureCollector: {
        depth: 1,
    },
    
    pump: {
        height: 1,
        diameter: 1,
        length: 1,
        width: 1,
        working: 1,
        reserve: 1,
        startsPerHour: 1,
        totalStarts: 1,
        power: 1,
        amperage: 1,
        weight: 1,
    },

    dimensionCalculations: {
        recommendedDiameter: 1,
        recommendedHeight: 1,
    },

    accordingCustomerRequirementsDimensionCalculations: {
        allowableHeight: 1,
    },

    acceptedDimensions: {},
    additionalEquipmentList: [
        {
            power: 1,
            amperage: 1,
            amount: 1,
        }
    ],

    sensorResult: undefined,
    pumpAtmResult: undefined,
    additionalValvesResult: undefined,
    additionalCheckValvesResult: undefined,
    chainResult: undefined,
    pipeAssemblyResult: undefined,
    basketResult: undefined,
    inletPipeResult: undefined,
    pressurePipeResult: undefined,
    ladderResult: undefined,
    pressureGaugeResult: undefined,
    guidePipesResult: undefined,
    controlCabinetResult: undefined,
    knsBuildingResult: undefined,
    controlCabinetPodiumResult: undefined,
    neckResult: undefined,
    coverResult: undefined,
    combinedResult: undefined,

    controlCabinetItems: [],
    pumpPressurePipeDiameters: [],
    pumpPipeGuidesDiameters: [],
    supplyManifoldDiameters: [],
    accordingCustomerRequirementsDiameters: [],
    pressureCollectorDiameters: [],
    pressureCollectorCounts: [],
    acceptedDimensionsHeights: [],
    acceptedDimensionsDiameters: [],

    errors: {},

    setErrors: (errors) => set(() => ({errors})),
    clearErrors: () => set(() => ({errors: {}})),

    setField: (field, value) => {
        set((state) => ({
            ...state,
            [field]: value,
        }));
    },

    setKnsResult: (key, result) => {
        set(() => ({[key]: result}));
    },

    addAdditionalEquipment: () => {
        set((state) => ({
            additionalEquipmentList: [...state.additionalEquipmentList, {
                power: 0,
                amperage: 0,
                amount: 0,
            }]
        }))
    },

    updateAdditionalEquipment: (index, value) => {
        set((state) => {
            if (index < 0 || index >= state.additionalEquipmentList.length) {
                return state;
            }

            const updatedList = state.additionalEquipmentList.map((item, i) =>
                i === index ? {...item, ...value} : item
            );

            return {
                ...state,
                additionalEquipmentList: updatedList,
            };
        });
    },

    removeAdditionalEquipment: (index) => {
        set((state) => {
            if (index < 0 || index >= state.additionalEquipmentList.length) {
                return state;
            }
            return {
                ...state,
                additionalEquipmentList: state.additionalEquipmentList.filter((_, i) => i !== index),
            };
        });
    },

    resetForm: () => {
        set(() => ({
            deal: {dealNumber: undefined, knsNumber: undefined},
            initialData: {
                flowRate: undefined,
                pressure: undefined,
                price: undefined,
                controlCabinet: undefined,
            },
            supplyManifold: {
                amount: null,
                depth: null,
                diameter: null,
            },
            pressureCollector: {
                depth: null,
                diameter: undefined,
                amount: undefined,
            },
            pump: {
                height: null,
                diameter: null,
                length: null,
                width: null,
                working: null,
                reserve: null,
                startsPerHour: null,
                totalStarts: null,
                power: null,
                amperage: null,
                weight: null,
                pressurePipeDiameter: null,
                pipeGuideDiameter: null,
            },
            dimensionCalculations: {
                recommendedDiameter: null,
                recommendedHeight: null,
            },
            accordingCustomerRequirementsDimensionCalculations: {
                requiredDiameter: null,
                allowableHeight: null,
            },

            acceptedDimensions: {},

            additionalEquipmentList: [],
            sensorResult: undefined,
            pumpAtmResult: undefined,
            additionalValvesResult: undefined,
            additionalCheckValvesResult: undefined,
            chainResult: undefined,
            pipeAssemblyResult: undefined,
            basketResult: undefined,
            inletPipeResult: undefined,
            pressurePipeResult: undefined,
            ladderResult: undefined,
            pressureGaugeResult: undefined,
            guidePipesResult: undefined,
            controlCabinetResult: undefined,
            knsBuildingResult: undefined,
            controlCabinetPodiumResult: undefined,
            neckResult: undefined,
            coverResult: undefined,
            combinedResult: undefined,
            // Options for selects
            errors: {},
        }));
    },
}));
