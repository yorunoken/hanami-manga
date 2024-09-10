import {
    MangaSchema,
    CoverAttributesSchema,
    AuthorAttributesSchema,
} from "@/types/schema";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export default async function Card({ manga }: { manga: MangaSchema }) {
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
