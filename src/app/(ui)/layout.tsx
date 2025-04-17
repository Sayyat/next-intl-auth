import React from "react";
import {SidebarProvider} from "@/shared/components/ui/sidebar";
import {AppSidebar} from "@/core/components/AppSidebar";
import {Header} from "@/core/components/Header";
import {DynamicBreadcrumb} from "@/core/components/DynamicBreadcrumb";

export default async function UILayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="flex flex-col w-full h-full p-8 gap-8 overflow-hidden">
                <Header/>
                <DynamicBreadcrumb/>
                {children}
            </main>
        </SidebarProvider>
    );
}
