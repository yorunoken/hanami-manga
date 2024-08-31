import { TagSchema } from "@/types/schema";

export default function Tags({ tags }: { tags: Array<TagSchema> }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <span
                    key={tag.attributes.name.en ?? index}
                    className="px-3 py-1 rounded-full bg-muted/20 text-primary-foreground text-sm font-medium"
                >
                    {tag.attributes.name.en}
                </span>
            ))}
        </div>
    );
}
