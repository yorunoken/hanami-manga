<script lang="ts">
	import { getJSON } from "utils/request";
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import MangaCards from "components/mangaCards.svelte";

	const mangasLimit = 5;

	let recentMangaData = getJSON(
		`manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${mangasLimit}`
	) as Promise<MangaSearchResponse>;

	let topRatedMangaData = getJSON(
		`manga?includes[]=cover_art&order[rating]=desc&limit=${mangasLimit}`
	) as Promise<MangaSearchResponse>;

	let topFollowedMangaData = getJSON(
		`manga?includes[]=cover_art&order[followedCount]=desc&limit=${mangasLimit}`
	) as Promise<MangaSearchResponse>;
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-6 py-10 md:px-10 dark:bg-gray-900">
		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Recently Updated Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/recent"> View All </a>
				</div>
				<MangaCards mangaLimit={mangasLimit} mangaData={recentMangaData} />
			</section>
		</div>

		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Top Rated Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/toprated"> View All </a>
				</div>
				<MangaCards mangaLimit={mangasLimit} mangaData={topRatedMangaData} />
			</section>
		</div>

		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Top Followed Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/topfollowed"> View All </a>
				</div>
				<MangaCards mangaLimit={mangasLimit} mangaData={topFollowedMangaData} />
			</section>
		</div>
	</main>
	<Footer />
</div>
