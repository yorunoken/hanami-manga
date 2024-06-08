<script lang="ts">
	import { getJSON } from "utils/request";
	import { page } from "$app/stores";
	import Footer from "components/footer.svelte";
	import Header from "components/header.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import { onMount } from "svelte";

	const uuid = $page.params.uuid;

	let mangaData: MangaResponse;
	let chapterData: MangaChapter;

	onMount(async () => {
		mangaData = await getJSON(`manga/${uuid}?includes[]=cover_art`);
		chapterData = await getJSON(
			`chapter?manga=${uuid}&order[chapter]=desc&translatedLanguage[]=en&limit=100`
		);
	});
</script>

<div class="flex min-h-[100dvh] flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-4 py-6 md:px-6 md:py-12 dark:bg-gray-900">
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
			{#if !mangaData || !chapterData}
				<p>waiting</p>
			{:else}
				<div>
					<img
						src={`https://mangadex.org/covers/${mangaData.data.id}/${mangaData.data.relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
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
						<h2 class="mb-4 text-xl font-bold">Chapters</h2>
						<ul class="space-y-2">
							{#each chapterData.data as chapter}
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
			{/if}
		</div>
	</main>
	<Footer />
</div>
