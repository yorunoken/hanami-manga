import { MangaListSchema } from "@/types/schema";
import { MangaCard } from "./mangaCard";
import Link from "next/link";
import { BASE_URL } from "@/lib";

export enum MANGAS {
    RECENT,
    TOPRATED,
    TOPFOLLOWED,
}

async function fetchMangas(type: MANGAS) {
    const limit = 5;

    let data: MangaListSchema;

    switch (type) {
        case MANGAS.RECENT:
            data = await fetch(
                `${BASE_URL}api/proxy/manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${limit}`,
            ).then((response) => response.json());
            break;
        case MANGAS.TOPRATED:
            data = await fetch(
                `${BASE_URL}api/proxy/manga?includes[]=cover_art&order[rating]=desc&limit=${limit}`,
            ).then((response) => response.json());
            break;
        case MANGAS.TOPFOLLOWED:
            data = await fetch(
                `${BASE_URL}api/proxy/manga?includes[]=cover_art&order[followedCount]=desc&limit=${limit}`,
            ).then((response) => response.json());
            break;
    }

    return data;
}

export async function MangaCarousel({ mangaType }: { mangaType: MANGAS }) {
    const mangas = await fetchMangas(mangaType);

    if (!mangas.data) {
        console.log(mangas);
        console.log(mangaType);
    }

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
