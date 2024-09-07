import { TitlePageCard, TitlePageSkeleton } from "@/components/titlePage";
import { TitleType } from "@/types";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { fetchSearchMangas } from "@/lib/request";
import PaginationWrapper from "@/components/paginationWrapper";

type Props = {
    params: {
        type: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function TitlesPage({ params, searchParams }: Props) {
    let page =
        typeof searchParams.page === "string"
            ? Number(searchParams.page) || 1
            : 1;

    if (page > 500) {
        page = 500;
    }

    let titleType: TitleType;
    switch (params.type.toLowerCase()) {
        case "recent":
            titleType = TitleType.RECENT;
            break;
        case "topfollowed":
            titleType = TitleType.TOPFOLLOWED;
            break;
        case "toprated":
            titleType = TitleType.TOPRATED;
            break;
        default:
            notFound();
    }

    return (
        <div className="my-8 px-4 lg:container mx-auto">
            <Suspense key={page} fallback={<TitlePageSkeleton />}>
                <PageContent page={page} titleType={titleType} />
            </Suspense>
        </div>
    );
}

async function PageContent({
    page,
    titleType,
}: {
    page: number;
    titleType: TitleType;
}) {
    const mangas = await fetchSearchMangas(titleType, 20, (page - 1) * 20);
    const totalPages = Math.ceil(Math.min(mangas.total, 10000) / 20);

    let title = "";
    switch (titleType) {
        case TitleType.RECENT:
            title = "Latest Updates";
            break;
        case TitleType.TOPFOLLOWED:
            title = "Top Followed";
            break;
        case TitleType.TOPRATED:
            title = "Top Rated";
            break;
    }

    return (
        <div>
            <div className="flex items-center p-4 border-b">
                <a href="/" className="flex items-center mr-4 cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </a>
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <main className="p-4">
                <PaginationWrapper
                    currentPage={page}
                    totalPages={Math.ceil(mangas.total / 20)}
                    titleType={titleType}
                />
                <div className="pt-4">
                    {mangas.data.map((manga, index) => (
                        <TitlePageCard manga={manga} key={index} />
                    ))}
                </div>

                <PaginationWrapper
                    currentPage={page}
                    totalPages={totalPages}
                    titleType={titleType}
                />
            </main>
        </div>
    );
}
