import { getJSON } from "utils/request";

export async function load({ url }) {
	const searchQuery = url.searchParams.get("q") ?? "";
	const currentPage = Number(url.searchParams.get("page")) || 1;
	const limit = 20;

	return {
		limit,
		currentPage,
		searchQuery,
		manga: {
			search: getJSON(
				`manga?includes[]=cover_art&title=${searchQuery}&limit=${limit}${currentPage === 1 ? "" : `&offset=${limit * (currentPage - 1) + 4}`}`
			) as Promise<MangaSearchResponse>
		}
	};
}
