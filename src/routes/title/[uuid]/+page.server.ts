import { getJSON } from "utils/request";

export async function load({ params: { uuid } }) {
	return {
		manga: (await getJSON(`manga/${uuid}?includes[]=cover_art`)) as MangaResponse
	};
}
