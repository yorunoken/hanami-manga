<script lang="ts">
	export let link: string;
	export let text: string;
</script>

<a
	href={link}
	class="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-semibold text-white shadow ring-2 ring-white transition-colors hover:bg-gray-800 focus-visible:outline-none"
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
		class="mr-2 h-5 w-5"
	>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
	</svg>
	{text}
</a>
