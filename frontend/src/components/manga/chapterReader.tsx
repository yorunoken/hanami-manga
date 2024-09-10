"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

type ChapterData = {
    id: string;
    number: string;
} | null;

type ChapterReaderProps = {
    mangaId: string;
    onChapterDataLoaded: (data: ChapterData) => void;
};

export default function ChapterReader({
    mangaId,
    onChapterDataLoaded,
}: ChapterReaderProps) {
    useEffect(() => {
        const cookieData = getCookie(`lastReadChapter_${mangaId}`);
        const chapterData: ChapterData = cookieData
            ? JSON.parse(cookieData as string)
            : null;
        onChapterDataLoaded(chapterData);
    }, [mangaId, onChapterDataLoaded]);

    return null;
}
