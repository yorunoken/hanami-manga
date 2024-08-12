import { API_BASE } from "@/lib";

export async function GET(request: Request) {
    return new Response(JSON.stringify({ thing: "hello!" }), {
        headers: { "Content-Type": "application/json" },
    });
}
