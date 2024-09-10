"use client";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, HeartIcon, Settings, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-background">
            <div className="px-4 border-b lg:container mx-auto">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        <Link href="/" className="font-bold text-xl" passHref>
                            Hanami Manga
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <div className="relative hidden md:block">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-[200px] lg:w-[300px]"
                            />
                        </div>
                        <DesktopMenu className="md:flex hidden" />
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && <MobileMenu />}
        </header>
    );
}

function DesktopMenu({ className = "" }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={className}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex items-center cursor-pointer"
                    >
                        <UserRound className="h-4 w-4 mr-2" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href="/favorites"
                        className="flex items-center cursor-pointer"
                    >
                        <HeartIcon className="h-4 w-4 mr-2" />
                        Favorites
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className="flex items-center cursor-pointer"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function MobileMenu() {
    return (
        <div className="px-4 py-2 border-b md:hidden">
            <Input
                type="search"
                placeholder="Search..."
                className="w-full mb-2"
            />
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/settings"
                            className="flex flex-row items-center py-2 hover:text-primary"
                        >
                            <UserRound className="h-4 w-4 mr-1" />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/favorites"
                            className="flex flex-row items-center py-2 hover:text-primary"
                        >
                            <HeartIcon className="h-4 w-4 mr-1" />
                            Favorites
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/settings"
                            className="flex flex-row items-center py-2 hover:text-primary"
                        >
                            <Settings className="h-4 w-4 mr-1" />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
