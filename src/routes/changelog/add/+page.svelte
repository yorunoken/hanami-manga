<script lang="ts">
	import Footer from "components/footer.svelte";
	import Header from "components/header.svelte";
	import { Button, Label, Input } from "flowbite-svelte";

	export let data;

	let version: string | null = null;
	let date: string | null = null;
	let features: string | null = null;
	let bugs: string | null = null;
	let enhancements: string | null = null;

	async function handleSubmit() {
		const formData = {
			version,
			date,
			features,
			bugs,
			enhancements,
			id: 1
		};

		const changelogs = await fetch("/api/changelogs").then((res) => res.json());
		console.log(changelogs);

		fetch(`/api/changelogs/add?token=${data.cookie}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formData)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
</script>

<Header />
<main class="flex min-h-screen justify-center bg-gray-900">
	<div class="mx-auto max-w-4xl space-y-8 py-8">
		<div>
			<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Add Changelog Entry</h1>
			<p class="mt-2 text-center text-gray-500 dark:text-gray-400">
				Add a new entry to the changelog.
			</p>
			<div class="mt-4 space-y-6">
				<form class="grid gap-4" on:submit|preventDefault|once={handleSubmit}>
					<div class="grid gap-2">
						<Label for="version" class="mb-2 block text-base text-white">Version</Label>
						<Input
							id="version"
							class="border bg-gray-900"
							size="lg"
							placeholder="e.g. v1.5.0"
							bind:value={version}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="date" class="mb-2 block text-base text-white">Date</Label>
						<Input id="date" class="border bg-gray-900" size="lg" type="date" bind:value={date} />
					</div>
					<div class="grid gap-2">
						<Label for="features" class="mb-2 block text-base text-white">New Features</Label>
						<Input
							id="features"
							class="border bg-gray-900"
							size="lg"
							placeholder="List new features"
							bind:value={features}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="bugs" class="mb-2 block text-base text-white">Bug Fixes</Label>
						<Input
							id="bugs"
							size="lg"
							class="border bg-gray-900"
							placeholder="List bug fixes"
							bind:value={bugs}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="enhancements" class="mb-2 block text-base text-white">Enhancements</Label>
						<Input
							id="enhancements"
							size="lg"
							class="border bg-gray-900"
							placeholder="List enhancements"
							bind:value={enhancements}
						/>
					</div>
					<Button
						type="submit"
						class="justify-center bg-white p-2 px-6 text-black transition-colors hover:bg-gray-300 sm:justify-self-end"
						>Add Entry</Button
					>
				</form>
			</div>
		</div>
	</div>
</main>
<Footer />
