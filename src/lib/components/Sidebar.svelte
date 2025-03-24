<script lang="ts">
  import type { Tables } from "$lib/database.types";

  let { classes }: { classes: Tables<"classes">[] } = $props();
</script>

<div class="w-72 flex flex-col bg-stone-800 rounded-md border-2 border-transparent hover:border-amber-600 group duration-200">
  <h2 class="text-stone-600 font-bold px-4 pt-4 group-hover:text-amber-600 duration-200">classes</h2>

  <div class="flex flex-col gap-4 p-6 grow">
    {#each classes as c}
      <a href="/classes/{c.slug}" class="flex items-center gap-2 group/class">
        <!-- <iconify-icon icon="mingcute:play-circle-fill" class="text-xl"></iconify-icon> -->
        <span class="group-hover/class:underline">{c.name}</span>
        <span class="text-stone-600">{c.period}</span>
      </a>
    {/each}
  </div>

  <a href="/addclass" class="flex items-center gap-2 p-6 hover:bg-stone-700 rounded-b-md duration-200">
    <iconify-icon icon="mingcute:add-fill" class="text-xl"></iconify-icon>
    <span>add a class</span>
  </a>
</div>
