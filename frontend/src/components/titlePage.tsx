import { MangaSchema } from "@/types/schema";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Clock, Flag, MessageSquare, User } from "lucide-react";

export async function TitlePageCard({ manga }: { manga: MangaSchema }) {
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

    return (
        <div
            className="flex flex-col sm:flex-row sm:px-12 items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 pb-4 border-b last:border-b-0
            "
        >
            <Image
                src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                alt="Manga Cover"
                width={600}
                height={600}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                className="h-auto object-cover aspect-[5/8] rounded w-full sm:w-auto max-w-[200px] mx-auto sm:mx-0"
            />
            <div className="flex-grow w-full">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <span>
                        {description.length > 300
                            ? `${description.slice(0, 300)}...`
                            : description}
                    </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>Author here</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                            {new Date(
                                manga.attributes.updatedAt,
                            ).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Flag className="w-4 h-4 mr-1" />
                        <span>views here</span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>group here</span>
                    </div>
                </div>
            </div>
            <button className="p-2 rounded mt-2 sm:mt-0">
                <MessageSquare className="w-5 h-5" />
            </button>
        </div>
    );
}

export async function TitlePageSkeleton({ amount = 10 }: { amount?: number }) {
    return (
        <div className="">
            <header className="flex items-center p-4 border-b">
                <Skeleton className="w-6 h-6 mr-4" />
                <Skeleton className="h-6 w-40" />
            </header>
            <main className="p-4">
                {[...Array(amount)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 pb-4 border-b last:border-b-0"
                    >
                        <Skeleton className="w-full sm:w-[200px] h-[280px] max-w-[200px] mx-auto sm:mx-0 rounded" />
                        <div className="flex-grow w-full">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-5 w-full sm:w-2/4" />
                            </div>
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full sm:w-1/2 mt-2" />
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <Skeleton className="w-10 h-10 rounded mt-2 sm:mt-0" />
                    </div>
                ))}
            </main>
        </div>
    );
}
