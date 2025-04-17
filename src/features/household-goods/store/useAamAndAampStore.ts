import {create} from "zustand";
import {
    IBufferCapacityResponse,
    ICleaningStationResponse,
    IDisinfectionUnitResponse,
} from "@/features/household-goods/types/aamAndAamp";

// Define the store state interface
export interface IAamAndAampState {
    // User input fields
    deal: {
        dealNumber: string;
    };

    aamp: {
        wastewaterConsumption: number;
        totalVolumeOfVolleys: number;
        volleyCount: number;
        feederDepth: number;
        disinfection: boolean;
        dehydration: boolean;
        // Computed fields
        volleyDischargePerTime: number;
        timeBetweenVolleys: number;
    };

    // API Results
    aampResults?: {
        bufferCapacity?: IBufferCapacityResponse;
        cleaningStation?: ICleaningStationResponse;
        disinfectionUnit?: IDisinfectionUnitResponse;
    };


    // Actions
    setField: (
        field: keyof IAamAndAampState,
        value: IAamAndAampState[keyof IAamAndAampState],
    ) => void;
    recalculateComputedFields: () => void;
    setAampResults: (results: {
        bufferCapacity?: IBufferCapacityResponse;
        cleaningStation?: ICleaningStationResponse;
        disinfectionUnit?: IDisinfectionUnitResponse;
    }) => void;
    resetForm: () => void;
}

// Create Zustand store
export const useAamAndAampStore = create<IAamAndAampState>(
    (set, get) => ({
        // Initial state
        deal: {
            dealNumber: "",
        },
        aamp: {
            wastewaterConsumption: 500,
            totalVolumeOfVolleys: 1000,
            volleyCount: 3,
            feederDepth: 5000,
            disinfection: false,
            dehydration: false,
            volleyDischargePerTime: 0,
            timeBetweenVolleys: 0,
        },
        aampResults: undefined,

        // Set a top-level field (shallow update)
        setField: (field, value) => {
            set((state) => ({
                ...state,
                [field]: value,
            }));
            // If aamp data is updated, recalculate computed fields
            if (field === "aamp") {
                get().recalculateComputedFields();
            }
        },

        // Recalculate computed fields in aamp
        recalculateComputedFields: () => {
            set((state) => ({
                aamp: {
                    ...state.aamp,
                    volleyDischargePerTime:
                        state.aamp.volleyCount > 0
                            ? state.aamp.totalVolumeOfVolleys / state.aamp.volleyCount
                            : 0,
                    timeBetweenVolleys:
                        state.aamp.volleyCount > 0 ? 24 / state.aamp.volleyCount : 0,
                },
            }));
        },

        // Save API responses into aampResults
        setAampResults: (results) => {
            set(() => ({
                aampResults: results,
            }));
        },

        // Reset form values to initial state
        resetForm: () => {
            set(() => ({
                deal: {dealNumber: ""},
                aamp: {
                    wastewaterConsumption: 500,
                    totalVolumeOfVolleys: 1000,
                    volleyCount: 3,
                    feederDepth: 5000,
                    disinfection: false,
                    dehydration: false,
                    volleyDischargePerTime: 0,
                    timeBetweenVolleys: 0,
                },
                aampResults: undefined,
            }));
        },
    }),
);
