<script lang="ts">
  import "../app.css";
  import "iconify-icon";

  import Nav from "$lib/components/Nav.svelte";

	let { children } = $props();
</script>

<svelte:head>
  <title>loaf</title>
</svelte:head>

<main class="h-screen flex flex-col pl-4 pr-4 pb-4">
  {@render children()}
</main>
