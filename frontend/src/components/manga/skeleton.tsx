import { Skeleton } from "@/components/ui/skeleton";

export default function MangaPageSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/3">
                <Skeleton className="w-full h-auto aspect-[5/8] rounded" />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 w-20 rounded-full"
                        />
                    ))}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} className="h-12 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
