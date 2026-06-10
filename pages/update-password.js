import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setReady(!!data?.user);
    }

    checkUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    try {
      if (userData?.user?.email) {
        await fetch("https://www.fotoia.pro/api/password-updated-notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.user.email,
          }),
        });
      }
    } catch (err) {
      console.error("Error notificando cambio de contraseña:", err);
    }

    setMsg("Contraseña actualizada correctamente. Te enviamos un correo de confirmación.");
    setPassword("");
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: "460px", margin: "80px auto", padding: "24px" }}>
      <h1>Crear nueva contraseña</h1>

      {!ready && <p>Verificando enlace de recuperación...</p>}

      {ready && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            required
            minLength="6"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              margin: "16px 0",
              border: "1px solid rgba(255,255,255,.15)",
              background: "#111827",
              color: "white",
            }}
          />

          <button
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "999px",
              border: 0,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              color: "white",
              fontWeight: 900,
            }}
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      )}

      {msg && <p style={{ marginTop: "16px" }}>{msg}</p>}

      <a href="/login" style={{ display: "block", marginTop: "18px", color: "#22d3ee" }}>
        Ir a iniciar sesión
      </a>
    </main>
  );
}
