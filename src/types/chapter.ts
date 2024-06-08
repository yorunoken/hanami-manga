interface MangaChapter {
	data: Array<{
		attributes: {
			chapter: string;
			createdAt: string;
			externalUrl: string | null;
			pages: number;
			publishAt: string;
			readableAt: string;
			title: string;
			translatedLanguage: string;
			updatedAt: string;
			version: number;
			volume: string;
		};
		id: string;
		relationships: Array<{
			id: string;
			type: string;
		}>;
		type: string;
	}>;
	limit: number;
	offset: number;
	response: string;
	result: string;
	total: number;
}

interface ChapterImageData {
	result: "ok" | "error";
	baseUrl: string;
	chapter: {
		hash: string;
		data: Array<string>;
		dataSaver: Array<string>;
	};
}
