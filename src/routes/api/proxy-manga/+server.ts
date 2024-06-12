import { json } from "@sveltejs/kit";

export async function GET({ url }) {
	const queryParams = new URLSearchParams(url.searchParams).toString();

	const res = await fetch(`http://localhost:8080/api/manga?${queryParams}`);

	return json(await res.json());
}
