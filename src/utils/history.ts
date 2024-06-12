export function saveChapterToHistory(chapterId: string, mangaId: string) {
	const history = getReadChapters();
	const now = new Date().getTime().toString();

	const existingMangaIndex = history.findIndex((h) => h.mangaId === mangaId);
	if (existingMangaIndex !== -1) {
		history[existingMangaIndex] = {
			chapterUuid: chapterId,
			updatedAt: now,
			mangaId
		};
	} else {
		history.push({ chapterUuid: chapterId, updatedAt: now, mangaId });
	}

	localStorage.setItem("readChapters", JSON.stringify(history));
}

export function getReadChapters(): Array<{
	chapterUuid: string;
	mangaId: string;
	updatedAt: string;
}> {
	return JSON.parse(localStorage.getItem("readChapters") ?? "[]") || [];
}
