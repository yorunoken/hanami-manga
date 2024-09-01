import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
};

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    const pageNumbers = getPageNumbers(currentPage, totalPages, 5);

    return (
        <div
            className={
                "flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 " +
                    className ?? ""
            }
        >
            <div className="flex space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">First page</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                </Button>
            </div>
            <div className="flex items-center space-x-1">
                {pageNumbers.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => onPageChange(page)}
                        size="icon"
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <div className="flex space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">Last page</span>
                </Button>
            </div>
        </div>
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
