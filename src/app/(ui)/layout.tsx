/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

import React from "react";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/core/components/AppSidebar";
import { Header } from "@/core/components/Header";
import { DynamicBreadcrumb } from "@/core/components/DynamicBreadcrumb";

export default async function UILayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main className="flex flex-col w-full h-full p-8 gap-8 overflow-hidden">
        <DynamicBreadcrumb />
        {children}
      </main>
    </SidebarProvider>
  );
}
