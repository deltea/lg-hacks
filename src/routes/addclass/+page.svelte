<script lang="ts">
  import { goto } from "$app/navigation";
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { supabase } from "$lib/supabase";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let name = $state("");
  let grade = $state(100);
  let notes = $state("");

  async function addClass() {
    const slug = name.toLowerCase().replace(/\s/g, "-");
    await supabase.from("classes").insert([{
      name, grade, notes, slug,
    }]);

    goto(`/classes/${slug}`);
  }
</script>

<Nav />

<div class="flex grow gap-4">
  <Sidebar classes={data.classes} />

  <div class="grow bg-stone-800 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group flex flex-col">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">add a class</h2>

    <div class="flex flex-col items-center justify-center grow">
      <form class="w-[40rem]" on:submit|preventDefault={addClass}>
        <label for="name" class="text-stone-600">name</label>
        <input required type="text" id="name" name="name" class="w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" bind:value={name} />

        <label for="grade" class="text-stone-600">current grade</label>
        <input type="number" id="grade" name="grade" class="w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" min="0" bind:value={grade} />

        <label for="notes" class="text-stone-600">notes</label>
        <textarea name="notes" id="notes" class="resize-none w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" placeholder="put your notes here..." bind:value={notes}></textarea>

        <button type="submit" class="bg-amber-600 font-bold p-2 rounded-md hover:cursor-pointer duration-200">add class</button>
      </form>
    </div>
  </div>
</div>
