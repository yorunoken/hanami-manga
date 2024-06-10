interface MangaSearchResponse {
	result: string;
	response: string;
	data: Array<MangaData>;
	limit: number;
	offset: number;
	total: number;
}

interface MangaResponse {
	result: string;
	response: string;
	data: MangaData;
	limit: number;
	offset: number;
	total: number;
}

interface MangaData {
	id: string;
	type: string;
	attributes: MangaAttributes;
	relationships: Array<Relationship>;
}

interface MangaAttributes {
	title: MangaTitle;
	altTitles?: Array<MangaTitle>;
	description: MangaDescription;
	isLocked: boolean;
	links: MangaLinks;
	originalLanguage: string;
	lastVolume: string;
	lastChapter: string;
	publicationDemographic: string | null;
	status: string;
	year: number;
	contentRating: string;
	chapterNumbersResetOnNewVolume: boolean;
	availableTranslatedLanguages: Array<string>;
	latestUploadedChapter: string;
	tags: Array<Tag>;
	state: string;
	createdAt: string;
	updatedAt: string;
}

interface MangaTitle {
	en?: string;
	ko?: string;
	fa?: string;
	zh?: string;
	ja?: string;
	ru?: string;
	"ja-ro"?: string;
	"zh-hk"?: string;
	"es-la"?: string;
}

interface MangaDescription {
	de: string | undefined;
	en: string | undefined;
	fa: string | undefined;
	fr: string | undefined;
	ja: string | undefined;
	ko: string | undefined;
	ru: string | undefined;
	th: string | undefined;
	"zh-hk": string | undefined;
}

interface MangaLinks {
	al: string;
	ap: string;
	kt: string;
	mu: string;
	nu: string;
	mal: string;
	raw: string;
	engtl: string;
}

interface Tag {
	id: string;
	type: string;
	attributes: TagAttributes;
	relationships: Array<Relationship>;
}

interface TagAttributes {
	name: MangaTitle;
	description: {};
	group: string;
	version: number;
}

interface Relationship {
	id: string;
	type: string;
	related: string;
	attributes: Record<string, string | number | undefined>;
}
