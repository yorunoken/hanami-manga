<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import MangaCards from "components/mangaCards.svelte";

	export let data;
</script>

<header>
	<title>hanamimanga | Home</title>
</header>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-6 py-10 md:px-10 dark:bg-gray-900">
		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Recently Updated Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/recent"> View All </a>
				</div>
				<MangaCards mangaLimit={data.limit} mangaData={data.manga.recent} />
			</section>
		</div>

		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Top Rated Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/toprated"> View All </a>
				</div>
				<MangaCards mangaLimit={data.limit} mangaData={data.manga.topRated} />
			</section>
		</div>

		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold">Top Followed Manga</h2>
					<a class="text-blue-500 hover:underline" href="/titles/topfollowed"> View All </a>
				</div>
				<MangaCards mangaLimit={data.limit} mangaData={data.manga.topFollowed} />
			</section>
		</div>
	</main>
	<Footer />
</div>
