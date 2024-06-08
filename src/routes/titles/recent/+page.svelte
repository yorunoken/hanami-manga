<script lang="ts">
	import { getJSON } from "utils/request";
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import Pagination from "components/pagination.svelte";
	import MangaCards from "components/mangaCards.svelte";
	import { page } from "$app/stores";

	let currentPage: number;
	$: currentPage = parseInt($page.url.searchParams.get("page") ?? "") || 1;

	const mangasLimit = 20;

	let recentMangaData: Promise<MangaSearchResponse>;
	$: recentMangaData = getJSON(
		`manga?includes[]=cover_art&order[latestUploadedChapter]=desc&limit=${mangasLimit}${currentPage === 1 ? "" : `&offset=${mangasLimit * (currentPage - 1) + 4}`}`
	) as Promise<MangaSearchResponse>;
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-6 py-10 md:px-10 dark:bg-gray-900">
		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-center">
					<h2 class="text-2xl font-bold">Recently Updated Manga</h2>
				</div>
				<div class="mb-8">
					<Pagination pageNumber={currentPage} mangaData={recentMangaData} />
				</div>

				<MangaCards mangaLimit={mangasLimit} mangaData={recentMangaData} />
			</section>
			<Pagination pageNumber={currentPage} mangaData={recentMangaData} />
		</div>
	</main>
	<Footer />
</div>
