<script lang="ts">
	import { goto } from "$app/navigation";

	let mangaName = "";
	let droppedDown = false;

	function searchManga() {
		goto(`/search?q=${mangaName}`);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			searchManga();
		}
	}
</script>

<header class="hidden bg-gray-800 px-6 py-4 text-white md:flex md:px-10">
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
				<div>Changelog</div>
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
			<a
				href="/favorites"
				class="mr-4 inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
			>
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
				<div class="hidden md:flex">Favorites</div>
			</a>

			<div class="flex items-center">
				<div class="relative flex-1 sm:block">
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
				<button
					on:click={searchManga}
					class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:hidden"
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
						class="h-5 w-5"
						style="--darkreader-inline-stroke: currentColor;"
						data-darkreader-inline-stroke=""
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</header>

{#if droppedDown}
	<header class="flex bg-gray-800 px-6 py-4 text-white md:hidden md:px-10">
		<div class="container mx-auto flex items-center justify-center gap-8">
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
				</a>
				<a
					href="/favorites"
					class="mr-4 inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
				>
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
				</a>
			</div>
		</div>
		<button
			on:click={() => {
				droppedDown = !droppedDown;
			}}
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
				<path d="m18 15-6-6-6 6" />
			</svg>
		</button>
	</header>
{:else}
	<header class="flex bg-gray-800 px-6 py-4 text-white md:hidden md:px-10">
		<div class="container mx-auto flex items-center justify-between gap-8">
			<a class="text-lg font-semibold md:text-2xl md:font-bold" href="/"> hanamimanga </a>
			<div class="flex items-center gap-4">
				<button
					on:click={() => {
						droppedDown = !droppedDown;
					}}
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
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>
				<button
					on:click={searchManga}
					class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
						class="h-5 w-5"
						style="--darkreader-inline-stroke: currentColor;"
						data-darkreader-inline-stroke=""
					>
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
				</button>
			</div>
		</div>
	</header>
{/if}
