<script lang="ts">
	import Header from "components/header.svelte";
	import Footer from "components/footer.svelte";
</script>

<svelte:head>
	<title>HanamiManga | About</title>
	<meta name="description" content="About us." />
	<meta name="keywords" content="manga, manga reader, HanamiManga, about" />
</svelte:head>

<Header />
<main class="flex min-h-screen justify-center bg-gray-900">
	<div class="container mx-auto px-4 py-10 text-white md:px-0">
		<h1 class="mb-4 text-3xl font-bold">About HanamiManga</h1>
		<p class="mb-6">
			Hello all, I'm yorunoken, the fella who made this website.<br />
			The website *should* be open source by the time you're reading this, so scroll a little down and
			click on the GitHub link on the bottom right to see the source code! <br />
			I'm self hosting because I like doing stuff on my own =) If you would like to donate, that would
			be great. I will let everyone know when I have donation links.
		</p>
		<p class="mb-6">
			I would be very grateful if you check out my other projects: <br />
			<a href="https://fun.yorunoken.com" target="_blank" class="text-yellow-100">fun api</a>,
			<a href="https://hanami.yorunoken.com" target="_blank" class="text-blue-600">hanami bot</a>
		</p>
	</div>
</main>
<Footer />
