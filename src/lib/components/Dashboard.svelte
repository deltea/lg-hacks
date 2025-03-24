<script lang="ts">
  import type { Tables, TablesInsert, TablesUpdate } from "$lib/database.types";
  import { supabase } from "$lib/supabase";

  let assignmentName: string = $state("");
  let assignmentGrade: number | null = $state(null);

  let { currentClass, assignments: loadedAssignments }: {
    currentClass: Tables<"classes">,
    assignments: Tables<"assignments">[],
  } = $props();
  let assignments: Tables<"assignments">[] = $derived(loadedAssignments);

  async function addAssignment() {
    assignments = [
      ...assignments,
      {
        created_at: new Date().toISOString(),
        id: assignments.length + 1,
        name: assignmentName,
        grade: assignmentGrade,
        class: currentClass.id,
        finished: false
      }
    ];

    await supabase.from("assignments").insert({
      name: assignmentName,
      grade: assignmentGrade,
      class: currentClass.id
    } satisfies TablesInsert<"assignments">);

    assignmentName = "";
    assignmentGrade = null;
  }

  async function updateAssignment(assignment: Tables<"assignments">, finished: boolean) {
    await supabase.from("assignments").update({ finished: finished }).eq("id", assignment.id);
  }
</script>

<div class="grow grid grid-cols-2 grid-rows-3 gap-4">
  <div class="bg-stone-800 row-start-1 row-end-3 col-start-1 col-end-3 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group flex flex-col h-full">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">assignments</h2>

    <ul class="flex flex-col gap-2 w-full grow">
      {#if assignments.length === 0}
        <li class="text-stone-600">no assignments</li>
      {:else}
        {#each assignments as assignment}
          <li class="flex items-center gap-4 w-full hover:bg-stone-700 px-3 py-2 rounded-md group/todo duration-200 hover:cursor-pointer">
            <input
              checked={assignment.finished}
              on:change={(e: Event) => updateAssignment(assignment, (e.target as HTMLInputElement).checked)}
              type="checkbox"
              id={assignment.id.toString()}
            />
            <label for={assignment.id.toString()} class="hover:cursor-pointer">
              <span>{assignment.name}</span>
              {#if assignment.grade}
                <span class="text-stone-600 group-hover/todo:text-amber-600 duration-200">- {assignment.grade}% of grade</span>
              {/if}
            </label>
          </li>
        {/each}
      {/if}
    </ul>

    <form on:submit|preventDefault={addAssignment} class="flex items-center gap-3 mt-4">
      <input required type="text" placeholder="assignment name" bind:value={assignmentName} class="w-full p-2 rounded-md outline-none group bg-stone-700" />
      <input type="number" placeholder="% grade" bind:value={assignmentGrade} class="w-32 p-2 rounded-md outline-none group bg-stone-700" />
      <button type="submit" class="py-2 px-4 bg-amber-600 text-stone-100 rounded-md duration-200 group">add</button>
    </form>
  </div>

  <div class="bg-stone-800 row-start-3 col-start-2 col-end-2 rounded-md p-4 border-2 border-transparent hover:border-amber-600 duration-200 group flex flex-col">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">grade</h2>

    <div class="flex flex-col justify-center items-center grow gap-4">
      <h3 class="font-bold text-5xl flex gap-8">
        <span class="text-amber-600">
          {#if currentClass.grade >= 90}
            A
          {:else if currentClass.grade >= 80}
            B
          {:else if currentClass.grade >= 70}
            C
          {:else if currentClass.grade >= 60}
            D
          {:else}
            F
          {/if}
        </span>
        <span>-</span>
        <span>{currentClass.grade}%</span>
      </h3>
      <span class="text-2xl text-stone-600">
        {currentClass.grade >= 70 ? "passing" : "failing"}
      </span>
    </div>
  </div>

  <div class="bg-stone-800 row-start-3 col-start-1 col-end-1 rounded-md p-4 flex flex-col border-2 border-transparent hover:border-amber-600 duration-200 group">
    <h2 class="text-stone-600 font-bold mb-4 group-hover:text-amber-600 duration-200">notes</h2>

    <textarea
      name="notes"
      id="notes"
      class="resize-none w-full grow outline-none"
      placeholder="put your notes here..."
    >{currentClass.notes}</textarea>
  </div>
</div>
