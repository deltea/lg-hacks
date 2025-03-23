<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
	import type { Tables } from "$lib/database.types";

  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Dashboard from "$lib/components/Dashboard.svelte";

  let currentClass: Tables<"classes">;

  onMount(async () => {
    // const { data } = await supabase.from("cards").select("*");
    // loadedCards = data ?? [];
    // cards = loadedCards;
  });
</script>

<Nav />
