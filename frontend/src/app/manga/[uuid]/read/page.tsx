import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/lib";

async function getFirstChapterId(uuid: string) {
    const response = await fetch(
        `${BACKEND_URL}/api/chapter?manga=${uuid}&order[chapter]=asc&limit=1`,
    );
    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0].id : null;
}

export default async function MangaReadPage({
    params,
}: {
    params: { uuid: string };
}) {
    const { uuid } = params;

    const cookieStore = cookies();
    const lastReadChapterCookie = cookieStore.get(
        `lastReadChapterManga_${uuid}`,
    );

    if (lastReadChapterCookie?.value) {
        redirect(`/chapter/${lastReadChapterCookie.value}`);
    }

    const firstChapterId = await getFirstChapterId(uuid);

    if (firstChapterId) {
        redirect(`/chapter/${firstChapterId}`);
    } else {
        redirect(`/manga/${uuid}`);
    }
}
