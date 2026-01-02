<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { onMount } from "svelte";

	let { children } = $props();

	let theme = $state("luxury");

	onMount(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			theme = savedTheme;
		}
	});

	$effect(() => {
		const root = document.documentElement;
		root.setAttribute("data-theme", theme);
		document.body.setAttribute("data-theme", theme);
		if (theme === "luxury") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	});

	function toggleTheme() {
		theme = theme === "luxury" ? "cupcake" : "luxury";
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Weton Jawa Modern</title>
</svelte:head>

<div data-theme={theme} class="min-h-screen transition-colors duration-300">
	<div class="fixed top-4 right-4 z-50">
		<button
			class="btn btn-circle btn-ghost bg-base-200/80 backdrop-blur-md shadow-2xl border-2 border-primary/30 hover:border-primary/50 hover:scale-110 transition-all duration-300"
			onclick={toggleTheme}
			aria-label="Toggle Theme"
		>
			{#if theme === "luxury"}
				<!-- Sun Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 animate-pulse"
					style="color: #d4af37;"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
					/>
				</svg>
			{:else}
				<!-- Moon Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					style="color: #c1440e;"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			{/if}
		</button>
	</div>
	{@render children()}
</div>
