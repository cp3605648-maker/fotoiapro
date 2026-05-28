import { supabaseAdmin } from "../../lib/supabaseAdmin";

export default async function handler(req, res) {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({
      error: "No autenticado",
    });
  }

  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("id,email,credits")
    .eq("id", userId)
    .single();

  if (error) {
    return res.status(404).json({
      error: "Perfil no encontrado",
    });
  }

  return res.status(200).json(profile);
}
