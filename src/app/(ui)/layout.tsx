/*
 * Copyright (c) 2025. Sayat Raykul
 */

import React from "react";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/core/components/AppSidebar";
import { Header } from "@/core/components/Header";
import { DynamicBreadcrumb } from "@/core/components/DynamicBreadcrumb";

export default async function UILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <div className="bg-sidebar relative flex w-full flex-1 flex-col ">
        <Header />
        <DynamicBreadcrumb />
        <SidebarInset className="h-full mb-4 rounded-xl overflow-auto">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
