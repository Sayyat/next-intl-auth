import {create} from "zustand";
import {ICalculationRowData, IItemsPerPage} from "@/features/user-calculations/types/api";
import {IPaginatedResponse} from "@/shared";

// Define the store state interface
export interface IUserCalculationsState {
    // pagination
    itemsPerPage?: IItemsPerPage;
    itemsPerPageOptions: IItemsPerPage[];
    currentPage: number;
    pagesCount: number;

    selectedRow?: ICalculationRowData | null;
    rows?: IPaginatedResponse<ICalculationRowData> | null;

    // helpers start
    setField: (
        field: keyof IUserCalculationsState,
        value: IUserCalculationsState[keyof IUserCalculationsState],
    ) => void;

    nextPage: () => void;
    previousPage: () => void;
}

// Create Zustand store
export const useUserCalculationsStore = create<IUserCalculationsState>(
    (set, get) => ({
        // Initial state
        itemsPerPage: undefined,
        itemsPerPageOptions: [],
        currentPage: 0,
        pagesCount: 0,

        selectedRow: undefined,
        rows: undefined,

        setField: (field, value) => {
            set((state) => ({
                ...state,
                [field]: value,
            }));
        },

        nextPage: () => {
            set((state) => ({
                ...state,
                currentPage: state.currentPage + 1,
            }))
        },

        previousPage: () => {
            set((state) => ({
                ...state,
                currentPage: state.currentPage - 1,
            }))
        }
    }),
);
