import { supabase } from "$lib/supabase";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const { data: currentClass, error: currentClassError } = await supabase.from("classes").select().eq("slug", params.slug).single();
  const { data: classes, error: classesError } = await supabase.from("classes").select();
  const { data: assignments, error: assignmentsError } = await supabase.from("assignments").select().eq("class", currentClass?.id ?? 0);

  if (currentClassError) {
    throw currentClassError;
  } else if (classesError) {
    throw classesError;
  } else if (assignmentsError) {
    throw assignmentsError;
  }

  return { currentClass, classes, assignments };
}) satisfies PageServerLoad;
