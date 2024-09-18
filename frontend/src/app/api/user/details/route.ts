import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Preferences } from "@/types/preferences";
import { BACKEND_URL } from "@/lib";
import { authOptions } from "@/lib/auth";

export async function GET({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
        `${BACKEND_URL}/api/user/${session.user?.id}/details`,
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
        );
    }

    const preferenceData: Preferences = await response.json();

    return NextResponse.json(preferenceData, { status: 200 });
}
