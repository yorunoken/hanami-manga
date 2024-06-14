<script lang="ts">
	import { saveMangaToFavorites, removeMangaFromFavorites, getFavorites } from "utils/favorites";

	export let mangaId: string;
	let manga:
		| {
				mangaId: string;
				updatedAt: string;
		  }
		| undefined;

	function updateManga() {
		manga = getFavorites().find((favorite) => favorite.mangaId === mangaId);
	}

	function saveManga() {
		saveMangaToFavorites(mangaId);
		updateManga();
	}

	function removeManga() {
		removeMangaFromFavorites(mangaId);
		updateManga();
	}

	$: updateManga();
</script>

<button
	on:click={manga ? removeManga : saveManga}
	class="inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white shadow ring-2 ring-white transition-colors hover:bg-gray-800 focus-visible:outline-none"
>
	{#if manga}
		<svg
			class="fill-red-500"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
			/>
			<path d="m12 13-1-1 2-2-3-3 2-2" />
		</svg>
	{:else}
		<svg
			class="fill-red-500"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
			/>
		</svg>
	{/if}
	<div>
		{manga ? "Unfavorite" : "Favorite"}
	</div>
</button>
