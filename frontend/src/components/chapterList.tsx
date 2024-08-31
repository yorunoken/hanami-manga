"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons/chevron";
import { BASE_URL } from "@/lib";
import { ChapterListSchema, ChapterSchema } from "@/types/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useCallback, MouseEventHandler } from "react";

type ChapterListProps = {
    mangaId: string;
    chaptersPerPage: number;
};

export default function ChapterList({
    mangaId,
    chaptersPerPage,
}: ChapterListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [chapters, setChapters] = useState<Array<ChapterSchema>>([]);
    const [hasMoreChapters, setHasMoreChapters] = useState(true);
    const [totalChapters, setTotalChapters] = useState(0);

    const totalPages = Math.ceil(totalChapters / chaptersPerPage);

    function handleNextPage() {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }

    function handleLastPage() {
        const lastPage = totalPages;
        setCurrentPage(lastPage);
    }

    function handlePreviousPage() {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    function handleFirstPage() {
        setCurrentPage(1);
    }

    function handlePageChange(index: number) {
        setCurrentPage(index);
    }

    useEffect(() => {
        async function fetchChapters(page: number) {
            const response = (await fetch(
                `${BASE_URL}api/proxy/chapter?manga=${mangaId}&order[chapter]=desc&translatedLanguage[]=en&limit=${chaptersPerPage}&offset=${(page - 1) * chaptersPerPage}`,
            ).then((res) => res.json())) as ChapterListSchema;

            setChapters(response.data);
            setHasMoreChapters(response.data.length === chaptersPerPage);
            setTotalChapters(response.total);
        }

        fetchChapters(currentPage);
    }, [currentPage, chaptersPerPage, mangaId]);

    const pageNumbers = getPageNumbers(currentPage, totalPages, 5);

    return (
        <div className="space-y-4">
            {chapters.map((chapter, index) => (
                <Link key={index} href={`/read/${chapter.id}`}>
                    <div className="px-4 py-3 my-2 rounded-lg border border-muted/50 bg-muted/5 hover:bg-muted/10 transition-colors">
                        <p className="text-lg font-medium">
                            Chapter {chapter.attributes.chapter}
                            {chapter.attributes.title
                                ? ": " + chapter.attributes.title
                                : ""}
                        </p>
                    </div>
                </Link>
            ))}
            <div className="flex items-center justify-center gap-2">
                <PageButton
                    text="First Page"
                    side="left"
                    disabled={currentPage === 1}
                    onClick={handleFirstPage}
                />
                <PageButton
                    text="Previous Page"
                    side="left"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                />
                <div className="flex items-center">
                    {pageNumbers.map((page) => (
                        <PageNumber
                            key={page}
                            index={page}
                            isCurrent={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                        />
                    ))}
                </div>
                <PageButton
                    text="Next Page"
                    side="right"
                    disabled={!hasMoreChapters}
                    onClick={handleNextPage}
                />
                <PageButton
                    text="Last Page"
                    side="right"
                    disabled={!hasMoreChapters}
                    onClick={handleLastPage}
                />
            </div>
        </div>
    );
}

function PageNumber({
    index,
    isCurrent,
    onClick,
}: {
    index: number;
    isCurrent: boolean;
    onClick: MouseEventHandler;
}) {
    return (
        <Button
            className={`mx-1 px-3 py-1 border border-muted/60 rounded-lg bg-inherit ${
                isCurrent ? "bg-muted/15 font-bold" : "hover:bg-muted/15"
            } transition-colors`}
            onClick={onClick}
        >
            {index}
        </Button>
    );
}

function PageButton({
    text,
    side,
    onClick,
    disabled,
}: {
    text: string;
    side: "left" | "right";
    onClick: MouseEventHandler;
    disabled: boolean;
}) {
    return (
        <Button
            className={`px-3 py-1 border border-muted/60 rounded-lg bg-inherit ${disabled ? "hover:cursor-not-allowed" : "hover:bg-muted/15"} transition-colors`}
            disabled={side === "left"}
            onClick={onClick}
        >
            {side === "left" ? (
                <ChevronLeftIcon className="h-4 w-4" />
            ) : (
                <ChevronRightIcon className="h-4 w-4" />
            )}

            <span className="sr-only">{text}</span>
        </Button>
    );
}

function getPageNumbers(
    currentPage: number,
    totalPages: number,
    maxVisible: number,
) {
    const paginationNumbers: Array<number> = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(i);
    }

    return paginationNumbers;
}
