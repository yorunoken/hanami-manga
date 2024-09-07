import { MangaCardSkeleton } from "@/components/mangaCard";
import { MangaCarousel, Titles } from "@/components/mangaCarousel";
import { TitleType } from "@/types";
import { Suspense } from "react";

export default async function MainPage() {
    return (
        <div className="my-4 px-4 lg:container mx-auto">
            <Titles title="Latest Updated Manga" redirect="/titles/recent" />
            <Suspense fallback={<MangaCardSkeleton />}>
                <MangaCarousel mangaType={TitleType.RECENT} />
            </Suspense>

            <Titles title="Top Rated Manga" redirect="/titles/toprated" />
            <Suspense fallback={<MangaCardSkeleton />}>
                <MangaCarousel mangaType={TitleType.TOPRATED} />
            </Suspense>

            <Titles title="Top Followed Manga" redirect="/titles/topfollowed" />
            <Suspense fallback={<MangaCardSkeleton />}>
                <MangaCarousel mangaType={TitleType.TOPFOLLOWED} />
            </Suspense>
        </div>
    );
}
