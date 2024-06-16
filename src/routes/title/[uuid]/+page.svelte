<script lang="ts">
	import { page } from "$app/stores";
	import Footer from "components/footer.svelte";
	import Header from "components/header.svelte";
	import LeftButton from "components/chevronLeftIcon.svelte";
	import RightButton from "components/chevronRightIcon.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import Pagination from "components/chapterPagePagination.svelte";
	import ReadCard from "components/readCard.svelte";
	import FavoriteCard from "components/favoriteCard.svelte";
	import { getReadChapters } from "utils/history.js";
	import { onMount } from "svelte";

	export let data;

	const uuid = $page.params.uuid;
	const chaptersPerPage = 40;
	let readData: { chapterUuid: string; mangaId: string; updatedAt: string } | undefined;

	let chapterData: MangaChapterSearch;

	let currentPage = 1;
	let dummyChapters = Array.from({ length: chaptersPerPage }, (_, i) => 1 + i);

	async function fetchData() {
		chapterData = await fetch(
			`/api/proxy-chapter?manga=${uuid}&order[chapter]=desc&translatedLanguage[]=en&limit=${chaptersPerPage}&offset=${(currentPage - 1) * chaptersPerPage}`
		).then((res) => res.json());
	}

	onMount(async () => {
		await fetchData();
		readData = getReadChapters().find((g) => g.mangaId === data.manga.data.id);
		console.log(readData);
	});

	function incrementPage() {
		currentPage++;
		fetchData();
	}

	function decrementPage() {
		currentPage--;
		fetchData();
	}

	function setPage(pageNumber: number) {
		currentPage = pageNumber;
		fetchData();
	}
</script>

<svelte:head>
	<title
		>HanamiManga | {data.manga.data.attributes.title.en ??
			data.manga.data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
			data.manga.data.attributes.title["ja-ro"] ??
			data.manga.data.attributes.title["ja"]}</title
	>
	<meta
		name="description"
		content={data.manga.data.attributes.description.en ?? "No description was provided."}
	/>
	<meta
		name="keywords"
		content={`manga, manga reader, HanamiManga, hanami, ${
			data.manga.data.attributes.title.en ??
			data.manga.data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
			data.manga.data.attributes.title["ja-ro"] ??
			data.manga.data.attributes.title["ja"]
		}`}
	/>
</svelte:head>

<div class="flex min-h-[100dvh] flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-4 py-6 md:px-6 md:py-12 dark:bg-gray-900">
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
			{#if !data.manga || !chapterData}
				<div>
					<img width={400} height={500} alt="Manga Cover" class="rounded-md shadow-lg" />
				</div>
				<div>
					<h1 class="mb-2 text-3xl font-bold">Yomi Yori</h1>
					<div class="mb-4 flex flex-wrap gap-2">
						<div class="bg-primary-500 rounded-md border px-3 py-1 text-sm text-white">Yuri</div>
					</div>
					<p class="mb-6 text-gray-700 dark:text-gray-400">Yuri girls mm</p>
					<div class="rounded-md bg-gray-200 p-4 dark:bg-gray-800">
						<h2 class="mb-4 text-xl font-bold">Chapters</h2>
						<div class="flex justify-between">
							<ul class="space-y-2">
								{#each dummyChapters.slice(0, 20) as chapter}
									<li>
										<p class="text-primary-500 hover:underline">
											Chapter {chapter}
										</p>
									</li>
								{/each}
							</ul>
							<ul class="space-y-2">
								{#each dummyChapters.slice(20, 40) as chapter}
									<li>
										<p class="text-primary-500 hover:underline">
											Chapter {chapter}
										</p>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{:else}
				<div>
					<img
						src={`/api/proxy-image?url=https://mangadex.org/covers/${data.manga.data.id}/${data.manga.data.relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
						width={400}
						height={500}
						alt="Manga Cover"
						class="rounded-md shadow-lg"
					/>
				</div>
				<div>
					<h1 class="mb-2 text-3xl font-bold">
						{data.manga.data.attributes.title.en ??
							data.manga.data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
							data.manga.data.attributes.title["ja-ro"] ??
							data.manga.data.attributes.title["ja"]}
					</h1>
					<div class="mb-4 flex flex-wrap gap-2">
						{#each data.manga.data.attributes.tags as tag}
							<div class="bg-primary-500 rounded-md border px-3 py-1 text-sm text-white">
								{tag.attributes.name.en}
							</div>
						{/each}
					</div>
					<p class="text-gray-700 dark:text-gray-400">
						<SvelteMarkdown
							source={data.manga.data.attributes.description.en ?? "No description was provided."}
						/>
					</p>
					{#if chapterData.data.length > 0}
						<div class="my-2 flex justify-center gap-4">
							<ReadCard
								link={readData
									? `/chapter/${readData.chapterUuid}`
									: `/chapter/${chapterData.data[0].id}`}
								text={readData ? "Continue Reading" : "Start Reading"}
							/>
							<FavoriteCard mangaId={data.manga.data.id} />
						</div>
						<div class="rounded-md bg-gray-200 p-4 dark:bg-gray-800">
							<div class="flex justify-between">
								<h2 class="mb-4 text-xl font-bold">Chapters</h2>
								<h2 class="mb-4 text-base">
									Page {currentPage}/{Math.ceil(chapterData.total / chaptersPerPage)}
								</h2>
							</div>
							<div class="flex justify-between rounded-md border">
								<ul class="w-1/2 space-y-2 p-2">
									{#each chapterData.data.slice(0, 20) as chapter}
										<li>
											<a href={`/chapter/${chapter.id}`} class="text-primary-500 hover:underline">
												Chapter {chapter.attributes.chapter}
												{chapter.attributes.title ? " - " + chapter.attributes.title : ""}
											</a>
										</li>
									{/each}
								</ul>
								<ul class="w-1/2 space-y-2 p-2">
									{#each chapterData.data.slice(20, 40) as chapter}
										<li>
											<a href={`/chapter/${chapter.id}`} class="text-primary-500 hover:underline">
												Chapter {chapter.attributes.chapter}
												{chapter.attributes.title ? " - " + chapter.attributes.title : ""}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{:else}
						<div class="rounded-md bg-gray-200 p-4 dark:bg-gray-800">
							<div class="flex justify-between">
								<h2 class="mb-4 text-xl font-bold">Chapters</h2>
							</div>
							<div class="flex justify-between rounded-md">No chapters.</div>
						</div>
					{/if}
					<div class="mt-4 flex items-center justify-center space-x-2">
						{#if currentPage > 1}
							<LeftButton on:click={decrementPage} />
						{/if}
						<Pagination {currentPage} totalChapters={chapterData.total} {setPage} />
						{#if currentPage < Math.ceil(chapterData.total / chaptersPerPage)}
							<RightButton on:click={incrementPage} />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</main>
	<Footer />
</div>
