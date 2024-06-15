<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
	import FavoriteCard from "components/favoriteCard.svelte";
	import { getFavorites } from "utils/favorites";
	import { onMount } from "svelte";

	let manga: MangaSearchResponse;
	let loading = true;

	onMount(async () => {
		const favorites = getFavorites()
			.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
			.slice(0, 99);

		const mangaIds = favorites.map((fav) => fav.mangaId);

		let mangaIdsFormatted = favorites.map((read) => `ids[]=${read.mangaId}&includes[]=cover_art`);

		if (mangaIdsFormatted.length > 0) {
			manga = await fetch(`/api/proxy-manga?${mangaIdsFormatted.join("&")}`).then((res) =>
				res.json()
			);

			manga.data = manga.data.sort((a, b) => mangaIds.indexOf(a.id) - mangaIds.indexOf(b.id));
		}

		loading = false;
	});
</script>

<Header />
<main class="flex min-h-screen justify-center bg-gray-900">
	<div class="container mx-auto px-4 py-8 md:px-6">
		<h1 class="mb-6 text-center text-2xl font-bold">Your Favorited Manga</h1>
		{#if loading}
			<h2>Loading...</h2>
		{:else if !manga}
			<h2>You have no favorited manga!</h2>
		{:else}
			<div class="grid gap-6">
				{#if !loading}
					{#each manga.data as data}
						<div class="flex items-start rounded-lg bg-gray-800 p-4">
							<img
								src={`/api/proxy-image?url=https://mangadex.org/covers/${data.id}/${data.relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
								alt="Manga Cover"
								width={150}
								height={150}
								class="mr-4 flex-shrink-0 rounded-lg"
							/>
							<div class="flex-1">
								<div class="mb-2 flex items-center justify-between">
									<a href={`/title/${data.id}`} class="text-xl font-bold hover:underline">
										{data.attributes.title.en ??
											data.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
											data.attributes.title["ja-ro"] ??
											data.attributes.title["ja"]}
									</a>
								</div>
								<p class="text-sm text-gray-300">
									{data.attributes.description.en ?? "No description was provided."}
								</p>
								<div class="mt-2">
									<FavoriteCard mangaId={data.id} />
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</main>
<Footer />
