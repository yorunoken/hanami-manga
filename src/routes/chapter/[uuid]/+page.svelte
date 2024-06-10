<script lang="ts">
	import { getJSON } from "utils/request";
	import { page } from "$app/stores";
	import Header from "components/header.svelte";
	import { onMount } from "svelte";

	let chapterData: MangaChapterGet;
	let chapterImagesData: ChapterImageData;
	const uuid = $page.params.uuid;
	let loading = true;
	let fitHeight = true;

	onMount(async () => {
		chapterData = await getJSON(`chapter/${uuid}?includes[]=manga`);
		chapterImagesData = await getJSON(`at-home/server/${uuid}`);

		console.log(chapterData.data);

		loading = false;
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-950 text-white">
	<Header />
	{#if loading}
		<main class="flex min-h-screen justify-center bg-gray-900">
			<p>Loading data...</p>
		</main>
	{:else}
		<div class="bg-gray-900 px-6 py-4 text-center">
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
		<div class="flex-1 overflow-y-auto bg-gray-900">
			{#each chapterImagesData.chapter.data as imageData}
				<div class={`flex ${fitHeight ? "h-screen" : "w-screen"} my-2 items-center justify-center`}>
					<img
						alt="manga"
						src={`${chapterImagesData.baseUrl}/data/${chapterImagesData.chapter.hash}/${imageData}`}
						class={`${fitHeight ? "max-h-full" : "max-w-full"} object-contain`}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
