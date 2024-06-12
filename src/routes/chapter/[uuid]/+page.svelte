<script lang="ts">
	import Header from "components/header.svelte";
	import BackButton from "components/backButton.svelte";
	import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
	import { ChevronDownOutline } from "flowbite-svelte-icons";
	// import MangaSidePanel from "components/mangaSidePanel.svelte";

	// let fitHeight = true;

	export let data;
	let showPanel = false;

	function handlePress(event: any) {
		const boundingBox = event.currentTarget.getBoundingClientRect();

		const clickX = event.clientX - boundingBox.left;
		const width = boundingBox.width;

		if (clickX < width / 6) {
			handleLeftPress();
		} else if (clickX > (2 * width) / 2.3) {
			handleRightPress();
		} else {
			handleMiddlePress();
		}
	}

	function handleMiddlePress() {
		showPanel = !showPanel;
	}

	function handleRightPress() {
		console.log("right");
	}

	function handleLeftPress() {
		console.log("left");
	}
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

<div
	class={`fixed right-0 top-0 z-50 h-full cursor-auto overflow-auto bg-white shadow-lg md:w-72 md:border-l ${showPanel ? "translate-x-0" : "translate-x-full"} transition-all dark:bg-gray-800`}
	on:click={(event) => {
		if (event?.target?.tagName === "DIV") {
			handleMiddlePress();
		}
	}}
	on:keydown={() => {}}
	role="button"
	tabindex="0"
>
	<button
		on:click={handleMiddlePress}
		class="absolute right-0 p-4 py-2 text-3xl text-red-500 hover:text-red-700"
	>
		&times;
	</button>
	<div class="p-6 py-8">
		<div class="flex items-center gap-4">
			<div>
				<a class="text-2xl font-semibold" href={`/title/${data.manga.info.data.id}`}>
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
				</a>
				<p class="text-base text-gray-500 dark:text-gray-400">
					Chapter {data.manga.chapter.data.attributes.chapter}
					{data.manga.chapter.data.attributes.title
						? " - " + data.manga.chapter.data.attributes.title
						: ""}
				</p>
			</div>
		</div>
		<p class="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
			{data.manga.info.data.attributes.description.en &&
			data.manga.info.data.attributes.description.en.length > 200
				? `${data.manga.info.data.attributes.description.en.slice(0, 200)}...`
				: data.manga.info.data.attributes.description.en ?? ""}
		</p>
		<div class="mt-6 flex justify-center rounded-lg border p-2">
			<Button
				>Chapter {data.manga.chapter.data.attributes.chapter}
				{data.manga.chapter.data.attributes.title
					? " - " + data.manga.chapter.data.attributes.title
					: ""}<ChevronDownOutline class="ms-2 text-black dark:text-white" /></Button
			>
			<Dropdown class="h-48 w-48 overflow-y-auto bg-gray-950 p-3 py-1 text-white">
				{#each data.allChapters as chapter}
					<div
						class={`rounded-lg ${data.uuid === chapter.id ? "border" : ""} hover:bg-gray-100 dark:hover:bg-gray-600`}
					>
						<a href={`/chapter/${chapter.id}`}>
							<DropdownItem>Chapter {chapter.chapter}</DropdownItem>
						</a>
					</div>
				{/each}
			</Dropdown>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-4">
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-400">Author</p>
				<p class="font-medium">
					{data.manga.info.data.relationships.find((relationship) => relationship.type === "artist")
						?.attributes.name}
				</p>
			</div>
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-400">Chapters</p>
				<p class="font-medium">{data.allChapters.length}</p>
			</div>
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
				<p class="font-medium">{data.manga.info.data.attributes.status}</p>
			</div>
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-400">Published</p>
				<p class="font-medium">2009 - 2021</p>
			</div>
		</div>
	</div>
</div>

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
		<div class="flex flex-col items-center justify-center">
			{#each data.manga.pageImages.chapter.data as imageData}
				<div
					role="button"
					tabindex="0"
					on:click={handlePress}
					on:keydown={() => {}}
					class="flex max-w-[100vw] flex-col py-1 md:max-w-[75vw] lg:max-w-[50vw]"
				>
					<img
						alt="Loading..."
						src={`/api/proxy-image?url=${data.manga.pageImages.baseUrl}/data/${data.manga.pageImages.chapter.hash}/${imageData}`}
						class="h-auto w-full"
					/>
				</div>
			{/each}
		</div>
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
			max-width: 50vh;
		}
	}

	@media (min-width: 768px) {
		.manga-image {
			max-width: 68vh;
		}
	}

	@media (min-width: 1024px) {
		.manga-image {
			max-width: 85vh;
		}
	}
</style>
