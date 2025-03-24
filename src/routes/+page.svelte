<script lang="ts">
  import type { PageProps } from "./$types";

  import Nav from "$lib/components/Nav.svelte";

  let { data }: PageProps = $props();
</script>

<Nav />

<div class="flex justify-center">
  <ul class="grid gap-4 grid-cols-3 w-[60rem]">
    {#each data.classes as slice (slice.id)}
      <li class="bg-stone-800 p-4 rounded-md group h-60 hover:cursor-pointer">
        <a href="/classes/{slice.slug}" class="w-full h-full flex-col block">
          <div class="flex items-center justify-between w-full">
            <span class="group-hover:underline">{slice.name}</span>
            <span class="text-stone-600">period {slice.period}</span>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>
