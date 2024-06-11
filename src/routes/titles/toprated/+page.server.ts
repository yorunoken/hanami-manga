import { getJSON } from "utils/request";

export async function load({ url }) {
	const page = Number(url.searchParams.get("page")) || 1;
	const mangasLimit = 20;

	return {
		page,
		limit: mangasLimit,
		manga: {
			topRated: getJSON(
				`manga?includes[]=cover_art&order[followedCount]=desc&limit=${mangasLimit}${page === 1 ? "" : `&offset=${mangasLimit * (page - 1) + 4}`}`
			) as Promise<MangaSearchResponse>
		}
	};
}
