"use client";
import { Chapter, ChapterSchema } from "@/types/schema";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "./pagination";

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
    const [totalChapters, setTotalChapters] = useState(0);

    const totalPages = Math.ceil(totalChapters / chaptersPerPage);

    useEffect(() => {
        async function fetchChapters(page: number) {
            const response: Chapter.GetChapter.ResponseBody = await fetch(
                `/api/proxy/chapter?manga=${mangaId}&order[chapter]=desc&translatedLanguage[]=en&limit=${chaptersPerPage}&offset=${(page - 1) * chaptersPerPage}`,
            ).then((res) => res.json());

            setChapters(response.data);
            setTotalChapters(response.total);
        }

        fetchChapters(currentPage);
    }, [currentPage, chaptersPerPage, mangaId]);

    return (
        <div>
            <Card className="pt-4">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4">Manga Chapters</h2>
                    <ul className="space-y-2">
                        {chapters.map((chapter) => (
                            <li key={chapter.id}>
                                <Link
                                    href={`/chapter/${chapter.id}`}
                                    className="hover:underline"
                                >
                                    Chapter {chapter.attributes.chapter}:{" "}
                                    {chapter.attributes.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-2"
            />
        </div>
    );
}
