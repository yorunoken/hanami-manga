<script lang="ts">
	import { page } from "$app/stores";

	export let pageNumber: number;
	export let mangaData: Promise<MangaSearchResponse>;
	let loading = true;
	let totalManga = 0;
	let totalPages = 1;

	const totalButtonsCount = 5;

	(async () => {
		const data = await mangaData;
		totalManga = data.total;
		totalPages = Math.ceil(totalManga / 20);

		loading = false;
	})();

	$: startPage = Math.max(1, pageNumber - Math.floor(totalButtonsCount / 2));
	$: endPage =
		startPage === 1
			? Math.min(totalPages, 5)
			: Math.min(startPage + totalButtonsCount - 1, totalPages);

	$: totalButtons = Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index
	);

	function createPageUrl(page: number): string {
		const url = $page.url;
		url.searchParams.set("page", page.toString());
		return url.toString();
	}
</script>

<div class="flex justify-center">
	<nav aria-label="pagination" class="mx-auto flex w-full justify-center">
		<ul class="flex flex-row items-center gap-1">
			{#if !loading}
				{#if pageNumber > 1}
					<li>
						<a
							class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pl-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							aria-label="Go to previous page"
							href={createPageUrl(pageNumber - 1)}
						>
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
								class="lucide lucide-chevron-left h-4 w-4"
							>
								<path d="m15 18-6-6 6-6"></path>
							</svg>
							<span>Previous</span>
						</a>
					</li>
				{/if}
				{#each totalButtons as currentPageButton}
					<li>
						<a
							class={`ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md ${pageNumber === currentPageButton ? "border" : ""} text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
							href={createPageUrl(currentPageButton)}
						>
							{currentPageButton}
						</a>
					</li>
				{/each}
				{#if pageNumber < totalPages}
					<li>
						<a
							class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2 pl-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							aria-label="Go to next page"
							href={createPageUrl(pageNumber + 1)}
						>
							<span>Next</span>
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
								class="lucide lucide-chevron-right h-4 w-4 rotate-180 transform"
							>
								<path d="m15 18-6-6 6-6"></path>
							</svg>
						</a>
					</li>
				{/if}
			{/if}
		</ul>
	</nav>
</div>
