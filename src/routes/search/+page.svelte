<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import Pagination from "components/pagination.svelte";
	import MangaCards from "components/mangaCards.svelte";
	import { goto } from "$app/navigation";

	export let data;

	let mangaName = "";

	function searchManga() {
		goto(`/search?q=${mangaName}`);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			searchManga();
		}
	}
</script>

<svelte:head>
	<title>HanamiManga | Search ({data.searchQuery})</title>
	<meta name="description" content="Dive into exciting new anime!" />
	<meta name="keywords" content="manga, manga reader, HanamiManga, hanami, search" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-gray-100 px-6 py-10 md:px-10 dark:bg-gray-900">
		<div class="container mx-auto">
			<section class="mb-10">
				<div class="mb-4 flex flex-col items-center justify-center gap-y-4">
					<h2 class="text-2xl font-bold">Searching for manga: "{data.searchQuery}"</h2>
					<div class="relative flex-1">
						<button class="flex" on:click={searchManga}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400"
								style="--darkreader-inline-stroke: currentColor;"
								data-darkreader-inline-stroke=""
							>
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.3-4.3"></path>
							</svg>
						</button>
						<input
							bind:value={mangaName}
							on:keypress={handleKeyPress}
							class="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border-2 border-white bg-transparent px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50"
							placeholder="Search"
							type="search"
						/>
					</div>
				</div>
				<div class="mb-8">
					<Pagination pageNumber={data.currentPage} mangaData={data.manga.search} />
				</div>

				<MangaCards mangaLimit={data.limit} mangaData={data.manga.search} />
			</section>
			<Pagination pageNumber={data.currentPage} mangaData={data.manga.search} />
		</div>
	</main>
	<Footer />
</div>
