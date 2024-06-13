import { json } from "@sveltejs/kit";

export async function GET() {
	const res = await fetch(`http://localhost:8080/api/changelogs`);

	return json(await res.json());
}
