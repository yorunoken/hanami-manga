<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";

	export let data;
</script>

<div class="flex min-h-dvh flex-col bg-gray-900">
	<Header />
	<main class="flex-1 py-12 md:py-24 lg:py-32">
		<div class="container px-4 md:px-6">
			<div class="mx-auto max-w-4xl space-y-8">
				<div>
					<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Changelog</h1>
					<p class="mt-2 text-gray-500 dark:text-gray-400">See what's new in our latest updates.</p>
				</div>
				{#await data.changelogs}
					<p>Waiting..</p>
				{:then changelogs}
					{#if changelogs.data.length === 0}
						<p class="text-base text-gray-400 dark:text-gray-200">
							It seems like there are no changelogs at this time. Check in later!
						</p>
					{:else}
						{#each changelogs.data as changelog}
							<div class="space-y-6">
								<div class="grid gap-4">
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-2">
											<div
												class="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800"
											>
												{changelog.version}
											</div>
											<p class="text-sm text-gray-500 dark:text-gray-400">
												{new Date(`${changelog.date}`).toLocaleDateString("en-US", {
													month: "long",
													day: "numeric",
													year: "numeric"
												})}
											</p>
										</div>
									</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">
										<ul class="space-y-2">
											{#if changelog.features.length > 0}
												<li>
													<span class="font-medium text-gray-900 dark:text-gray-50"
														>New Features:</span
													>
													{changelog.features}
												</li>
											{/if}
											{#if changelog.bugs.length > 0}
												<li>
													<span class="font-medium text-gray-900 dark:text-gray-50">Bug Fixes:</span
													>
													{changelog.bugs}
												</li>
											{/if}
											{#if changelog.enhancements.length > 0}
												<li>
													<span class="font-medium text-gray-900 dark:text-gray-50"
														>Enhancements:</span
													>
													{changelog.enhancements}
												</li>
											{/if}
										</ul>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				{/await}
			</div>
		</div>
	</main>
	<Footer />
</div>
