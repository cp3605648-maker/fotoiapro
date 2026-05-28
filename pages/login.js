import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? window.location.origin
              : undefined,
        },
      });

      if (error) throw error;

      setMessage(
        "Revisa tu correo. Te enviamos un enlace para iniciar sesión."
      );
    } catch (err) {
      setMessage(err.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050510",
        color: "white",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <form
        onSubmit={signIn}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "28px",
        }}
      >
        <h1 style={{ marginTop: 0 }}>
          Iniciar sesión
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Accede para guardar créditos y compras.
        </p>

        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            marginTop: "16px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "14px",
            border: 0,
            borderRadius: "14px",
            cursor: "pointer",
            background: "linear-gradient(135deg,#8b5cf6,#06b6d4)",
            color: "white",
            fontWeight: 700,
          }}
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "16px",
              color: "#c4b5fd",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
