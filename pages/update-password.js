import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initRecovery() {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace("#", ""));

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
          await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
        }

        setReady(true);
      } catch (err) {
        console.error(err);
        setMsg("El enlace no es válido o ya expiró. Solicita uno nuevo.");
      }
    }

    initRecovery();
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Contraseña actualizada correctamente. Ya puedes iniciar sesión.");
    setPassword("");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1800);
  }

  return (
    <main style={{ minHeight:"100vh", background:"#050816", color:"white", display:"grid", placeItems:"center", padding:"20px" }}>
      <form onSubmit={handleUpdate} style={{ width:"100%", maxWidth:"420px", padding:"28px", borderRadius:"24px", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)" }}>
        <h1>Nueva contraseña</h1>
        <p>Escribe tu nueva contraseña para recuperar tu cuenta.</p>

        <input
          type="password"
          required
          minLength="6"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!ready || loading}
          style={{ width:"100%", padding:"14px", borderRadius:"14px", margin:"16px 0", border:"1px solid rgba(255,255,255,.15)", background:"#111827", color:"white" }}
        />

        <button disabled={!ready || loading} style={{ width:"100%", padding:"14px", borderRadius:"999px", border:0, background:"linear-gradient(135deg,#7c3aed,#06b6d4)", color:"white", fontWeight:900 }}>
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </button>

        {msg && <p style={{ marginTop:"16px" }}>{msg}</p>}

        <a href="/login" style={{ display:"block", marginTop:"18px", color:"#22d3ee" }}>
          Ir a iniciar sesión
        </a>
      </form>
    </main>
  );
}
