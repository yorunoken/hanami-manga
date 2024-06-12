interface MangaChapterSearch {
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
			attributes: Record<string, any>;
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

interface MangaChapterGet {
	data: {
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
			attributes: Record<string, any>;
			id: string;
			type: string;
		}>;
	};
	type: string;
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

interface AggregateChapter {
	result: "ok" | "error";
	volumes: {
		[key: string]: {
			volume: string;
			count: number;
			chapters: {
				[key: string]: {
					chapter: string;
					id: string;
					others: Array<string>;
					count: number;
				};
			};
		};
	};
}
