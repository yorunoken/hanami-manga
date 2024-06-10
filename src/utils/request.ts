export async function getJSON(endpoint: string) {
	const res = await fetch(`http://localhost:8080/api/${endpoint}`);

	if (res.ok) {
		return await res.json();
	} else {
		throw new Error("Request failed.");
	}
}
