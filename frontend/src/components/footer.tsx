import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="border-t lg:container mx-auto">
                <div className="px-4 flex justify-between h-16 items-center">
                    <span className="font-bold text-sm">
                        © 2024 Hanami Manga. All rights reserved.
                    </span>
                    <Link
                        href="https://anime.lapaii.dev"
                        target="_blank"
                        className="text-sm font-medium hover:underline"
                        prefetch={false}
                    >
                        Check out mikanime, the anime version of this website!
                    </Link>
                    <div className="flex items-center gap-4 text-sm">
                        <Link
                            href="/about"
                            className="hover:underline"
                            prefetch={false}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                        <Link
                            href="https://github.com/yorunoken/hanami-manga"
                            target="_blank"
                            className="hover:underline"
                            prefetch={false}
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
