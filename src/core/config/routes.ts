import {Calculator, ChartSpline, SquareUser, ToggleLeft} from "lucide-react";
import React from "react";

export interface AppRoute {
    titleKey: string; // Localization key
    url: string;
    icon?: React.ElementType;
}

export interface AppRoute {
    titleKey: string; // Localization key
    url: string;
    icon?: React.ElementType;
    subRoutes?: AppRoute[]; // ✅ Add optional sub-routes
}

// Common Calculator Pages
export const COMMON_ROUTES: AppRoute[] = [
    {
        titleKey: "householdGoods",
        url: "/calculators/household-goods",
        icon: Calculator,
        subRoutes: [
            {
                titleKey: "aamAndAamp",
                url: "/calculators/household-goods/aam-and-aamp",
                icon: Calculator,
            },
            {
                titleKey: "ab",
                url: "/calculators/household-goods/ab",
                icon: Calculator,
            },
        ],
    },
    {
        titleKey: "kns",
        url: "/calculators/kns",
        icon: Calculator,
    },
    {
        titleKey: "stormDrain",
        url: "/calculators/storm-drain",
        icon: Calculator,
    },
];

// Manager Pages
export const MANAGER_ROUTES: AppRoute[] = [
    {
        titleKey: "displaySettings",
        url: "/manager-instruments/display-settings",
        icon: ToggleLeft,
    },
    {
        titleKey: "userCalculations",
        url: "/manager-instruments/user-calculations",
        icon: SquareUser,
    },
    {
        titleKey: "analytics",
        url: "/manager-instruments/analytics",
        icon: ChartSpline,
    },
];

// Breadcrumb Labels (Override for Special Cases)
export const BREADCRUMB_LABELS: Record<string, string> = {
    "calculators": "calculators",
    "household-goods": "householdGoods",
    "aam-and-aamp": "aamAndAamp",
    "ab": "AB",
    "kns": "KNS",
    "storm-drain": "stormDrain",
    "calculating-details": "calculatingDetails",

    "manager-instruments": "managerInstruments",
    "display-settings": "displaySettings",
    "user-calculations": "userCalculations",
    "analytics": "analytics",
};
