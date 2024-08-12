import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const uuid = url.pathname.split("/").pop();

    const data = await fetch(API_BASE + `manga/${uuid}`).then((res) =>
        res.json(),
    );

    return Response.json(data);
}
