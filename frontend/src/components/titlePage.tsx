import {
    MangaSchema,
    CoverAttributesSchema,
    AuthorAttributesSchema,
} from "@/types/schema";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export async function TitlePageCard({ manga }: { manga: MangaSchema }) {
    const coverArtAttributes = manga.relationships.find(
        (relationship) => relationship.type === "cover_art",
    )?.attributes as CoverAttributesSchema | undefined;

    const authorAttributes = manga.relationships.find(
        (relationship) => relationship.type === "author",
    )?.attributes as AuthorAttributesSchema | undefined;

    const title =
        manga.attributes.title.en ??
        manga.attributes.altTitles?.filter((altTitle) => altTitle.en)[0]?.en ??
        manga.attributes.title["ja-ro"] ??
        manga.attributes.title["ja"] ??
        "Unknown Title";

    const description =
        manga.attributes.description.en ?? "No description available.";

    return (
        <div className="group relative flex flex-col sm:flex-row sm:px-12 items-start py-4 sm:space-y-0 sm:space-x-4 border-b last:border-b-0 transition-all duration-200 ease-in-out hover:bg-primary-foreground hover:shadow-md rounded-lg">
            <Link
                href={`/manga/${manga.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View details for ${title}`}
            />
            <Image
                src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${coverArtAttributes?.fileName}`}
                alt="Manga Cover"
                width={600}
                height={600}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                className="h-auto object-cover aspect-[5/8] rounded w-full sm:w-auto max-w-[200px] mx-auto sm:mx-0"
            />
            <div className="flex-grow w-full">
                <div className="flex items-center">
                    <span className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                        {title}
                    </span>
                </div>
                <div className="relative z-20 flex items-center text-sm text-muted-foreground mt-1">
                    <span>
                        {description.length > 300
                            ? `${description.slice(0, 300)}...`
                            : description}
                    </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="relative z-20">
                            {authorAttributes?.name ?? "Unknown author"}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="relative z-20 ">
                            {new Date(
                                manga.attributes.updatedAt,
                            ).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
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
