import {IAltoBioCleanSelectItem, IAltoBioCleanSubmitResult,} from "@/features/household-goods/types/ab";
import {create} from "zustand";

// Define the store state interface
export interface IAbState {
    // User input fields
    deal: {
        dealNumber: string;
    };
    ab: {
        wastewaterConsumption: number;
        volley: number;
        supplyDepth: number;
    };
    altoBioCleanItems: IAltoBioCleanSelectItem[];
    selectedAltoBioCleanItem?: IAltoBioCleanSelectItem | null;
    altoBioCleanSubmitResult?: IAltoBioCleanSubmitResult;


    // Actions
    setField: (
        field: keyof IAbState,
        value: IAbState[keyof IAbState],
    ) => void;

    setAltoBioCleanItems: (items: IAltoBioCleanSelectItem[]) => void;
    setSelectedAltoBioCleanItem: (item?: IAltoBioCleanSelectItem) => void;
    setAltoBioCleanSubmitResult: (result?: IAltoBioCleanSubmitResult) => void;
    resetForm: () => void;
}

// Create Zustand store
export const useAbStore = create<IAbState>(
    (set, get) => ({
        // Initial state
        deal: {
            dealNumber: "",
        },
        ab: {
            wastewaterConsumption: 0,
            volley: 0,
            supplyDepth: 0,
        },
        altoBioCleanItems: [],
        selectedAltoBioCleanItem: undefined,
        altoBioCleanSubmitResult: undefined,

        // Set a top-level field (shallow update)
        setField: (field, value) => {
            set((state) => ({
                ...state,
                [field]: value,
            }));
        },


        // Set Alto BioClean items array
        setAltoBioCleanItems: (items) => set({altoBioCleanItems: items}),
        // Set selected Alto BioClean item
        setSelectedAltoBioCleanItem: (item) =>
            set({selectedAltoBioCleanItem: item}),
        // Set Alto BioClean submit result
        setAltoBioCleanSubmitResult: (result) =>
            set({altoBioCleanSubmitResult: result}),

        // Reset form values to initial state
        resetForm: () => {
            set(() => ({
                deal: {dealNumber: ""},
                ab: {wastewaterConsumption: 0, volley: 0, supplyDepth: 0},
                altoBioCleanItems: [],
                selectedAltoBioCleanItem: undefined,
                altoBioCleanSubmitResult: undefined,
            }));
        },
    }),
);
