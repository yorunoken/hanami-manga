<script lang="ts">
	import { getJSON } from "utils/request";
	import { page } from "$app/stores";
	import Header from "components/header.svelte";
	import { onMount } from "svelte";

	let mangaData: MangaResponse;
	let chapterData: MangaChapterGet;
	let totalChaptersData: AggregateChapter;
	let chapterImagesData: ChapterImageData;

	$: chapterId = $page.params.uuid;
	let nextChapterId: string | undefined;

	let loading = true;
	let fitHeight = true;

	onMount(async () => {
		chapterData = await getJSON(`chapter/${chapterId}?includes[]=manga`);
		mangaData = await getJSON(
			`manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}?includes[]=cover_art`
		);

		totalChaptersData = await getJSON(
			`manga/${chapterData.data.relationships.find((relationship) => relationship.type === "manga")?.id}/aggregate?translatedLanguage[]=en`
		);

		chapterImagesData = await getJSON(`at-home/server/${chapterId}`);

		const volumesArray = Object.values(totalChaptersData.volumes);
		const allChapters = volumesArray.flatMap((volume) => Object.values(volume.chapters));
		let currentChapterIndex = allChapters.findIndex((chapter) => chapter.id === chapterId);

		nextChapterId = allChapters[currentChapterIndex + 1]?.id;

		loading = false;
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-950 text-white">
	<Header />
	{#if loading}
		<div class="bg-gray-900 px-6 py-4 text-center">
			<div class="text-2xl font-bold">Yomi Yori Chapter 34</div>
		</div>
		<div class="flex-1 overflow-y-auto bg-gray-900">
			<div class={`flex ${fitHeight ? "h-screen" : "w-screen"} my-2 items-center justify-center`}>
				<img alt="Loading..." class={`${fitHeight ? "max-h-full" : "max-w-full"} object-contain`} />
			</div>
		</div>
	{:else}
		<div class="border-b bg-gray-900 px-6 py-4 text-center">
			<div class="text-2xl font-bold">
				{chapterData.data.relationships.find((relationship) => relationship.type === "manga")
					?.attributes.title.en ??
					chapterData.data.relationships
						.find((relationship) => relationship.type === "manga")
						?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
					chapterData.data.relationships.find((relationship) => relationship.type === "manga")
						?.attributes.title["ja-ro"] ??
					chapterData.data.relationships.find((relationship) => relationship.type === "manga")
						?.attributes.title["ja"]}
				{chapterData.data.attributes.chapter}
				{chapterData.data.attributes.title ? " - " + chapterData.data.attributes.title : ""}
			</div>
		</div>
		<div class="flex-1 overflow-y-auto bg-gray-900 text-center">
			{#each chapterImagesData.chapter.data as imageData}
				<div class={`flex ${fitHeight ? "h-screen" : "w-screen"} my-2 items-center justify-center`}>
					<img
						alt="Loading..."
						src={`http://localhost:8080/api/proxy-image?url=${chapterImagesData.baseUrl}/data/${chapterImagesData.chapter.hash}/${imageData}`}
						class={`${fitHeight ? "max-h-full" : "max-w-full"} object-contain`}
					/>
				</div>
			{/each}
			<div class="flex justify-between">
				{#if !nextChapterId}
					<a
						href={`/title/${mangaData.data.id}`}
						class="w-full bg-orange-500 p-4 font-bold transition-colors hover:bg-orange-600"
					>
						Go Back To Title
					</a>
				{:else}
					<a
						href={`/chapter/${chapterId}`}
						class="w-full bg-orange-500 p-4 font-bold transition-colors hover:bg-orange-600"
					>
						Next Chapter
					</a>
				{/if}
			</div>
		</div>
	{/if}
</div>
