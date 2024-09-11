"use client";

import {
    Search,
    Moon,
    Sun,
    HeartIcon,
    Settings,
    UserRound,
    LogIn,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleDiscordLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    function handleDiscordLogout() {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="md:text-xl font-bold">
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
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                        >
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button variant="outline" className="p-3">
                            <Link
                                href="/settings"
                                className="flex items-center"
                            >
                                <Settings className="h-4 w-4" />
                            </Link>
                        </Button>
                        <ModeToggle />
                        {isLoggedIn ? (
                            <ProfileButton handleLogOut={handleDiscordLogout} />
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDiscordLogin}
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

function ProfileButton({ handleLogOut }: { handleLogOut: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@username" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                        <UserRound className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center">
                        <HeartIcon className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <button
                        onClick={handleLogOut}
                        className="flex w-full items-center px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ModeToggle() {
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
