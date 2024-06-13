import { json } from "@sveltejs/kit";

export async function POST({ url, request }) {
	const res = await fetch(
		`http://localhost:8080/api/changelogs/add?token=${new URLSearchParams(url.searchParams).get("token")}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(await request.json())
		}
	);

	console.log(res);

	return json(await res.json());
}
