"use client";

import { useEffect } from "react";
import { setCookie } from "cookies-next";

type ChapterTrackerProps = {
    mangaId: string;
    chapterId: string;
};

export default function ChapterTracker({
    mangaId,
    chapterId,
}: ChapterTrackerProps) {
    useEffect(() => {
        setCookie(`lastReadChapterManga_${mangaId}`, chapterId);
    }, [mangaId, chapterId]);

    // Don't render anything.
    return null;
}
