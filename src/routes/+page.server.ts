import { getJSON } from "utils/request";

export async function load() {
	const limit = 5;

	return {
		limit,
		manga: {
			recent: getJSON(
				`manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${limit}`
			) as Promise<MangaSearchResponse>,
			topRated: getJSON(
				`manga?includes[]=cover_art&order[rating]=desc&limit=${limit}`
			) as Promise<MangaSearchResponse>,
			topFollowed: getJSON(
				`manga?includes[]=cover_art&order[followedCount]=desc&limit=${limit}`
			) as Promise<MangaSearchResponse>
		}
	};
}
