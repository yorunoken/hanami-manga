<script lang="ts">
	import TempCard from "components/tempMangaCard.svelte";

	export let mangaLimit: number;
	export let mangaData: Promise<MangaSearchResponse>;

	let times = Array.from({ length: mangaLimit });
</script>

<div class="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5">
	{#await mangaData}
		{#each times as _}
			<TempCard />
		{/each}
	{:then mangaData}
		{#each mangaData.data as manga}
			<a
				class="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:[scale:1.02] dark:bg-gray-800"
				href={`/title/${manga.id}`}
			>
				<img
					src={`/api/proxy-image?url=https://mangadex.org/covers/${manga.id}/${manga.relationships.find((relationship) => relationship.type === "cover_art")?.attributes.fileName}`}
					alt="Manga Cover"
					width="150"
					height="225"
					class="aspect-[3/3] w-full rounded-t-md object-cover"
				/>
				<div class="p-4">
					<h3 class="mb-2 text-lg font-bold">
						{manga.attributes.title.en ??
							manga.attributes.altTitles?.filter((altTitle) => altTitle.en)[0].en ??
							manga.attributes.title["ja-ro"] ??
							manga.attributes.title["ja"]}
					</h3>
					<p>
						{manga.attributes.description.en && manga.attributes.description.en.length > 45
							? `${manga.attributes.description.en.slice(0, 45)}...`
							: ""}
					</p>
				</div>
			</a>
		{/each}
	{/await}
</div>
