import { Skeleton } from "@/components/ui/skeleton";

export async function MangaPageSkeleton() {
    return (
        <div className="my-8 px-4 lg:container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Skeleton className="h-[600px] w-[400px] rounded-lg" />
                <div className="space-y-4">
                    <Skeleton className="h-[40px] w-[250px] rounded-md" />
                    <Skeleton className="h-[20px] w-[200px] rounded-2xl" />
                    <Skeleton className="h-[90px] w-[350px] rounded-md" />

                    <div className="flex items-center gap-4">
                        <Skeleton className="h-[60px] w-[90px] rounded-lg" />
                        <Skeleton className="h-[60px] w-[90px] rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
