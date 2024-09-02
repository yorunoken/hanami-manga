import { MangaListSchema } from "@/types/schema";
import { MangaCard } from "./mangaCard";
import Link from "next/link";
import { BASE_URL } from "@/lib";
import { TitleType } from "@/types";
import { fetchSearchMangas } from "@/lib/request";

export async function MangaCarousel({ mangaType }: { mangaType: TitleType }) {
    const mangas = await fetchSearchMangas(mangaType, 5);

    return (
        <div className="my-4 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {mangas.data.map((manga) => (
                    <MangaCard key={manga.id} manga={manga} />
                ))}
            </div>
        </div>
    );
}

export async function Titles({
    title,
    redirect,
}: {
    title: string;
    redirect: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Link
                href={redirect}
                className="font-bold hover:underline"
                prefetch={false}
            >
                View All
            </Link>
        </div>
    );
}
