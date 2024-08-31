import type { MangaSchema } from "@/types/schema";
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
            className="bg-[#2a2a2a] rounded-lg overflow-hidden"
            prefetch={false}
        >
            <Image
                src={`/api/proxy/proxyimage?url=https://mangadex.org/covers/${manga.id}/${relationshipAttributes?.fileName}`}
                alt="Manga Cover"
                width={300}
                height={400}
                className="w-full h-[400px] object-cover"
                style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                }}
            />
            <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">
                    {title.length > 45 ? `${title.slice(0, 45)}...` : title}
                </h3>
                <p className="text-white text-sm line-clamp-2">
                    {description.length > 45
                        ? `${description.slice(0, 45)}...`
                        : description}
                </p>
            </div>
        </Link>
    );
}
