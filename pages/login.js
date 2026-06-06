import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

      // FREE_TRIAL_CREDIT_ADDED
      try {
        const newUserId = data?.user?.id || authData?.user?.id || user?.id;
        const newUserEmail = data?.user?.email || authData?.user?.email || email;

        if (newUserId) {
          await supabase.from("profiles").upsert({
            id: newUserId,
            email: newUserEmail,
            credits: 1
          });
        }
      } catch (trialError) {
        console.error("No se pudo asignar crédito gratis:", trialError);
      }

        if (error) throw error;

        if (data?.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email,
            credits: 0,
          });
        }

        setMessage("Cuenta creada correctamente. Ya puedes usar FotoIA Pro.");
        router.push("/");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (err) {
      setError(err.message || "No se pudo completar la acción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="loginPage">
      <section className="card">
        <div className="logo">F</div>

        <h1>
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <p>
          {mode === "login"
            ? "Accede para usar tus créditos, compras e historial."
            : "Crea tu cuenta para guardar créditos y generar imágenes."}
        </p>

        <form onSubmit={handleAuth}>
          <label>Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Procesando..."
              : mode === "login"
              ? "Entrar"
              : "Crear cuenta"}
          </button>
          <a href="/forgot-password" style={{ display: "block", marginTop: "14px", color: "#22d3ee", textAlign: "center" }}>
            ¿Olvidaste tu contraseña?
          </a>
        </form>

        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}

        <div className="switch">
          {mode === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button onClick={() => setMode("register")}>
                Crear cuenta
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button onClick={() => setMode("login")}>
                Iniciar sesión
              </button>
            </>
          )}
        </div>

        <a className="back" href="/">
          Volver a FotoIA Pro
        </a>
      </section>

      <style jsx>{`
        .loginPage {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background:
            radial-gradient(circle at top left, rgba(124, 58, 237, 0.28), transparent 35%),
            radial-gradient(circle at top right, rgba(14, 165, 233, 0.18), transparent 30%),
            #050510;
          color: white;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .card {
          width: 100%;
          max-width: 430px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 28px;
          padding: 30px;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
        }

        .logo {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          box-shadow: 0 0 35px rgba(139, 92, 246, 0.55);
          font-weight: 900;
          margin-bottom: 22px;
        }

        h1 {
          margin: 0;
          font-size: 36px;
          letter-spacing: -0.05em;
        }

        p {
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.6;
          margin: 12px 0 24px;
        }

        form {
          display: grid;
          gap: 12px;
        }

        label {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          outline: none;
          font-size: 15px;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        form button {
          margin-top: 10px;
          padding: 15px;
          border-radius: 16px;
          border: 0;
          cursor: pointer;
          color: white;
          font-weight: 900;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
        }

        form button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .message,
        .error {
          margin-top: 16px;
          padding: 12px 14px;
          border-radius: 14px;
          font-size: 14px;
        }

        .message {
          color: #bbf7d0;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.22);
        }

        .error {
          color: #fecaca;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.22);
        }

        .switch {
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.62);
          text-align: center;
          font-size: 14px;
        }

        .switch button {
          color: white;
          background: transparent;
          border: 0;
          cursor: pointer;
          font-weight: 900;
        }

        .back {
          display: block;
          margin-top: 22px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          text-decoration: none;
          font-size: 14px;
        }
      `}</style>
    </main>
  );
}
