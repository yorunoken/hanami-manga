<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import Pagination from "components/pagination.svelte";
	import MangaCards from "components/mangaCards.svelte";

	export let data;
</script>

<svelte:head>
	<title>hanamimanga | Recent Manga</title>
	<meta name="description" content="Dive into exciting new manga!" />
	<meta name="keywords" content="manga, manga reader, hanamimanga, hanami, recent" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-6 py-10 md:px-10 dark:bg-gray-900">
		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-center">
					<h2 class="text-2xl font-bold">Recently Updated Manga</h2>
				</div>
				<div class="mb-8">
					<Pagination pageNumber={data.page} mangaData={data.manga.recent} />
				</div>

				<MangaCards mangaLimit={data.limit} mangaData={data.manga.recent} />
			</section>
			<Pagination pageNumber={data.page} mangaData={data.manga.recent} />
		</div>
	</main>
	<Footer />
</div>
