import Footer from "@/components/footer";
import Header from "@/components/header";
import { MangaCategory } from "@/components/mangaCategory";
import { BASE_URL } from "@/lib";

async function fetchMangas() {
    const limit = 5;

    return {
        recent: await fetch(
            `${BASE_URL}api/manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${limit}`,
        ).then((response) => response.json()),
        topRated: await fetch(
            `${BASE_URL}api/manga?includes[]=cover_art&order[rating]=desc&limit=${limit}`,
        ).then((response) => response.json()),
        topFollowed: await fetch(
            `${BASE_URL}api/manga?includes[]=cover_art&order[followedCount]=desc&limit=${limit}`,
        ).then((response) => response.json()),
    };
}

export default async function MainPage() {
    const { recent, topRated, topFollowed } = await fetchMangas();

    return (
        <section className="w-full bg-[#1a1a1a]">
            <Header />
            <MangaCategory
                title="Recently updated Manga"
                redirect="/titles/recent"
                mangas={recent}
            />

            <MangaCategory
                title="Top Rated Manga"
                redirect="/titles/toprated"
                mangas={topRated}
            />

            <MangaCategory
                title="Top Followed Manga"
                redirect="/titles/topfollowed"
                mangas={topFollowed}
            />
            <Footer />
        </section>
    );
}
