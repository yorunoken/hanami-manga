import { TagSchema } from "@/types/schema";
import { Badge } from "@/components/ui/badge";

export default function Tags({ tags }: { tags: Array<TagSchema> }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
                <Badge className="hover:cursor-default" key={index}>
                    {tag.attributes.name.en}
                </Badge>
            ))}
        </div>
    );
}
