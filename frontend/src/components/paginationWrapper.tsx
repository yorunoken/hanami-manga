"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/pagination";
import { TitleType } from "@/types";

type PaginationWrapperProps = {
    currentPage: number;
    totalPages: number;
    titleType: TitleType;
};

export default function PaginationWrapper({
    currentPage,
    totalPages,
    titleType,
}: PaginationWrapperProps) {
    const router = useRouter();
    console.log("hi");
    console.log({
        currentPage,
        totalPages,
        titleType,
    });

    function handlePageChange(newPage: number) {
        router.push(`/titles/${titleType.toLowerCase()}?page=${newPage}`);
    }

    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    );
}
