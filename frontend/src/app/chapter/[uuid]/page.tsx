import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from "lucide-react";
import { BACKEND_URL } from "@/lib";
import { AtHome, Manga, Chapter } from "@/types/schema";
import Link from "next/link";
import { Suspense } from "react";
import ChapterPageSkeleton from "@/components/chapterPageSkeleton";

async function getData(uuid: string) {
    const chapterData: Chapter.GetChapterId.ResponseBody = await await fetch(
        `${BACKEND_URL}/api/chapter/${uuid}?includes[]=manga&includes[]=author&includes[]=artist`,
    ).then((res) => res.json());

    const mangaData: Manga.GetMangaId.ResponseBody = await fetch(
        `${BACKEND_URL}/api/manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}?includes[]=cover_art&includes[]=author&includes[]=artist`,
    ).then((res) => res.json());

    const totalChaptersData: Manga.GetMangaAggregate.ResponseBody = await fetch(
        `${BACKEND_URL}/api/manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}/aggregate?translatedLanguage[]=en`,
    ).then((res) => res.json());

    const chapterImagesData: AtHome.GetAtHomeServerChapterId.ResponseBody =
        await fetch(`${BACKEND_URL}/api/homeserver/${uuid}`).then((res) =>
            res.json(),
        );

    return {
        chapter: chapterData,
        manga: mangaData,
        chapters: totalChaptersData,
        pageImages: chapterImagesData,
    };
}

type Props = {
    params: {
        uuid: string;
    };
};

export default function ChapterPage({ params }: Props) {
    return (
        <Suspense fallback={<ChapterPageSkeleton />}>
            <ChapterPageContent params={params} />
        </Suspense>
    );
}

async function ChapterPageContent({ params }: Props) {
    const { uuid } = params;
    const { pageImages, manga, chapter, chapters } = await getData(uuid);

    const currentChapterNumber = parseFloat(
        chapter.data.attributes.chapter || "0",
    );

    const sortedChapters = Object.entries(chapters.volumes ?? {})
        .flatMap(([_, volume]) => Object.entries(volume.chapters ?? {}))
        .sort(([a], [b]) => parseFloat(a) - parseFloat(b));

    const firstChapter = sortedChapters[0]?.[1];
    const lastChapter = sortedChapters[sortedChapters.length - 1]?.[1];

    const currentChapterIndex = sortedChapters.findIndex(
        ([num]) => parseFloat(num) === currentChapterNumber,
    );

    const previousChapter =
        currentChapterIndex > 0
            ? sortedChapters[currentChapterIndex - 1]?.[1]
            : null;

    const nextChapter =
        currentChapterIndex < sortedChapters.length - 1 &&
        currentChapterIndex !== -1
            ? sortedChapters[currentChapterIndex + 1]?.[1]
            : null;

    const isLastChapter = currentChapterIndex === sortedChapters.length - 1;

    const title =
        manga.data.attributes.title.en ??
        manga.data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0]
            ?.en ??
        manga.data.attributes.title["ja-ro"] ??
        manga.data.attributes.title["ja"] ??
        "Unknown Title";

    return (
        <div className="flex flex-col items-center">
            <div className="mt-4 flex flex-col items-center relative w-full">
                <Link
                    href={`/manga/${manga.data.id}`}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2"
                >
                    <Button variant="secondary">
                        <ChevronLeftIcon className="w-8 h-8" />
                    </Button>
                </Link>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        {title}: Chapter {chapter.data.attributes.chapter}
                    </h1>
                    <span className="text-muted-foreground">
                        {chapter.data.attributes.title}
                    </span>
                </div>
            </div>
            <div className="max-w-3xl mx-auto py-4 space-y-3">
                {pageImages.chapter?.data?.map((imageData, index) => (
                    <div className="relative w-full" key={index}>
                        <ChapterImage
                            imageData={imageData}
                            baseUrl={pageImages.baseUrl ?? ""}
                            hash={pageImages.chapter?.hash ?? ""}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full flex mb-4">
                <Link href={`/chapter/${firstChapter?.id}`} className="flex">
                    <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-r-none border-r">
                        <ChevronsLeftIcon className="mx-auto" />
                    </Button>
                </Link>

                {previousChapter && (
                    <Link
                        href={`/chapter/${previousChapter.id}`}
                        className="flex-1"
                    >
                        <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-none border-r">
                            <ChevronLeftIcon className="mx-auto" />
                        </Button>
                    </Link>
                )}

                {!isLastChapter && nextChapter && (
                    <Link
                        href={`/chapter/${nextChapter.id}`}
                        className="flex-1"
                    >
                        <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-none border-l">
                            <ChevronRightIcon className="mx-auto" />
                        </Button>
                    </Link>
                )}

                {!isLastChapter && (
                    <Link href={`/chapter/${lastChapter?.id}`} className="flex">
                        <Button className="w-full bg-blue-400 hover:bg-blue-500 rounded-l-none border-l">
                            <ChevronsRightIcon className="mx-auto" />
                        </Button>
                    </Link>
                )}

                {isLastChapter && (
                    <Link href={`/manga/${manga.data.id}`} className="flex-1">
                        <Button className="w-full bg-green-400 hover:bg-green-500 rounded-l-none border-l">
                            Go to Title Page
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

function ChapterImage({
    baseUrl,
    imageData,
    hash,
}: {
    baseUrl: string;
    imageData: string;
    hash: string;
}) {
    return (
        <div className="flex max-w-[100vw] flex-col md:max-w-[75vw] lg:max-w-[50vw]">
            <Image
                alt="Loading..."
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                src={`/api/proxy/proxyimage?url=${baseUrl}/data/${hash}/${imageData}`}
                className="h-auto w-full"
            />
        </div>
    );
}
