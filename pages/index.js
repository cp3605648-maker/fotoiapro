import { useState } from "react";

const presets = [
  {
    id: "ceo",
    name: "CEO / LinkedIn",
    desc: "Retrato profesional para perfil, CV o marca personal.",
    emoji: "💼",
  },
  {
    id: "luxury",
    name: "Luxury",
    desc: "Look premium, elegante y cinematográfico.",
    emoji: "✨",
  },
  {
    id: "netflix",
    name: "Netflix Poster",
    desc: "Estilo póster dramático de serie o película.",
    emoji: "🎬",
  },
  {
    id: "anime",
    name: "Anime",
    desc: "Transformación artística estilo anime moderno.",
    emoji: "🌸",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    desc: "Luces neón, futurista y visualmente impactante.",
    emoji: "🌃",
  },
  {
    id: "fitness",
    name: "Fitness",
    desc: "Imagen fuerte, atlética y de alto impacto.",
    emoji: "🔥",
  },
];

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [preset, setPreset] = useState("ceo");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState(3);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Formato no permitido. Usa JPG, PNG o WEBP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen es demasiado pesada. Usa una imagen menor a 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setOutput(null);
    setError("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const generateImage = async () => {
    if (!image) {
      setError("Sube una foto antes de generar.");
      return;
    }

    if (credits <= 0) {
      setError("No tienes créditos disponibles. Compra un paquete para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const base64Image = await toBase64(image);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          prompt: customPrompt.trim() || preset,
          preset,
          credits,
          isPaid: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.details || data?.error || "No se pudo generar la imagen."
        );
      }

      setOutput(data.output);

      if (data.creditsLeft !== undefined) {
        setCredits(data.creditsLeft);
      }
    } catch (err) {
      setError(err.message || "Ocurrió un error al generar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const buyCredits = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        setError("No se pudo iniciar el pago.");
      }
    } catch {
      setError("Error al conectar con Stripe.");
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="glow glowOne" />
        <div className="glow glowTwo" />

        <nav className="nav">
          <div className="brand">
            <span className="logo">F</span>
            <span>FotoIA Pro</span>
          </div>

          <div className="navLinks">
            <a href="/terms">Términos</a>
            <a href="/privacy">Privacidad</a>
            <a href="/refunds">Reembolsos</a>
            <a href="/contact">Contacto</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroText">
            <div className="badge">IA para retratos premium</div>

            <h1>Transforma tus fotos en imágenes profesionales con IA.</h1>

            <p>
              Sube una foto, elige un estilo, describe los cambios que quieres
              y genera retratos listos para redes, branding, perfiles
              profesionales y contenido viral.
            </p>

            <div className="heroActions">
              <a href="#studio" className="primaryBtn">
                Crear imagen
              </a>
              <button onClick={buyCredits} className="secondaryBtn">
                Comprar créditos
              </button>
            </div>

            <div className="trust">
              <span>⚡ Generación rápida</span>
              <span>🔒 Experiencia protegida</span>
              <span>🎨 Presets premium</span>
            </div>
          </div>

          <div className="heroCard">
            <div className="mockImage">
              <div className="mockFace">AI</div>
            </div>
            <div className="mockInfo">
              <strong>Retrato estilo Luxury</strong>
              <span>Resultado premium generado con FotoIA Pro</span>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="studio">
        <div className="sectionHeader">
          <span>Estudio IA</span>
          <h2>Crea tu transformación</h2>
          <p>
            Sube una foto clara, elige un preset y escribe instrucciones si
            quieres un resultado más específico.
          </p>
        </div>

        <div className="studioGrid">
          <div className="panel uploadPanel">
            <div className="panelTop">
              <h3>1. Sube tu foto</h3>
              <span>{credits} créditos</span>
            </div>

            <label className="uploadBox">
              {preview ? (
                <img src={preview} alt="Vista previa" />
              ) : (
                <div>
                  <strong>Haz clic para subir una imagen</strong>
                  <small>JPG, PNG o WEBP · máximo 5MB</small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>

            <button
              onClick={generateImage}
              disabled={loading}
              className="generateBtn"
            >
              {loading ? "Generando imagen..." : "Generar con IA"}
            </button>

            {error && <p className="error">{error}</p>}
          </div>

          <div className="panel presetsPanel">
            <h3>2. Elige un preset</h3>

            <div className="presetGrid">
              {presets.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPreset(item.id)}
                  className={preset === item.id ? "preset active" : "preset"}
                >
                  <span>{item.emoji}</span>
                  <strong>{item.name}</strong>
                  <small>{item.desc}</small>
                </button>
              ))}
            </div>

            <div className="promptBox">
              <label>Describe qué quieres cambiar</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ejemplo: hazlo estilo póster de Netflix, con fondo oscuro, luces dramáticas, rostro profesional y apariencia cinematográfica."
              />
              <small>
                Si lo dejas vacío, usaremos automáticamente el preset
                seleccionado.
              </small>
            </div>
          </div>

          <div className="panel resultPanel">
            <h3>3. Resultado</h3>

            <div className="resultBox">
              {loading ? (
                <div className="loading">
                  <div className="spinner" />
                  <p>Creando tu imagen premium...</p>
                </div>
              ) : output ? (
                <img src={output} alt="Resultado generado" />
              ) : (
                <div className="emptyResult">
                  <span>✨</span>
                  <p>Tu imagen generada aparecerá aquí.</p>
                </div>
              )}
            </div>

            {output && (
              <a href={output} download className="downloadBtn">
                Descargar imagen
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span>💼</span>
          <h3>Profesional</h3>
          <p>Ideal para LinkedIn, CV, marca personal y perfiles de negocio.</p>
        </div>

        <div className="feature">
          <span>🎬</span>
          <h3>Cinemático</h3>
          <p>Presets visuales con estética moderna, viral y premium.</p>
        </div>

        <div className="feature">
          <span>⚡</span>
          <h3>Simple</h3>
          <p>Sin edición compleja. Sube, elige estilo, describe y genera.</p>
        </div>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(124, 58, 237, 0.25), transparent 35%),
            radial-gradient(circle at top right, rgba(14, 165, 233, 0.18), transparent 30%),
            #050510;
          color: white;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .hero {
          position: relative;
          overflow: hidden;
          padding: 28px 6vw 80px;
        }

        .glow {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.45;
          pointer-events: none;
        }

        .glowOne {
          background: #7c3aed;
          top: 80px;
          left: -120px;
        }

        .glowTwo {
          background: #0ea5e9;
          right: -140px;
          top: 140px;
        }

        .nav {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 80px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .logo {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          box-shadow: 0 0 35px rgba(139, 92, 246, 0.55);
        }

        .navLinks {
          display: flex;
          gap: 22px;
        }

        .navLinks a {
          color: rgba(255, 255, 255, 0.68);
          text-decoration: none;
          font-size: 14px;
        }

        .heroGrid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          padding: 8px 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #c4b5fd;
          font-size: 14px;
          margin-bottom: 24px;
        }

        h1 {
          max-width: 760px;
          font-size: clamp(42px, 7vw, 82px);
          line-height: 0.94;
          margin: 0;
          letter-spacing: -0.07em;
        }

        .heroText p {
          max-width: 620px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 18px;
          line-height: 1.7;
          margin: 26px 0 34px;
        }

        .heroActions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .primaryBtn,
        .secondaryBtn,
        .generateBtn,
        .downloadBtn {
          border: 0;
          cursor: pointer;
          text-decoration: none;
          font-weight: 800;
          border-radius: 18px;
          transition: 0.2s ease;
        }

        .primaryBtn {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          padding: 16px 24px;
          box-shadow: 0 18px 60px rgba(99, 102, 241, 0.35);
        }

        .secondaryBtn {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          padding: 16px 24px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .primaryBtn:hover,
        .secondaryBtn:hover,
        .generateBtn:hover,
        .downloadBtn:hover {
          transform: translateY(-2px);
        }

        .trust {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: 28px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 14px;
        }

        .heroCard {
          padding: 18px;
          border-radius: 34px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(20px);
        }

        .mockImage {
          height: 460px;
          border-radius: 26px;
          background:
            linear-gradient(160deg, rgba(255, 255, 255, 0.18), transparent),
            radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.7), transparent 28%),
            radial-gradient(circle at 50% 55%, rgba(124, 58, 237, 0.75), transparent 35%),
            #111827;
          display: grid;
          place-items: center;
        }

        .mockFace {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.22);
          font-size: 42px;
          font-weight: 900;
          color: white;
        }

        .mockInfo {
          padding: 18px 6px 4px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mockInfo span {
          color: rgba(255, 255, 255, 0.58);
          font-size: 14px;
        }

        .studio {
          padding: 80px 6vw;
        }

        .sectionHeader {
          text-align: center;
          margin-bottom: 38px;
        }

        .sectionHeader span {
          color: #a78bfa;
          font-weight: 800;
        }

        .sectionHeader h2 {
          font-size: clamp(34px, 5vw, 56px);
          margin: 10px 0;
          letter-spacing: -0.05em;
        }

        .sectionHeader p {
          color: rgba(255, 255, 255, 0.6);
        }

        .studioGrid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr 1fr;
          gap: 22px;
        }

        .panel,
        .feature {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 28px;
          padding: 24px;
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
        }

        .panelTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .panelTop span {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(139, 92, 246, 0.2);
          color: #ddd6fe;
          font-size: 13px;
          font-weight: 800;
        }

        .panel h3 {
          margin-top: 0;
          letter-spacing: -0.03em;
        }

        .uploadBox {
          min-height: 260px;
          border: 1px dashed rgba(255, 255, 255, 0.22);
          border-radius: 24px;
          display: grid;
          place-items: center;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
          margin: 18px 0;
        }

        .uploadBox img {
          width: 100%;
          height: 100%;
          max-height: 320px;
          object-fit: cover;
        }

        .uploadBox input {
          display: none;
        }

        .uploadBox small {
          display: block;
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.55);
        }

        .generateBtn {
          width: 100%;
          padding: 16px 18px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
        }

        .generateBtn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .error {
          color: #fecaca;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 12px 14px;
          border-radius: 16px;
          font-size: 14px;
        }

        .presetGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .preset {
          text-align: left;
          padding: 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .preset:hover,
        .preset.active {
          border-color: rgba(139, 92, 246, 0.75);
          background: rgba(139, 92, 246, 0.18);
          transform: translateY(-2px);
        }

        .preset span {
          font-size: 24px;
        }

        .preset strong {
          display: block;
          margin: 8px 0 5px;
        }

        .preset small {
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.4;
        }

        .promptBox {
          margin-top: 18px;
        }

        .promptBox label {
          display: block;
          margin-bottom: 8px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.85);
        }

        .promptBox textarea {
          width: 100%;
          min-height: 120px;
          resize: vertical;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          padding: 14px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
        }

        .promptBox textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .promptBox small {
          display: block;
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.4;
        }

        .resultBox {
          min-height: 390px;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at top, rgba(139, 92, 246, 0.2), transparent 35%),
            rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .resultBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .emptyResult,
        .loading {
          text-align: center;
          color: rgba(255, 255, 255, 0.62);
          padding: 24px;
        }

        .emptyResult span {
          font-size: 44px;
        }

        .spinner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.15);
          border-top-color: white;
          margin: 0 auto 14px;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .downloadBtn {
          display: block;
          text-align: center;
          margin-top: 16px;
          padding: 15px 18px;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          padding: 20px 6vw 90px;
        }

        .feature span {
          font-size: 32px;
        }

        .feature h3 {
          margin-bottom: 8px;
        }

        .feature p {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        @media (max-width: 980px) {
          .heroGrid,
          .studioGrid,
          .features {
            grid-template-columns: 1fr;
          }

          .nav {
            align-items: flex-start;
            gap: 18px;
          }

          .navLinks {
            display: none;
          }

          .mockImage {
            height: 360px;
          }
        }

        @media (max-width: 620px) {
          .hero {
            padding-top: 22px;
          }

          .presetGrid {
            grid-template-columns: 1fr;
          }

          .heroActions {
            flex-direction: column;
          }

          .primaryBtn,
          .secondaryBtn {
            width: 100%;
            text-align: center;
          }

          .studio {
            padding-top: 48px;
          }
        }
      `}</style>
    </main>
  );
}