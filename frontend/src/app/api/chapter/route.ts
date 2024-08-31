import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const queryParams = new URLSearchParams(url.search);

    console.log(API_BASE + "chapter?" + queryParams.toString());
    const data = await fetch(
        API_BASE + "chapter?" + queryParams.toString(),
    ).then((res) => res.json());

    return Response.json(data);
}
