import {
    HeartIcon,
    UserRound,
    LogOut,
    Settings,
    Book,
    LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function SignedInProfile({ session }: { session: Session }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={session?.user?.image ?? ""}
                            alt={session?.user?.name ?? "User"}
                        />
                        <AvatarFallback>
                            {session?.user?.name?.[0] ?? "U"}
                        </AvatarFallback>
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
                    <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                        <Book className="mr-2 h-4 w-4" />
                        <span>History</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center">
                        <HeartIcon className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="border-t"
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function SignedOutProfile() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
                            alt="osu!"
                        />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <button
                        className="w-full flex items-center border-b"
                        onClick={() => signIn("discord")}
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login with Discord</span>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                        <Book className="mr-2 h-4 w-4" />
                        <span>History</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center">
                        <HeartIcon className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
