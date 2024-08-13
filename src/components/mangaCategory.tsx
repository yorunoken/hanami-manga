import { MangaListSchema } from "@/types/schema";
import { MangaCard } from "./mangaCard";
import Link from "next/link";

export function MangaCategory({
    redirect,
    title,
    mangas,
}: {
    redirect: string;
    title: string;
    mangas: MangaListSchema;
}) {
    return (
        <div className="my-4 container mx-auto flex flex-col gap-8 px-4 md:px-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <Link
                    href={redirect}
                    className="text-blue-500 hover:underline"
                    prefetch={false}
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {mangas.data.map((manga) => (
                    <MangaCard key={manga.id} data={manga} />
                ))}
            </div>
        </div>
    );
}
