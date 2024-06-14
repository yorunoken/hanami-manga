<script lang="ts">
	import { goto } from "$app/navigation";

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

<header class="bg-gray-800 px-6 py-4 text-white md:px-10">
	<div class="container mx-auto flex items-center justify-between gap-8">
		<a class="text-lg font-semibold md:text-2xl md:font-bold" href="/"> hanamimanga </a>
		<div class="flex">
			<a
				href="/changelog"
				class="mr-4 inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
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
				>
					<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
					<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
					<path d="M12 11h4" />
					<path d="M12 16h4" />
					<path d="M8 11h.01" />
					<path d="M8 16h.01" />
				</svg>
				<div class="hidden md:flex">Changelog</div>
			</a>
			<a
				href="/history"
				class="mr-4 inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
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
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
				<div class="hidden md:flex">History</div>
			</a>
			<!-- <div class="relative">
				<button
					aria-label="Search Manga"
					on:click={searchManga}
					class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
						style="--darkreader-inline-stroke: currentColor;"
						data-darkreader-inline-stroke=""
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
				</button>
				<input
					class="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border-2 bg-gray-800 px-3 py-2 pl-10 pr-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Search manga..."
					type="search"
					bind:value={mangaName}
					on:keypress={handleKeyPress}
				/>
			</div> -->

			<div class="relative hidden w-full md:flex">
				<input
					type="search"
					placeholder="Search..."
					class="pr-10 sm:pr-8"
					bind:value={mangaName}
					on:keypress={handleKeyPress}
				/>
				<button
					on:click={searchManga}
					class="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-2"
				>
					<svg
						class="h-5 w-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
				</button>
			</div>
			<a href={`/search?q=${mangaName}`} class="ml-2 flex rounded-full md:hidden">
				<svg
					class="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
				<span class="sr-only">Search</span>
			</a>
		</div>
	</div>
</header>
