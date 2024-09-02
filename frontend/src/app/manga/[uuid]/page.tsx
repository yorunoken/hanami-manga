import Tags from "@/components/tags";
import { Metadata } from "next";
import { MangaResponseSchema } from "@/types/schema";
import { BASE_URL } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import ChapterList from "@/components/chapterList";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { MangaPageSkeleton } from "@/components/mangaPageSkeleton";

type Props = {
    params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: manga } = (await fetch(
        `${BASE_URL}api/proxy/manga/${params.uuid}`,
        { next: { revalidate: 60 * 60 } },
    ).then((response) => response.json())) as MangaResponseSchema;

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
    return (
        <Suspense fallback={<MangaPageSkeleton />}>
            <MangaContent params={params} />
        </Suspense>
    );
}

export async function MangaContent({ params }: Props) {
    const chaptersPerPage = 12;

    const { data: manga } = (await fetch(
        `${BASE_URL}api/proxy/manga/${params.uuid}?includes[]=cover_art`,
        { next: { revalidate: 60 * 60 } },
    ).then((response) => response.json())) as MangaResponseSchema;

    const relationshipAttributes = manga.relationships.find(
        (relationship) => relationship.type === "cover_art",
    )?.attributes as { fileName?: string } | null;

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
        <div className="my-8 px-4 lg:container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Image
                    src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                    alt="Manga Cover"
                    width={400}
                    height={600}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    className="w-full max-w-[300px] h-auto md:max-w-none rounded-lg shadow-lg object-cover"
                />
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <Tags tags={tags} />
                    <p className="text-muted-foreground">{description}</p>
                    <div className="flex items-center gap-4">
                        <Button>
                            <Link href="#">Read Now</Link>
                        </Button>
                        <Button>
                            <Link href="#">Add to Favorites</Link>
                        </Button>
                    </div>
                    <ChapterList
                        chaptersPerPage={chaptersPerPage}
                        mangaId={params.uuid}
                    />
                </div>
            </div>
        </div>
    );
}
