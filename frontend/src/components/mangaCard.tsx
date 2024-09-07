import type { MangaSchema } from "@/types/schema";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Link from "next/link";

export function MangaCard({ manga }: { manga: MangaSchema }) {
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
        <Link
            href={`/manga/${manga.id}`}
            className="bg-transparent rounded-lg overflow-hidden"
            prefetch={false}
        >
            <Image
                priority
                src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                alt="Manga Cover"
                width={300}
                height={1000}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                className="h-auto object-cover aspect-[5/8]"
            />
            <div className="pt-1">
                <h3 className="text-lg font-bold mb-2">
                    {title.length > 45 ? `${title.slice(0, 45)}...` : title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {description.length > 45
                        ? `${description.slice(0, 45)}...`
                        : description}
                </p>
            </div>
        </Link>
    );
}

export function MangaCardSkeleton() {
    return (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex flex-col space-y-3" key={index}>
                    <Skeleton className="h-[480px] w-[280px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
