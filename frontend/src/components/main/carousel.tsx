import { Card } from "@/components/main/card";
import Link from "next/link";
import { TitleType } from "@/types";
import { fetchSearchMangas } from "@/lib/request";

export async function Carousel({ mangaType }: { mangaType: TitleType }) {
    const mangas = await fetchSearchMangas(mangaType, 5);

    console.log(mangas);

    return (
        <div className="my-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {mangas.data.map((manga) => (
                    <Card key={manga.id} manga={manga} />
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
        <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
            <Link
                href={redirect}
                className="text-sm sm:text-base font-bold hover:underline"
                prefetch={false}
            >
                View All
            </Link>
        </div>
    );
}
