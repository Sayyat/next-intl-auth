import { create } from "zustand";

export interface KnsState {
    // User input fields
    jobStep: string;
    city: string;
    objectName: string;
    deal: {
        dealNumber: string;
        knsNumber: string;
    };
    initialData: {
        flowRate: number;
        pressure: number;
    };
    inletCollector: {
        diameter: number;
        depth: number;
        quantity: number;
    };
    pressureCollector: {
        height: number;
        diameter: number;
        depth: number;
    };
    pump: {
        height: number;
        diameter: number;
        length: number;
        width: number;
        working: boolean;
        reserve: boolean;
        startsPerHour: number;
        totalStarts: number;
        nominalPower: number;
    };
    dimensionsCalculation: {
        recommendedDiameter: number;
        recommendedHeight: number;
    };
    dimensionsByCustomer: {
        requiredDiameter: number;
        acceptableHeight: number;
    };
    acceptedKnsDimensions: {
        diameter: number;
        height: number;
    };
    additionalEquipments: {
        height: number;
        diameter: number;
    }[];

    // Setter functions
    setJobStep: (jobStep: string) => void;
    setCity: (city: string) => void;
    setObjectName: (objectName: string) => void;
    setDeal: (deal: Partial<KnsState["deal"]>) => void;
    setInitialData: (data: Partial<KnsState["initialData"]>) => void;
    setInletCollector: (data: Partial<KnsState["inletCollector"]>) => void;
    setPressureCollector: (data: Partial<KnsState["pressureCollector"]>) => void;
    setPump: (data: Partial<KnsState["pump"]>) => void;
    setDimensionsCalculation: (data: Partial<KnsState["dimensionsCalculation"]>) => void;
    setDimensionsByCustomer: (data: Partial<KnsState["dimensionsByCustomer"]>) => void;
    setAcceptedKnsDimensions: (data: Partial<KnsState["acceptedKnsDimensions"]>) => void;
    setAdditionalEquipments: (data: KnsState["additionalEquipments"]) => void;
}

export const useKnsStore = create<KnsState>((set) => ({
    // Initial values
    jobStep: "",
    city: "",
    objectName: "",
    deal: {
        dealNumber: "",
        knsNumber: "",
    },
    initialData: {
        flowRate: 0,
        pressure: 0,
    },
    inletCollector: {
        diameter: 0,
        depth: 0,
        quantity: 0,
    },
    pressureCollector: {
        height: 0,
        diameter: 0,
        depth: 0,
    },
    pump: {
        height: 0,
        diameter: 0,
        length: 0,
        width: 0,
        working: false,
        reserve: false,
        startsPerHour: 0,
        totalStarts: 0,
        nominalPower: 0,
    },
    dimensionsCalculation: {
        recommendedDiameter: 0,
        recommendedHeight: 0,
    },
    dimensionsByCustomer: {
        requiredDiameter: 0,
        acceptableHeight: 0,
    },
    acceptedKnsDimensions: {
        diameter: 0,
        height: 0,
    },
    additionalEquipments: [],

    // Setter implementations
    setJobStep: (jobStep) => set({ jobStep }),
    setCity: (city) => set({ city }),
    setObjectName: (objectName) => set({ objectName }),
    setDeal: (deal) =>
        set((state) => ({
            deal: { ...state.deal, ...deal },
        })),
    setInitialData: (data) =>
        set((state) => ({
            initialData: { ...state.initialData, ...data },
        })),
    setInletCollector: (data) =>
        set((state) => ({
            inletCollector: { ...state.inletCollector, ...data },
        })),
    setPressureCollector: (data) =>
        set((state) => ({
            pressureCollector: { ...state.pressureCollector, ...data },
        })),
    setPump: (data) =>
        set((state) => ({
            pump: { ...state.pump, ...data },
        })),
    setDimensionsCalculation: (data) =>
        set((state) => ({
            dimensionsCalculation: { ...state.dimensionsCalculation, ...data },
        })),
    setDimensionsByCustomer: (data) =>
        set((state) => ({
            dimensionsByCustomer: { ...state.dimensionsByCustomer, ...data },
        })),
    setAcceptedKnsDimensions: (data) =>
        set((state) => ({
            acceptedKnsDimensions: { ...state.acceptedKnsDimensions, ...data },
        })),
    setAdditionalEquipments: (data) => set({ additionalEquipments: data }),
}));
