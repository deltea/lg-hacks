<script lang="ts">
	import "../app.css";
  import "iconify-icon";

	let { children } = $props();
</script>

<svelte:head>
  <title>loaf</title>
</svelte:head>

<div class="h-screen">
  {@render children()}
</div>
