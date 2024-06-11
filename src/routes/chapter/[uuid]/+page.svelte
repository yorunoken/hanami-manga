<script lang="ts">
	import Header from "components/header.svelte";
	import BackButton from "components/backButton.svelte";

	let fitHeight = true;

	export let data;
</script>

<svelte:head>
	<title
		>hanamimanga | {data.manga.chapter.data.relationships.find(
			(relationship) => relationship.type === "manga"
		)?.attributes.title.en ??
			data.manga.chapter.data.relationships
				.find((relationship) => relationship.type === "manga")
				?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
			data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title["ja-ro"] ??
			data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title["ja"]} Chapter {data.manga.chapter.data.attributes.chapter}
		{data.manga.chapter.data.attributes.title
			? " - " + data.manga.chapter.data.attributes.title
			: ""}
	</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-950 text-white">
	<Header />
	<div class="flex items-center justify-center border-b bg-gray-900 px-6 py-4 text-center">
		<a href={`/title/${data.manga.info.data.id}`} class="mr-8">
			<BackButton />
		</a>
		<div>
			<h1 class="text-2xl font-bold">
				{data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
					?.attributes.title.en ??
					data.manga.chapter.data.relationships
						.find((relationship) => relationship.type === "manga")
						?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
					data.manga.chapter.data.relationships.find(
						(relationship) => relationship.type === "manga"
					)?.attributes.title["ja-ro"] ??
					data.manga.chapter.data.relationships.find(
						(relationship) => relationship.type === "manga"
					)?.attributes.title["ja"]}
			</h1>
			<p class="text-gray-500 dark:text-gray-400">
				Chapter {data.manga.chapter.data.attributes.chapter}
				{data.manga.chapter.data.attributes.title
					? " - " + data.manga.chapter.data.attributes.title
					: ""}
			</p>
		</div>
		<!-- <div class="text-2xl font-bold">
			{data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title.en ??
				data.manga.chapter.data.relationships
					.find((relationship) => relationship.type === "manga")
					?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
				data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
					?.attributes.title["ja-ro"] ??
				data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
					?.attributes.title["ja"]}
			{data.manga.chapter.data.attributes.chapter}
			{data.manga.chapter.data.attributes.title
				? " - " + data.manga.chapter.data.attributes.title
				: ""}
		</div> -->
	</div>
	<div class="flex-1 overflow-y-auto bg-gray-900 text-center">
		{#each data.manga.pageImages.chapter.data as imageData}
			<div class={`flex ${fitHeight ? "h-screen" : "w-screen"} my-2 items-center justify-center`}>
				<img
					alt="Loading..."
					src={`/api/proxy-image?url=${data.manga.pageImages.baseUrl}/data/${data.manga.pageImages.chapter.hash}/${imageData}`}
					class={`${fitHeight ? "max-h-full" : "max-w-full"} object-contain`}
				/>
			</div>
		{/each}
		<div class="flex justify-between">
			{#if !data.nextChapterId}
				<a
					href={`/title/${data.manga.info.data.id}`}
					class="w-full bg-orange-500 p-4 font-bold transition-colors hover:bg-orange-600"
				>
					Go Back To Title
				</a>
			{:else}
				<a
					href={`/chapter/${data.nextChapterId}`}
					class="w-full bg-orange-500 p-4 font-bold transition-colors hover:bg-orange-600"
				>
					Next Chapter
				</a>
			{/if}
		</div>
	</div>
</div>
