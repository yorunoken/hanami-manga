export async function getJSON(endpoint: string) {
	const res = await fetch(`/api/${endpoint}`);

	if (res.ok) {
		return await res.json();
	} else {
		throw new Error("Request failed.");
	}
}
