<script lang="ts">
	import Header from "components/header.svelte";
	import BackButton from "components/backButton.svelte";

	// let fitHeight = true;

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

	<meta
		name="description"
		content={data.manga.info.data.attributes.description.en ?? "No description was provided."}
	/>
	<meta
		name="keywords"
		content={`manga, manga reader, hanamimanga, hanami, ${
			data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title.en ??
			data.manga.chapter.data.relationships
				.find((relationship) => relationship.type === "manga")
				?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
			data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title["ja-ro"] ??
			data.manga.chapter.data.relationships.find((relationship) => relationship.type === "manga")
				?.attributes.title["ja"]
		} ${data.manga.chapter.data.attributes.chapter}
				${
					data.manga.chapter.data.attributes.title
						? " - " + data.manga.chapter.data.attributes.title
						: ""
				}`}
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 dark:bg-gray-900">
		<div class="mx-auto flex justify-center p-6">
			<div class="mb-4 flex items-center">
				<a href={`/title/${data.manga.info.data.id}`} class="mr-8">
					<BackButton />
				</a>
				<div>
					<h1 class="text-2xl font-bold">
						{data.manga.chapter.data.relationships.find(
							(relationship) => relationship.type === "manga"
						)?.attributes.title.en ??
							data.manga.chapter.data.relationships
								.find((relationship) => relationship.type === "manga")
								?.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
							data.manga.chapter.data.relationships.find(
								(relationship) => relationship.type === "manga"
							)?.attributes.title[" ja-ro"] ??
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
			</div>
		</div>
		{#each data.manga.pageImages.chapter.data as imageData}
			<div class="manga-image mx-auto rounded-lg bg-white py-1 shadow-md dark:bg-gray-900">
				<img
					alt="Loading..."
					src={`/api/proxy-image?url=${data.manga.pageImages.baseUrl}/data/${data.manga.pageImages.chapter.hash}/${imageData}`}
					class="h-auto w-full"
				/>
			</div>
		{/each}
		<div class="flex justify-between text-center">
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
	</main>
</div>

<style>
	@media (min-width: 640px) {
		.manga-image {
			max-width: 100%;
		}
	}

	@media (min-width: 768px) {
		.manga-image {
			max-width: 75%;
		}
	}

	@media (min-width: 1024px) {
		.manga-image {
			max-width: 50%;
		}
	}
</style>
