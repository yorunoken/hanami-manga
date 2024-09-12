import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ErrorPreferences, Preferences } from "@/types/preferences";
import { BACKEND_URL } from "@/lib";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences: Preferences = await req.json();

    const response = await fetch(`${BACKEND_URL}/api/user/preferences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...preferences,
            discordId: session.user?.id.toString(),
        }),
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
        );
    }

    return NextResponse.json(
        { message: "Preferences saved successfully" },
        { status: 200 },
    );
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
        `${BACKEND_URL}/api/user/preferences?id=${session.user?.id}`,
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
        );
    }

    const preferenceData: Array<Preferences> | ErrorPreferences =
        await response.json();

    return NextResponse.json(
        Array.isArray(preferenceData) ? preferenceData[0] : preferenceData,
        { status: 200 },
    );
}
