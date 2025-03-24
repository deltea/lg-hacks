import { supabase } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const { data: currentClass, error: currentClassError } = await supabase.from("classes").select().eq("slug", params.slug).single();
  const { data: classes, error: classesError } = await supabase.from("classes").select().order("period", { ascending: true });

  if (currentClassError) {
    throw currentClassError;
  } else if (classesError) {
    throw classesError;
  }

  return { currentClass, classes };
}) satisfies PageServerLoad;
