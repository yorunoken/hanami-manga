import Tags from "@/components/tags";
import { Metadata } from "next";
import { CoverAttributesSchema, Manga } from "@/types/schema";
import { BACKEND_URL } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import ChapterList from "@/components/chapterList";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Book } from "lucide-react";
import { cookies } from "next/headers";

import MangaPageSkeleton from "@/components/manga/skeleton";

type Props = {
    params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: manga }: Manga.GetMangaId.ResponseBody = await fetch(
        `${BACKEND_URL}/api/manga/${params.uuid}`,
        { next: { revalidate: 60 * 60 } },
    ).then((response) => response.json());

    const title =
        manga.attributes.title.en ??
        manga.attributes.altTitles?.filter((altTitle) => altTitle.en)[0]?.en ??
        manga.attributes.title["ja-ro"] ??
        manga.attributes.title["ja"] ??
        "Unknown Title";

    return {
        title: `${title} | Hanami Manga`,
    };
}

export default function MangaPage({ params }: Props) {
    const cookieStore = cookies();
    const lastReadChapterCookie = cookieStore.get(
        `lastReadChapterManga_${params.uuid}`,
    );
    const lastReadChapter = lastReadChapterCookie?.value;

    return (
        <div className="my-4 sm:my-8 px-4 max-w-5xl mx-auto">
            <Suspense fallback={<MangaPageSkeleton />}>
                <MangaContent
                    params={params}
                    lastReadChapter={lastReadChapter}
                />
            </Suspense>
        </div>
    );
}

async function MangaContent({
    params,
    lastReadChapter,
}: Props & { lastReadChapter: string | undefined }) {
    const chaptersPerPage = 12;

    const { data: manga }: Manga.GetMangaId.ResponseBody = await fetch(
        `${BACKEND_URL}/api/manga/${params.uuid}?includes[]=cover_art`,
        { next: { revalidate: 60 * 60 } },
    ).then((response) => response.json());

    const relationshipAttributes = manga.relationships.find(
        (relationship) => relationship.type === "cover_art",
    )?.attributes as CoverAttributesSchema | undefined;

    const title =
        manga.attributes.title.en ??
        manga.attributes.altTitles?.filter((altTitle) => altTitle.en)[0]?.en ??
        manga.attributes.title["ja-ro"] ??
        manga.attributes.title["ja"] ??
        "Unknown Title";

    const description =
        manga.attributes.description.en ?? "No description available.";

    const tags = manga.attributes.tags;

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/3">
                <Image
                    src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                    alt="Manga Cover"
                    width={900}
                    height={900}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    className="w-full h-auto object-cover aspect-[5/8] rounded"
                />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {title}
                </h1>
                <Tags tags={tags} />
                <p className="text-sm sm:text-base text-muted-foreground">
                    {description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                        href={`/manga/${manga.id}/read`}
                        className="flex flex-row items-center "
                    >
                        <Button className="w-full sm:w-auto">
                            <Book className="h-5 w-5 mr-1" />
                            <span className="font-semibold">
                                {lastReadChapter
                                    ? `Continue Reading`
                                    : "Read Now"}
                            </span>
                        </Button>
                    </Link>
                </div>
                <ChapterList
                    chaptersPerPage={chaptersPerPage}
                    mangaId={params.uuid}
                />
            </div>
        </div>
    );
}
