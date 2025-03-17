import React from "react";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center w-full h-dvh bg-primary-foreground overflow-y-hidden">
            <div className="relative bg-secondary w-full max-w-lg h-full">
                {children}
            </div>
        </div>
    );
}
