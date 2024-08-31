import Footer from "@/components/footer";
import Header from "@/components/header";
import Tags from "@/components/tags";
import { Metadata, ResolvingMetadata } from "next";
import { ChapterListSchema, MangaResponseSchema } from "@/types/schema";
import { BASE_URL } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import ChapterList from "@/components/chapterList";
import LoadingOverlay from "@/components/loadingOverlay";

type Props = {
    params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: manga } = (await fetch(
        `${BASE_URL}api/manga/${params.uuid}`,
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

export default async function MangaPage({ params }: Props) {
    const { data: manga } = (await fetch(
        `${BASE_URL}api/manga/${params.uuid}?includes[]=cover_art`,
        { next: { revalidate: 60 * 60 } },
    ).then((response) => response.json())) as MangaResponseSchema;

    const chaptersPerPage = 12;
    // fetch initial chapters
    const { data: initialChapters } = (await fetch(
        `${BASE_URL}api/chapter?manga=${params.uuid}&order[chapter]=desc&translatedLanguage[]=en&limit=${chaptersPerPage}`,
    ).then((res) => res.json())) as ChapterListSchema;

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
        <section className="w-full bg-[#1a1a1a]">
            <Header />
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 py-12">
                <div className="flex justify-center">
                    <Image
                        src={`/api/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                        alt="Manga Cover"
                        width={400}
                        height={600}
                        className="w-full max-w-[300px] h-fit md:max-w-none rounded-lg shadow-lg"
                        style={{ aspectRatio: "400/600", objectFit: "cover" }}
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <Tags tags={tags} />
                    <p className="text-muted-foreground">{description}</p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="border border-card p-2 rounded-lg bg-muted/2 hover:bg-muted/5 transition-colors"
                        >
                            Read Now
                        </Link>
                        <Link
                            href="#"
                            className="border border-card p-2 rounded-lg bg-muted/2 hover:bg-muted/5 transition-colors"
                        >
                            Add to Favorites
                        </Link>
                    </div>
                    <ChapterList
                        chaptersPerPage={chaptersPerPage}
                        mangaId={params.uuid}
                    />
                </div>
            </div>
            <Footer />
        </section>
    );
}
