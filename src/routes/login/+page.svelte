<script lang="ts">
  import { supabase } from "$lib/supabase";
</script>

<main class="h-full flex flex-col items-center justify-center gap-6">
  <h1 class="font-bold text-2xl">Loaf</h1>

  <button
    class="rounded-md bg-stone-800 text-stone-100 px-4 py-2 hover:cursor-pointer hover:bg-stone-700 duration-200 flex items-center gap-2"
    on:click={() => supabase.auth.signInWithOAuth({ provider: "google" })}
  >
    <iconify-icon icon="mingcute:google-fill" class="text-lg"></iconify-icon>
    <span>Login with Google</span>
  </button>
</main>
