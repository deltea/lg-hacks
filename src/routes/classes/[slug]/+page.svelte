<script lang="ts">
  import Dashboard from "$lib/components/Dashboard.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Nav currentClass={data.currentClass} />

<div class="flex grow gap-4">
  <Sidebar classes={data.classes} />

  <Dashboard currentClass={data.currentClass} />
</div>
