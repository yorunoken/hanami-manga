import { getJSON } from "utils/request";

export async function load({ params: { uuid } }) {
	const chapterData: MangaChapterGet = await getJSON(
		`chapter/${uuid}?includes[]=manga&includes[]=author&includes[]=artist`
	);
	const mangaData: MangaResponse = await getJSON(
		`manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}?includes[]=cover_art&includes[]=author&includes[]=artist`
	);

	const totalChaptersData: AggregateChapter = await getJSON(
		`manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}/aggregate?translatedLanguage[]=en`
	);

	const chapterImagesData: ChapterImageData = await getJSON(`at-home/server/${uuid}`);

	const volumesArray = Object.values(totalChaptersData.volumes);
	const allChapters = volumesArray.flatMap((volume) => Object.values(volume.chapters));
	const currentChapterIndex = allChapters.findIndex((chapter) => chapter.id === uuid);

	const nextChapterId = allChapters[currentChapterIndex + 1]?.id;

	return {
		uuid,
		allChapters,
		nextChapterId,
		manga: {
			chapter: chapterData,
			info: mangaData,
			chapters: totalChaptersData,
			pageImages: chapterImagesData
		}
	};
}
