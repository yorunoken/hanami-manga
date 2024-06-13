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
	<div class="container mx-auto flex items-center justify-between">
		<a class="text-2xl font-bold" href="/"> hanamimanga </a>
		<div class="flex">
			<a
				href="/changelog"
				class="mr-4 inline-flex items-center justify-center rounded-lg bg-[#55efc4] px-4 py-2 text-sm font-medium text-[#1e1e1e] transition-colors hover:bg-[#00b894]"
			>
				Changelog
			</a>
			<a
				href="/history"
				class="mr-4 inline-flex items-center justify-center rounded-lg bg-[#55efc4] px-4 py-2 text-sm font-medium text-[#1e1e1e] transition-colors hover:bg-[#00b894]"
			>
				History
			</a>
			<div class="relative">
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
					class="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 pl-10 pr-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Search manga..."
					type="search"
					bind:value={mangaName}
					on:keypress={handleKeyPress}
				/>
			</div>
		</div>
	</div>
</header>
