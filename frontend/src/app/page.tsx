import { CardSkeleton } from "@/components/main/card";
import { Carousel, Titles } from "@/components/main/carousel";
import { TitleType } from "@/types";
import { Suspense } from "react";

export default async function Main() {
    return (
        <div className="my-4">
            <Titles title="Latest Updated Manga" redirect="/titles/recent" />
            <Suspense fallback={<CardSkeleton />}>
                <Carousel mangaType={TitleType.RECENT} />
            </Suspense>

            <Titles title="Top Rated Manga" redirect="/titles/toprated" />
            <Suspense fallback={<CardSkeleton />}>
                <Carousel mangaType={TitleType.TOPRATED} />
            </Suspense>

            <Titles title="Top Followed Manga" redirect="/titles/topfollowed" />
            <Suspense fallback={<CardSkeleton />}>
                <Carousel mangaType={TitleType.TOPFOLLOWED} />
            </Suspense>
        </div>
    );
}
