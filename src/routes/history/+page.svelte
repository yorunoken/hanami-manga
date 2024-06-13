<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import { getReadChapters } from "utils/history";
	import { onMount } from "svelte";

	let manga: MangaSearchResponse;
	let chapter: MangaChapterSearch;
	// let mangaIds: Array<string>;
	// let chapterIds: Array<string>;
	let minData: Array<number>;
	let loading = true;

	onMount(async () => {
		const readChapters = getReadChapters()
			.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
			.slice(0, 99);

		const chapterIds = readChapters.map((read) => read.chapterUuid);
		const mangaIds = readChapters.map((read) => read.mangaId);

		let chapterIdsFormatted = readChapters.map((read) => `ids[]=${read.chapterUuid}`);

		let mangaIdsFormatted = readChapters.map(
			(read) => `ids[]=${read.mangaId}&includes[]=cover_art`
		);

		if (mangaIdsFormatted.length > 0) {
			manga = await fetch(`/api/proxy-manga?${mangaIdsFormatted.join("&")}`).then((res) =>
				res.json()
			);

			manga.data = manga.data.sort((a, b) => mangaIds.indexOf(a.id) - mangaIds.indexOf(b.id));
		}

		if (chapterIdsFormatted.length > 0) {
			chapter = await fetch(`/api/proxy-chapter?${chapterIdsFormatted.join("&")}`).then((res) =>
				res.json()
			);

			chapter.data = chapter.data.sort(
				(a, b) => chapterIds.indexOf(a.id) - chapterIds.indexOf(b.id)
			);
		}

		const minValue = Math.min(manga.data.length, chapter.data.length);
		minData = Array.from({ length: minValue }, (_, index) => index);

		loading = false;
	});
</script>

<Header />
<main class="flex min-h-screen justify-center bg-gray-900">
	<div class="container mx-auto px-4 py-8 md:px-6">
		<h1 class="mb-6 text-center text-2xl font-bold">Your Reading History</h1>
		{#if !loading && !manga && !chapter}
			<h2>You have no read manga.</h2>
		{:else}
			<div class="grid gap-6">
				{#if !loading}
					{#each minData as i}
						<div class="flex items-start rounded-lg bg-gray-800 p-4">
							<img
								src={`/api/proxy-image?url=https://mangadex.org/covers/${manga.data[i].id}/${manga.data[i].relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
								alt="Manga Cover"
								width={150}
								height={150}
								class="mr-4 flex-shrink-0 rounded-lg"
							/>
							<div class="flex-1">
								<div class="mb-2 flex items-center justify-between">
									<a href={`/title/${manga.data[i].id}`} class="text-xl font-bold hover:underline">
										{manga.data[i].attributes.title.en ??
											manga.data[i].attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
											manga.data[i].attributes.title["ja-ro"] ??
											manga.data[i].attributes.title["ja"]}
									</a>
									<!-- <div class="text-sm text-gray-400">Total Chapters: X</div> -->
								</div>
								<a
									href={`/chapter/${chapter.data[i].id}`}
									class="text-base text-gray-400 hover:underline"
								>
									Latest Read Chapter: {chapter.data[i].attributes.chapter}
									{chapter.data[i].attributes.title ? " - " + chapter.data[i].attributes.title : ""}
								</a>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</main>
<Footer />
