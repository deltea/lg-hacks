import { supabase } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const { data: classes, error } = await supabase.from("classes").select();

  if (error) {
    throw error;
  }

  return { classes };
}) satisfies PageServerLoad;
