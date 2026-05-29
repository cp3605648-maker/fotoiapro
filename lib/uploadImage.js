import { supabase } from "./supabaseClient";

export async function uploadImage(file, userId) {
  const ext = file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("uploads")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
