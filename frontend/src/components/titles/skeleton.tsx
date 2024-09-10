import { Skeleton } from "@/components/ui/skeleton";

export default async function CardSkeleton({
    amount = 10,
}: {
    amount?: number;
}) {
    return (
        <div className="">
            <header className="flex items-center p-4 border-b">
                <Skeleton className="w-6 h-6 mr-4" />
                <Skeleton className="h-6 w-40" />
            </header>
            <main className="p-4">
                {[...Array(amount)].map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 pb-4 border-b last:border-b-0"
                    >
                        <Skeleton className="w-full sm:w-[200px] h-[280px] max-w-[200px] mx-auto sm:mx-0 rounded" />
                        <div className="flex-grow w-full">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-5 w-full sm:w-2/4" />
                            </div>
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full sm:w-1/2 mt-2" />
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                        <Skeleton className="w-10 h-10 rounded mt-2 sm:mt-0" />
                    </div>
                ))}
            </main>
        </div>
    );
}
