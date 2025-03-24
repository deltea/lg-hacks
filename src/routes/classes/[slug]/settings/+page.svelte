<script lang="ts">
  import type { PageProps } from "../$types";
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";

  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  let { data }: PageProps = $props();

  let name = $state(data.currentClass.name);
  let grade = $state(data.currentClass.grade);
  let period = $state(data.currentClass.period);
  let color = $state(data.currentClass.color);

  async function updateClass() {
    await supabase.from("classes").update({
      name,
      grade,
      period,
      color
    }).eq("id", data.currentClass.id);

    goto(`/classes/${data.currentClass.slug}`);
  }
</script>

<Nav currentClass={data.currentClass} />

<div class="flex grow gap-4">
  <Sidebar classes={data.classes} />

  <div class="grow bg-stone-800 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group flex flex-col">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">settings</h2>

    <div class="flex flex-col items-center justify-center grow">
      <form class="w-[40rem]" on:submit|preventDefault={updateClass}>
        <label for="name" class="text-stone-600">name</label>
        <input required type="text" id="name" name="name" class="w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" value={data.currentClass.name} />

        <label for="grade" class="text-stone-600">current grade</label>
        <input type="number" id="grade" name="grade" class="w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" min="0" value={data.currentClass.grade} />

        <label for="period" class="text-stone-600">period</label>
        <input type="number" id="period" name="period" class="w-full grow outline-none bg-stone-700 p-2 rounded-md mb-4" min="0" value={data.currentClass.period} />

        <label for="color" class="text-stone-600">color</label>
        <input type="color" id="color" name="color" class="w-full grow outline-none bg-stone-700 p-1 h-14 rounded-md mb-4" value={data.currentClass.color} />

        <button type="submit" class="bg-amber-600 font-bold px-4 py-2 rounded-md hover:cursor-pointer duration-200">update class</button>
      </form>
    </div>
  </div>
</div>
