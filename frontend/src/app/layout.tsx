"use client";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import Header from "@/components/header/header";
import Footer from "@/components/footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <html lang="en">
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                {children}
                                <Toaster />
                            </main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
