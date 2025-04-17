"use client";

import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import React from "react";
import {
    AppRoute,
    BREADCRUMB_LABELS,
    COMMON_ROUTES,
    MANAGER_ROUTES,
} from "@/core/config/routes";
import {ChevronRight} from "lucide-react";

export function DynamicBreadcrumb() {
    const pathname = usePathname();
    const t = useTranslations("core.components.DynamicBreadcrumb");
    const flattenRoutes = (routes: AppRoute[]): Record<string, AppRoute> => {
        const map: Record<string, AppRoute> = {};

        const addRoute = (route: AppRoute) => {
            map[route.url] = route; // ✅ Store route using its absolute URL

            if (route.subRoutes) {
                route.subRoutes.forEach(addRoute); // ✅ Directly add subRoutes without modifying their paths
            }
        };

        routes.forEach(addRoute);
        return map;
    };

    // Flatten all routes including subRoutes
    const ROUTE_MAP = flattenRoutes([...COMMON_ROUTES, ...MANAGER_ROUTES]);
    // console.log({ ROUTE_MAP });
    // Combine all routes into a single lookup object
    // const ROUTE_MAP = [...COMMON_ROUTES, ...MANAGER_ROUTES].reduce(
    //     (acc, route) => ({...acc, [route.url]: route}),
    //     {} as Record<string, { titleKey: string; url: string; icon?: React.ElementType }>
    // );

    // Split pathname into segments
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [];

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

    // console.log({ breadcrumbItems });
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="flex items-center gap-2">
                                {item.icon && <item.icon className="w-4 h-4"/>}
                                {item.name}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && (
                            <BreadcrumbSeparator className="flex items-end justify-center h-full">
                                <div className="flex items-end justify-center h-full">
                                    <ChevronRight className="w-4 h-4"/>
                                </div>
                            </BreadcrumbSeparator>
                        )}

                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
