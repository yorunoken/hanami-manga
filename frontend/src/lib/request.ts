import { TitleType } from "@/types";
import { MangaListSchema } from "@/types/schema";
import { BACKEND_URL } from ".";

export async function fetchSearchMangas(
    type: TitleType,
    limit: number = 5,
    offset?: number,
): Promise<MangaListSchema> {
    let url = `${BACKEND_URL}/api/manga?includes=cover_art,author&limit=${limit}${offset ? `&offset=${offset}` : ""}`;
    switch (type) {
        case TitleType.RECENT:
            url += "&order[latestUploadedChapter]=desc";
            break;
        case TitleType.TOPRATED:
            url += "&order[rating]=desc";
            break;
        case TitleType.TOPFOLLOWED:
            url += "&order[followedCount]=desc";
            break;
    }

    return fetch(url).then((res) => res.json());
}
