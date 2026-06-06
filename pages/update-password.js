import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Contraseña actualizada correctamente. Ya puedes iniciar sesión.");
  }

  return (
    <main style={{ minHeight:"100vh", background:"#050816", color:"white", display:"grid", placeItems:"center", padding:"20px" }}>
      <form onSubmit={handleUpdate} style={{ width:"100%", maxWidth:"420px", padding:"28px", borderRadius:"24px", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)" }}>
        <h1>Nueva contraseña</h1>
        <p>Escribe tu nueva contraseña.</p>

        <input
          type="password"
          required
          minLength="6"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width:"100%", padding:"14px", borderRadius:"14px", margin:"16px 0", border:"1px solid rgba(255,255,255,.15)", background:"#111827", color:"white" }}
        />

        <button disabled={loading} style={{ width:"100%", padding:"14px", borderRadius:"999px", border:0, background:"linear-gradient(135deg,#7c3aed,#06b6d4)", color:"white", fontWeight:900 }}>
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </button>

        {msg && <p style={{ marginTop:"16px" }}>{msg}</p>}

        <a href="/login" style={{ display:"block", marginTop:"18px", color:"#22d3ee" }}>Ir a iniciar sesión</a>
      </form>
    </main>
  );
}
