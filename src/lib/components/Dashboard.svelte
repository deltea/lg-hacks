<script lang="ts">
  import type { Tables } from "$lib/database.types";

  let { currentClass }: { currentClass: Tables<"classes"> } = $props();

  const todos = [
    { id: 1, text: "Learn Svelte" },
    { id: 2, text: "Learn TypeScript" },
    { id: 3, text: "Build something awesome" },
  ];
</script>

<div class="grow grid grid-cols-2 gap-4">
  <div class="bg-stone-800 row-start-1 col-start-1 col-end-3 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">assignments</h2>

    <ul class="flex flex-col gap-2 w-full">
      {#each todos as todo}
        <li class="flex items-center gap-4 w-full hover:bg-stone-700 px-3 py-2 rounded-md group/todo duration-200 hover:cursor-pointer">
          <input type="checkbox" id={todo.id.toString()} />
          <label for={todo.id.toString()} class="hover:cursor-pointer">
            <span>{todo.text}</span>
            <span class="text-stone-600 group-hover/todo:text-amber-600 duration-200">- 80% of grade</span>
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <div class="bg-stone-800 row-start-2 col-start-2 col-end-2 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">grade</h2>

    <h3 class="font-bold text-3xl flex gap-4">
      <span class="text-amber-600">A</span>
      <span> - {currentClass.grade}%</span>
    </h3>

    <span class="">passing</span>
  </div>

  <div class="bg-stone-800 row-start-2 col-start-1 col-end-1 rounded-md p-4 flex flex-col border-2 border-transparent hover:border-amber-600 duration-200 group">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">notes</h2>

    <textarea
      name="notes"
      id="notes"
      class="resize-none w-full grow outline-none"
      placeholder="put your notes here..."
    >{currentClass.notes}</textarea>
  </div>
</div>
