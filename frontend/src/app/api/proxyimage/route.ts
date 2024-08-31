import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);

    const response = await fetch(
        API_BASE + "proxyimage?" + queryParams.toString(),
    );
    if (!response.ok) {
        return new Response("Failed to fetch image", {
            status: response.status,
        });
    }

    const contentType =
        response.headers.get("Content-Type") || "application/octet-stream";

    const imageBlob = await response.blob();
    return new Response(imageBlob, {
        headers: {
            "Content-Type": contentType,
        },
    });
}
