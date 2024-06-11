import { error, json } from "@sveltejs/kit";

export async function GET({ url }) {
	// return json({ gg: "hioi" });
	const imageUrl = url.searchParams.get("url");
	if (imageUrl === null) {
		error(400, "please pass in the `url` parameter to proxy an image.");
	}

	const res = await fetch(`http://localhost:8080/api/proxy-image?url=${imageUrl}`);
	const imageBuffer = await res.arrayBuffer();

	return new Response(imageBuffer, {
		headers: {
			"Content-Type": "image/jpeg"
		}
	});
}
