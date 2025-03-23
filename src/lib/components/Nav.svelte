<script lang="ts">
  import type { Tables } from "$lib/database.types";
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";

  let { currentClass }: {
    currentClass?: Tables<"classes">
  } = $props();

  onMount(async () => {
    console.log((await supabase.auth.getUser()).data.user?.user_metadata.avatar_url);
  });
</script>

<nav class="flex items-center h-16 px-3">
  <span class="flex items-center gap-2">
    <a href="/" class="font-bold hover:underline flex gap-2">
      <iconify-icon icon="tabler:bread-filled" class="text-xl mt-0.5 text-amber-600"></iconify-icon>
      <span>loaf</span>
    </a>
    <iconify-icon icon="line-md:chevron-small-right" class="text-2xl"></iconify-icon>
    <a href="/home" class="hover:underline">home</a>

    {#if currentClass}
      <iconify-icon icon="line-md:chevron-small-right" class="text-2xl"></iconify-icon>
      <a href="/home" class="hover:underline">{currentClass.name}</a>
    {/if}
  </span>

  <div class="flex items-center gap-4 grow justify-end">
    <a href="/settings" class="flex justify-center items-center" aria-label="Settings">
      <iconify-icon icon="mingcute:settings-3-fill" class="text-2xl"></iconify-icon>
    </a>
  </div>
</nav>
