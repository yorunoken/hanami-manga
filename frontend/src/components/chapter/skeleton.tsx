import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ChapterPageSkeleton() {
    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
            <div className="mt-4 flex flex-col items-center relative w-full">
                <div className="text-center">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
            <div className="w-full py-4 space-y-3">
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-[60vh]" />
                ))}
            </div>
            <div className="flex justify-between items-center gap-2 mb-2 w-full">
                <Skeleton className="w-10 h-10 rounded-md" />
                <Skeleton className="w-10 h-10 rounded-md" />
            </div>
        </div>
    );
}
