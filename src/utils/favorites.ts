export function saveMangaToFavorites(mangaId: string) {
	const favorites = getFavorites();
	const now = new Date().getTime().toString();

	const existingMangaIndex = favorites.findIndex((h) => h.mangaId === mangaId);
	if (existingMangaIndex !== -1) {
		favorites[existingMangaIndex] = {
			updatedAt: now,
			mangaId
		};
	} else {
		favorites.push({ updatedAt: now, mangaId });
	}

	localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function removeMangaFromFavorites(mangaId: string) {
	const favorites = getFavorites().filter((fav) => fav.mangaId !== mangaId);

	localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function getFavorites(): Array<{
	mangaId: string;
	updatedAt: string;
}> {
	return JSON.parse(localStorage.getItem("favorites") ?? "[]") || [];
}
