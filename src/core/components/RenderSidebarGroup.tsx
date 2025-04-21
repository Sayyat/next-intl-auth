/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { Fragment, memo } from "react";
import { useTranslations } from "next-intl";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IAppRoute, TRouteKey } from "@/core/types/routes";

// Компонент для одного пункта меню
const RenderMenuItem = memo(function RenderMenuItem({
  route,
}: {
  route: IAppRoute;
}) {
  const pathname = usePathname();
  const t = useTranslations("core.config.routes");

  return (
    <SidebarMenuItem key={route.url}>
      <SidebarMenuButton asChild>
        <Link
          href={route.url}
          className={clsx(
            "flex items-center rounded-lg transition-all",
            pathname === route.url
              ? "text-sidebar-accent-foreground font-semibold bg-sidebar-accent"
              : "text-sidebar-foreground",
          )}
        >
          {route.icon && <route.icon style={{ width: 24, height: 24 }} />}
          <span className="text-sm">{t(route.titleKey)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
RenderMenuItem.displayName = "RenderMenuItem";

// Компонент для группы маршрутов
const RenderRouteGroup = memo(function RenderRouteGroup({
  label,
  routes,
}: {
  label: TRouteKey;
  routes: IAppRoute[];
}) {
  const t = useTranslations("core.config.routes");

  return (
    <SidebarGroup className="gap-1 px-0 py-1">
      {/*<SidebarGroupLabel>{t(label)}</SidebarGroupLabel>*/}
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {routes.map((route) =>
            route.subRoutes ? (
              <Fragment key={route.url}>
                <RenderMenuItem route={route} />
                <SidebarGroupContent className="pl-4 flex flex-col gap-1">
                  {route.subRoutes.map((subRoute) => (
                    <RenderMenuItem key={subRoute.url} route={subRoute} />
                  ))}
                </SidebarGroupContent>
              </Fragment>
            ) : (
              <RenderMenuItem key={route.url} route={route} />
            ),
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});
RenderRouteGroup.displayName = "RenderRouteGroup";

export { RenderMenuItem, RenderRouteGroup };
