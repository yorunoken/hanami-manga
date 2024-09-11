import type { CoverAttributesSchema, MangaSchema } from "@/types/schema";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Link from "next/link";

export function Card({ manga }: { manga: MangaSchema }) {
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

    return (
        <div className="p-3 space-y-2 relative group bg-transparent rounded-lg overflow-hidden transition-all duration-200 ease-in-out hover:bg-primary-foreground hover:shadow-md">
            <Link
                href={`/manga/${manga.id}`}
                className="absolute inset-0 z-10"
                prefetch={false}
            />
            <Image
                src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                alt="Manga Cover"
                width={300}
                height={1000}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                className="h-auto z-20 object-cover aspect-[5/8] rounded"
            />
            <div>
                <h3 className="relative text-lg font-bold mb-2 z-5">
                    {title.length > 45 ? `${title.slice(0, 45)}...` : title}
                </h3>
                <p className="relative text-sm text-muted-foreground z-20">
                    {description.length > 45
                        ? `${description.slice(0, 45)}...`
                        : description}
                </p>
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="p-3 space-y-2 bg-transparent rounded-lg overflow-hidden"
                >
                    <Skeleton className="h-auto w-full aspect-[5/8] rounded" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
