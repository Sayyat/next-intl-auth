/*
 * Copyright (c) 2025. Sayat Raykul
 */

import {
  Calculator,
  ChartSpline,
  Home,
  SquareUser,
  ToggleLeft,
  Group,
  Info,
  Settings,
  Sheet,
  PieChart,
} from "lucide-react";
import { IAppRoute, TRouteKey } from "@/core/types/routes";

// Common Calculator Pages
export const COMMON_ROUTES: IAppRoute[] = [
  {
    titleKey: "home",
    url: "/",
    icon: Home,
  },
  {
    titleKey: "group_1",
    url: "/group-1",
    icon: Group,
    subRoutes: [
      {
        titleKey: "about",
        url: "/group-1/about",
        icon: Info,
      },
      {
        titleKey: "profile",
        url: "/group-1/profile",
        icon: SquareUser,
      },
    ],
  },
  {
    titleKey: "settings",
    url: "/settings",
    icon: Settings,
  },
];

// Manager Pages
export const MANAGER_ROUTES: IAppRoute[] = [
  {
    titleKey: "group_2",
    url: "/group-2",
    icon: Group,
    subRoutes: [
      {
        titleKey: "dashboard",
        url: "/group-2/dashboard",
        icon: Sheet,
      },
      {
        titleKey: "analytics",
        url: "/group-2/analytics",
        icon: PieChart,
      },
    ],
  },
];

// Breadcrumb Labels (Override for Special Cases)
export const BREADCRUMB_LABELS: Record<string, TRouteKey> = {
  home: "home",
  "group-1": "group_1",
  "group-2": "group_2",
  about: "about",
  profile: "profile",
  settings: "settings",
  dashboard: "dashboard",
  analytics: "analytics",
};

export function flattenRoutes(routes: IAppRoute[]): Record<string, IAppRoute> {
  const map: Record<string, IAppRoute> = {};

  const addRoute = (route: IAppRoute) => {
    map[route.url] = route;
    if (route.subRoutes) {
      route.subRoutes.forEach(addRoute);
    }
  };

  routes.forEach(addRoute);
  return map;
}
