import { getJSON } from "utils/request";

export async function load() {
	return {
		changelogs: getJSON(`changelogs`) as Promise<{
			data: Array<{
				bugs: string;
				date: string;
				enhancements: string;
				features: string;
				id: number;
				version: string;
			}>;
		}>
	};
}
