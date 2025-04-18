/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { COMMON_ROUTES, MANAGER_ROUTES } from "@/core/config/routes";
import clsx from "clsx";
import { useProfile } from "@/features/authentication";
import { Fragment } from "react"; // ✅ Import clsx for conditional styling

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("core.components.AppSidebar");
  const { data: session } = useSession(); // Get user session
  const { data: profile } = useProfile(); // Get user session
  const pathname = usePathname(); // ✅ Get current route

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="h-12">
        <Image src="/next.svg" alt="logo" width={236} height={48} />
      </SidebarHeader>

      <SidebarContent className="gap-8 mt-5">
        {/* Common Menu Items (Calculators) */}
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel>{t("calculators")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-8">
              {COMMON_ROUTES.map((item) => {
                return item.subRoutes ? (
                  <Fragment key={item.url}>
                    {/* Parent menu item */}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={clsx(
                            "flex items-center rounded-lg transition-all",
                            pathname === item.url
                              ? "text-sidebar-accent-foreground font-semibold"
                              : "text-sidebar-foreground",
                          )}
                        >
                          {item.icon && (
                            <item.icon style={{ width: 32, height: 32 }} />
                          )}
                          <span className="text-lg">{t(item.titleKey)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Submenu items (placed separately, not inside SidebarMenuItem) */}
                    <SidebarGroupContent className="pl-6 flex flex-col gap-8">
                      {item.subRoutes.map((subItem) => (
                        <SidebarMenuItem key={subItem.url}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={subItem.url}
                              className={clsx(
                                "flex items-center rounded-lg transition-all",
                                pathname === subItem.url
                                  ? "text-sidebar-accent-foreground font-semibold"
                                  : "text-sidebar-foreground",
                              )}
                            >
                              {subItem.icon && (
                                <subItem.icon
                                  style={{ width: 32, height: 32 }}
                                />
                              )}
                              <span className="text-lg">
                                {t(subItem.titleKey)}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarGroupContent>
                  </Fragment>
                ) : (
                  // If no subroutes, render as usual
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center rounded-lg transition-all",
                          pathname === item.url
                            ? "text-sidebar-accent-foreground font-semibold"
                            : "text-sidebar-foreground",
                        )}
                      >
                        {item.icon && (
                          <item.icon style={{ width: 32, height: 32 }} />
                        )}
                        <span className="text-lg">{t(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Manager Menu Items (Only show if user is a manager) */}
        {session && profile?.is_superuser && (
          <SidebarGroup className="gap-4">
            <SidebarGroupLabel>{t("managerInstruments")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-8">
                {MANAGER_ROUTES.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center rounded-lg transition-all",
                          pathname === item.url
                            ? "text-sidebar-accent-foreground font-semibold"
                            : "text-sidebar-foreground",
                        )}
                      >
                        {item.icon && (
                          <item.icon style={{ width: 32, height: 32 }} />
                        )}
                        <span className="text-lg">{t(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
