<script lang="ts">
	export let currentPage: number;
	export let totalChapters: number;
	export let setPage: (pageNumber: number) => void;

	const totalButtonsCount = 5;

	let totalPages = Math.ceil(totalChapters / 40);

	$: startPage = Math.max(
		1,
		Math.min(currentPage - Math.floor(totalButtonsCount / 2), totalPages - totalButtonsCount + 1)
	);
	$: endPage = Math.min(totalPages, startPage + totalButtonsCount - 1);

	$: totalButtons = Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index
	);
</script>

{#each totalButtons as index}
	<button
		on:click={() => setPage(index)}
		class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground [&amp;.active]:bg-gray-200 dark:[&amp;.active]:bg-gray-700 inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		class:border={currentPage === index}
	>
		{index}
	</button>
{/each}
