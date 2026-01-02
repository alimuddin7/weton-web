<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Weton Jawa Modern</title>
</svelte:head>

<div data-theme="luxury" class="min-h-screen">
	{@render children()}
</div>
