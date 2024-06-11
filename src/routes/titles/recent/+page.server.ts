import { getJSON } from "utils/request";

export async function load({ url }) {
	const page = Number(url.searchParams.get("page")) || 1;
	const mangasLimit = 20;

	return {
		page,
		limit: mangasLimit,
		manga: {
			recent: getJSON(
				`manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${mangasLimit}${page === 1 ? "" : `&offset=${mangasLimit * (page - 1) + 4}`}`
			) as Promise<MangaSearchResponse>
		}
	};
}
