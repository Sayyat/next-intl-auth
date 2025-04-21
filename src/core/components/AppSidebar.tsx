/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/components/ui/sidebar";
import Image from "next/image";
import { COMMON_ROUTES, MANAGER_ROUTES } from "@/core/config/routes";
import { useSession } from "next-auth/react";
import { useProfile } from "@/features/authentication";
import { RenderRouteGroup } from "./RenderSidebarGroup"; // Импортируем отдельные функции

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { data: profile } = useProfile();

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header с логотипом */}
      <SidebarHeader className="h-18 flex-row p-0 items-center">
        <Image
          src="/assets/logo-transparent.png"
          alt="logo"
          width={64}
          height={64}
        />
        <span className="text-xl font-bold">Next Intl Auth</span>
      </SidebarHeader>

      <SidebarContent className="gap-2">
        {/* Группа калькуляторов */}
        <RenderRouteGroup label="group_1" routes={COMMON_ROUTES} />

        {/* Группа менеджера */}
        {session && profile?.is_superuser && (
          <RenderRouteGroup label="group_2" routes={MANAGER_ROUTES} />
        )}
      </SidebarContent>
    </Sidebar>
  );
}
