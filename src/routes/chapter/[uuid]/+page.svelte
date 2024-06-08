<script lang="ts">
	import { getJSON } from "utils/request";
	import { page } from "$app/stores";
	import Header from "components/header.svelte";
	import { onMount } from "svelte";

	let chapterData: MangaChapter;
	let chapterImagesData: ChapterImageData;
	const uuid = $page.params.uuid;
	let loading = true;

	onMount(async () => {
		chapterData = await getJSON(`chapter/${uuid}?includes[]=manga`);
		chapterImagesData = await getJSON(`at-home/server/${uuid}`);

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
			<div class="text-2xl font-bold">Naruto - Chapter 123</div>
		</div>
		<div class="flex-1 overflow-y-auto">
			{#each chapterImagesData.chapter.data as imageData}
				<div class="container mx-auto py-4">
					<img
						alt="manga"
						width="900"
						height="1000"
						src={`${chapterImagesData.baseUrl}/data/${chapterImagesData.chapter.hash}/${imageData}`}
						class="mx-auto rounded-md shadow-lg"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
