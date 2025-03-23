<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { onMount } from "svelte";
	import type { Tables } from "$lib/database.types";

  import Nav from "$lib/components/Nav.svelte";
  import Scene from "$lib/components/Scene.svelte";

  let cards: Tables<"cards">[] = [];
  let loadedCards: Tables<"cards">[] = [];

  onMount(async () => {
    const { data } = await supabase.from("cards").select("*");
    loadedCards = data ?? [];
    cards = loadedCards;
  });

  async function save() {
    // console.log("saving...");
    // await supabase.from("cards").upsert(cards);
    // console.log("saved!");
  }
</script>

<main class="flex flex-col h-full pl-4 pr-4 pb-4">
  <Nav />

  <Scene />

  <footer class="flex justify-center items-center h-24">
    <button></button>
  </footer>
</main>
