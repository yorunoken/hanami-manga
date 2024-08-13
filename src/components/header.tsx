import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-[#1e1e1e] text-white flex items-center justify-between px-6 py-3">
            <Link href="/" className="font-bold text-xl" passHref>
                hanamimanga
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

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
    );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
