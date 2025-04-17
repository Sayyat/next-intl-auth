import {ICity} from "@/features/common/types/city";
import {create} from "zustand";
import {IActivityOption} from "@/features/common/types/api";
import {TCommonErrorsMap} from "@/features/common/lib/zod";

// Define the store state interface
export interface ICommonState {
    // User input fields start
    jobStep?: IActivityOption | null;
    city?: ICity | null;
    objectName?: string | null;
    // User input fields end

    // options for selects start
    jobStepOptions: IActivityOption[]; // will be set to jobStep via Select
    cityOptions: ICity[]; // will be set to city via Select
    // options for selects end

    // helpers start
    errors: TCommonErrorsMap;
    setErrors: (errors: TCommonErrorsMap) => void;
    clearErrors: () => void;
    setField: (
        field: keyof ICommonState,
        value: ICommonState[keyof ICommonState],
    ) => void;
    resetForm: () => void;
    // helpers end
}

// Create Zustand store
export const useCommonStore = create<ICommonState>(
    (set, get) => ({
        // Initial state
        jobStep: undefined,
        city: undefined,
        objectName: undefined,
        jobStepOptions: [],
        cityOptions: [],

        errors: {},
        setErrors: (errors) => set(() => ({errors})),
        clearErrors: () => set(() => ({errors: {}})),
        setField: (field, value) => {
            set((state) => ({
                ...state,
                [field]: value,
            }));
        },
        resetForm: () => {
            set(() => ({
                jobStep: undefined,
                city: undefined,
                objectName: undefined,
            }));
        },
    }),
);
