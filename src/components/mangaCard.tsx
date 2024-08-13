import type { MangaSchema } from "@/types/schema";
import Image from "next/image";
import Link from "next/link";

export function MangaCard({ data }: { data: MangaSchema }) {
    const relationshipAttributes = data.relationships.find(
        (relationship) => relationship.type === "cover_art",
    )?.attributes as { fileName?: string } | null;

    const title =
        data.attributes.title.en ??
        data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
        data.attributes.title["ja-ro"] ??
        data.attributes.title["ja"] ??
        "Unknown Title";

    const description =
        data.attributes.description.en ?? "No description available.";

    return (
        <Link
            href={`/title/${data.id}`}
            className="bg-[#2a2a2a] rounded-lg overflow-hidden"
            prefetch={false}
        >
            <Image
                src={`/api/proxyimage?url=https://mangadex.org/covers/${data.id}/${relationshipAttributes?.fileName}`}
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
