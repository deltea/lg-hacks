<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
  <title>Bread</title>
</svelte:head>

<div class="h-screen">
  {@render children()}
</div>
