import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const forbiddenEndpoints = ["manga", "homeserver"];

const backendPort = process.env.BACKEND_PORT;
export async function GET(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const path = pathname.replace("/api/proxy/", "");

    if (forbiddenEndpoints.includes(path)) {
        return notFound();
    }

    const url = new URL(`http://localhost:${backendPort}/api/${path}`);

    searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    console.log("proxying API url: " + url);

    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return NextResponse.json(data);
    } else {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    }
}

export async function POST(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const path = pathname.replace("/api/proxy/", "");

    if (forbiddenEndpoints.includes(path)) {
        return notFound();
    }

    const url = new URL(`http://localhost:${backendPort}/api/${path}`);
    console.log("proxying API url: " + url);

    const response = await fetch(url, {
        method: "POST",
        headers: request.headers,
        body: request.body,
    });
    const data = await response.json();

    return NextResponse.json(data);
}
