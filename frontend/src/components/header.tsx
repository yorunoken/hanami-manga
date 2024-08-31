import { ClipboardIcon } from "@/icons/clipboard";
import { ClockIcon } from "@/icons/clock";
import { HeartIcon } from "@/icons/heart";
import { SearchIcon } from "@/icons/search";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-[#1e1e1e] text-white flex items-center justify-between px-6 py-3">
            <Link href="/" className="font-bold text-xl" passHref>
                Hanami Manga
            </Link>
            <div className="flex items-center gap-4">
                <Link href="https://www.example.com" passHref>
                    <Button className="text-white">
                        <ClipboardIcon className="w-5 h-5" />
                        <span className="sr-only">Go to Example</span>
                    </Button>
                </Link>

                <Link href="https://www.example.com" passHref>
                    <Button variant="ghost" size="icon" className="text-white">
                        <ClockIcon className="w-5 h-5" />
                        <span className="sr-only">History</span>
                    </Button>
                </Link>

                <Link href="https://www.example.com" passHref>
                    <Button variant="ghost" size="icon" className="text-white">
                        <HeartIcon className="w-5 h-5" />
                        <span className="sr-only">Favorites</span>
                    </Button>
                </Link>

                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="bg-[#2a2a2a] rounded-md pl-8 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                </div>
            </div>
        </header>
    );
}
