<script lang="ts">
	import { getJSON } from "utils/request";
	import { page } from "$app/stores";
	import Footer from "components/footer.svelte";
	import Header from "components/header.svelte";
	import LeftButton from "components/chevronLeftIcon.svelte";
	import RightButton from "components/chevronRightIcon.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import Pagination from "components/chapterPagePagination.svelte";
	import { onMount } from "svelte";

	const uuid = $page.params.uuid;
	const chaptersPerPage = 40;

	let mangaData: MangaResponse;
	let chapterData: MangaChapterSearch;
	let currentPage = 1;
	let dummyChapters = Array.from({ length: chaptersPerPage }, (_, i) => 1 + i);

	async function fetchData() {
		mangaData = await getJSON(`manga/${uuid}?includes[]=cover_art`);
		chapterData = await getJSON(
			`chapter?manga=${uuid}&order[chapter]=desc&translatedLanguage[]=en&limit=${chaptersPerPage}&offset=${(currentPage - 1) * chaptersPerPage}`
		);
	}

	onMount(async () => {
		await fetchData();
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

<div class="flex min-h-[100dvh] flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-4 py-6 md:px-6 md:py-12 dark:bg-gray-900">
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
			{#if !mangaData || !chapterData}
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
						src={`http://localhost:8080/api/proxy-image?url=https://mangadex.org/covers/${mangaData.data.id}/${mangaData.data.relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
						width={400}
						height={500}
						alt="Manga Cover"
						class="rounded-md shadow-lg"
					/>
				</div>
				<div>
					<h1 class="mb-2 text-3xl font-bold">
						{mangaData.data.attributes.title.en ??
							mangaData.data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
							mangaData.data.attributes.title["ja-ro"] ??
							mangaData.data.attributes.title["ja"]}
					</h1>
					<div class="mb-4 flex flex-wrap gap-2">
						{#each mangaData.data.attributes.tags as tag}
							<div class="bg-primary-500 rounded-md border px-3 py-1 text-sm text-white">
								{tag.attributes.name.en}
							</div>
						{/each}
					</div>
					<p class="mb-6 text-gray-700 dark:text-gray-400">
						<SvelteMarkdown
							source={mangaData.data.attributes.description.en ?? "No description was provided."}
						/>
					</p>
					<div class="rounded-md bg-gray-200 p-4 dark:bg-gray-800">
						<div class="flex justify-between">
							<h2 class="mb-4 text-xl font-bold">Chapters</h2>
							<h2 class="mb-4 text-base">
								Page {currentPage}/{Math.ceil(chapterData.total / chaptersPerPage)}
							</h2>
						</div>
						<div class="flex justify-between rounded-md border">
							<ul class="mr-3 space-y-2 p-2">
								{#each chapterData.data.slice(0, 20) as chapter}
									<li>
										<a href={`/chapter/${chapter.id}`} class="text-primary-500 hover:underline">
											Chapter {chapter.attributes.chapter}
											{chapter.attributes.title ? " - " + chapter.attributes.title : ""}
										</a>
									</li>
								{/each}
							</ul>
							<ul class="ml-3 space-y-2 p-2">
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
