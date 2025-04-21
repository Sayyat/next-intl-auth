/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  BREADCRUMB_LABELS,
  COMMON_ROUTES,
  flattenRoutes,
  MANAGER_ROUTES,
} from "@/core/config/routes";
import type { LucideIcon } from "lucide-react";

type BreadcrumbItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

export const useDynamicBreadcrumb = () => {
  const pathname = usePathname();
  const t = useTranslations("core.config.routes");

  // Flatten all routes including subRoutes
  const ROUTE_MAP = flattenRoutes([...COMMON_ROUTES, ...MANAGER_ROUTES]);

  // Split pathname into segments
  const segments = pathname.split("/").filter(Boolean);
  // console.log({ segments });
  if (segments.length === 0) {
    return [
      {
        name: t(BREADCRUMB_LABELS["home"]),
        href: "/",
        icon: ROUTE_MAP["/"]?.icon,
      },
    ];
  }
  const breadcrumbItems: BreadcrumbItem[] = [];

  // Iterate through path segments and find the corresponding title & icon
  let pathSoFar = "";
  for (const segment of segments) {
    pathSoFar = pathSoFar ? `${pathSoFar}/${segment}` : `/${segment}`; // Build correct paths
    const route = ROUTE_MAP[pathSoFar]; // Find route object

    if (route) {
      breadcrumbItems.push({
        name: t(route.titleKey),
        href: pathSoFar,
        icon: route.icon,
      });
    } else {
      breadcrumbItems.push({
        name: t(BREADCRUMB_LABELS[segment]),
        href: pathSoFar,
      });
    }
  }

  return breadcrumbItems;
};
