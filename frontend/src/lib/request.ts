import { TitleType } from "@/types";
import { MangaListSchema } from "@/types/schema";
import { BACKEND_URL, BASE_URL } from ".";

export async function fetchSearchMangas(
    type: TitleType,
    limit: number = 5,
    offset?: number,
) {
    let data: MangaListSchema;

    switch (type) {
        case TitleType.RECENT:
            data = await fetch(
                `${BACKEND_URL}/api/manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${limit}${offset ? `&offset=${offset}` : ""}`,
            ).then((response) => response.json());
            break;
        case TitleType.TOPRATED:
            data = await fetch(
                `${BACKEND_URL}/api/manga?includes[]=cover_art&order[rating]=desc&limit=${limit}${offset ? `&offset=${offset}` : ""}`,
            ).then((response) => response.json());
            break;
        case TitleType.TOPFOLLOWED:
            data = await fetch(
                `${BACKEND_URL}/api/manga?includes[]=cover_art&order[followedCount]=desc&limit=${limit}${offset ? `&offset=${offset}` : ""}`,
            ).then((response) => response.json());
            break;
    }

    return data;
}
