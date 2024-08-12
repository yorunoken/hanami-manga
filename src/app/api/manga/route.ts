import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const queryParams = new URLSearchParams(url.search);

    const data = await fetch(API_BASE + "manga?" + queryParams.toString()).then(
        (res) => res.json(),
    );

    return Response.json(data);
}
