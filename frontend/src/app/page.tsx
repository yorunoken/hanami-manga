import { MangaCardSkeleton } from "@/components/MangaCardSkeleton";
import { MangaCarousel, MANGAS, Titles } from "@/components/mangaCarousel";
import { Suspense } from "react";

export default async function MainPage() {
    return (
        <div className="my-4 px-4 lg:container mx-auto">
            <Titles title="Recently updated Manga" redirect="/titles/recent" />
            <Suspense fallback={MangaCardSkeleton()}>
                <MangaCarousel mangaType={MANGAS.RECENT} />
            </Suspense>

            <Titles title="Top Rated Manga" redirect="/titles/toprated" />
            <Suspense fallback={MangaCardSkeleton()}>
                <MangaCarousel mangaType={MANGAS.TOPRATED} />
            </Suspense>

            <Titles title="Top Followed Manga" redirect="/titles/topfollowed" />
            <Suspense fallback={MangaCardSkeleton()}>
                <MangaCarousel mangaType={MANGAS.TOPFOLLOWED} />
            </Suspense>
        </div>
    );
}
