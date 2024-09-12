"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import ModeToggle from "./modeToggle";
import SessionButton from "./session";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">
                                Hanami Manga
                            </span>
                        </Link>
                    </div>

                    <div className="hidden flex-1 items-center justify-center px-4 md:flex">
                        <div className="relative w-full max-w-xl">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search manga..."
                                className="w-full pl-10 pr-4"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <ModeToggle />
                        <SessionButton />
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="px-4 py-2 border-b md:hidden">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full mb-2"
                        />
                    </div>
                )}
            </div>
        </header>
    );
}
