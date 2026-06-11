import UseCases from "../components/UseCases";
import HeroShowcase from "../components/HeroShowcase";
import PromptHelperChips from "../components/PromptHelperChips";
import WhatCanYouAskBanner from "../components/WhatCanYouAskBanner";
import SocialReadyBanner from "../components/SocialReadyBanner";
import PremiumStylesGrid from "../components/PremiumStylesGrid";
import TrustBanner from "../components/TrustBanner";
import FeaturesBanner from "../components/FeaturesBanner";
import FreeCreditBanner from "../components/FreeCreditBanner";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../lib/uploadImage";

const presets = [
  { id: "pose", name: "Pose / Movimiento", desc: "Cambia postura, acción o encuadre.", emoji: "🕺" },
  { id: "fashion", name: "Outfit / Moda", desc: "Cambia ropa, estilo y look.", emoji: "👗" },
  { id: "location", name: "Lugar / Fondo", desc: "Cambia escenario o ciudad.", emoji: "🌆" },
  { id: "luxury", name: "Luxury Branding", desc: "Look premium y elegante.", emoji: "✨" },
  { id: "magazine", name: "Portada Revista", desc: "Estilo editorial profesional.", emoji: "📰" },
  { id: "object", name: "Agregar Objeto", desc: "Añade autos, accesorios u objetos.", emoji: "🏎️" },
  { id: "cinematic", name: "Cinemático", desc: "Luces, drama y calidad película.", emoji: "🎬" },
  { id: "anime", name: "Anime", desc: "Transformación artística anime.", emoji: "🌸" },
  { id: "cyberpunk", name: "Cyberpunk", desc: "Neón, futurista y visual.", emoji: "🌃" },
  { id: "social", name: "Redes Sociales", desc: "Instagram, TikTok, WhatsApp, YouTube, LinkedIn.", emoji: "📱" },
];

const creditPackages = [
  { id: "basic_mxn", name: "10 créditos", price: "$99 MXN" },
  { id: "pro_mxn", name: "30 créditos", price: "$199 MXN" },
  { id: "premium_mxn", name: "100 créditos", price: "$499 MXN" },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);
  const [referencePreview, setReferencePreview] = useState(null);
  const [preset, setPreset] = useState("ceo");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState(0);
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      const savedHistory = JSON.parse(localStorage.getItem("fotoia_history") || "[]");
      setHistory(savedHistory);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id,email,credits")
          .eq("id", currentUser.id)
          .single();

        if (!profile) {
          setCredits(0);
        } else {
          setCredits(profile.credits || 0);
        }
      }

      setAuthLoading(false);
    };

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleStripeReturn = async () => {
      if (!user) return;

      const params = new URLSearchParams(window.location.search);
      const success = params.get("success");
      const cancelled = params.get("cancelled");
      const sessionId = params.get("session_id");

      if (success === "true" && sessionId) {
        try {
          const res = await fetch("/api/confirm-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              userId: user.id,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data?.details || data?.error || "No se pudo confirmar el pago.");
          }

          setCredits(data.credits);
          setNotice("Pago exitoso. Tus créditos fueron agregados.");
          window.history.replaceState({}, "", window.location.pathname);
        } catch (err) {
          setError(err.message || "Error confirmando pago.");
        }
      }

      if (cancelled === "true") {
        setNotice("Pago cancelado. No se agregaron créditos.");
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    handleStripeReturn();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(0);
    setNotice("Sesión cerrada.");
  };

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

    const objectUrl = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      const orientation =
        img.width > img.height
          ? "landscape"
          : img.height > img.width
          ? "portrait"
          : "square";

      setImageMeta({
        width: img.width,
        height: img.height,
        orientation,
      });
    };
    img.src = objectUrl;

    setImage(file);
    setPreview(objectUrl);
    setOutput(null);
    setError("");
  };

  const handleReferenceImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Formato no permitido en referencia. Usa JPG, PNG o WEBP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen de referencia es demasiado pesada. Usa una imagen menor a 5MB.");
      return;
    }

    setReferenceImage(file);
    setReferencePreview(URL.createObjectURL(file));
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
    if (!user) {
      window.location.href = "/login";
      return;
    }

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
      setNotice("");

      const uploadedUrl = await uploadImage(image, user.id);
      const uploadedReferenceUrl = referenceImage
        ? await uploadImage(referenceImage, `${user.id}/references`)
        : null;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedUrl,
          referenceImage: uploadedReferenceUrl,
          prompt: customPrompt.trim() || preset,
          preset,
          credits,
          isPaid: true,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.details || data?.error || "No se pudo generar la imagen.");
      }

      setOutput(data.output);

      const newCredits =
        data.creditsLeft !== undefined ? data.creditsLeft : Math.max(credits - 1, 0);

      await supabase
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", user.id);

      setCredits(newCredits);

      const newItem = {
        id: Date.now(),
        image: data.output,
        preset,
        prompt: customPrompt.trim() || preset,
        createdAt: new Date().toLocaleString(),
      };

      const updatedHistory = [newItem, ...history].slice(0, 6);
      setHistory(updatedHistory);
      localStorage.setItem("fotoia_history", JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.message || "Ocurrió un error al generar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  const buyCredits = async (packageType) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setError("");
      setNotice("");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageType,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.details || data?.error || "No se pudo iniciar el pago.");
      }

      if (data?.url) window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Error al conectar con Stripe.");
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("fotoia_history");
  };

  return (
    <main className="page">
      <FreeCreditBanner />
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

          <div className="userBox">
            {authLoading ? (
              <span>Cargando...</span>
            ) : user ? (
              <>
                <span>{user.email}</span>
                <button onClick={logout}>Salir</button>
              </>
            ) : (
              <a href="/login">Iniciar sesión</a>
            )}
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroText">
            <div className="badge">IA para retratos premium</div>
            <h1>Sube una foto y describe tu idea. FotoIA Pro entiende tu petición, conserva tu identidad y genera imágenes listas para vender, publicar o promocionar tu marca.</h1>
            <p>
              Escribe lo que quieres: LinkedIn, Instagram, Shopify, YouTube, fondos, ropa, accesorios, iluminación o estilo premium. FotoIA.pro interpreta tu idea y preserva tu identidad.
            </p>

            <div className="heroActions">
              <a href="#studio" className="primaryBtn">🚀 Probar gratis</a>
              <button type="button" className="secondaryBtn" onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth", block: "start" })}>💎 Ver planes</button>
            </div>

            <div className="heroTrustBar">
              <span>⭐ Más de 20 estilos</span>
              <span>🔒 Conserva tu identidad</span>
              <span>📱 Redes y ecommerce</span>
              <span>⚡ Generación rápida</span>
            </div>

            <div className="trust">
              <span>⚡ Generación rápida</span>
              <span>🔒 Créditos persistentes</span>
              <span>🎨 Presets premium</span>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      <UseCases />

      <section id="studio" className="studio">
        <div className="sectionHeader">
          <span>Estudio IA</span>
          <h2>Crea tu transformación</h2>
          <p>Sube una foto, elige qué quieres transformar y describe ropa, fondo, lugar, color, objeto o estilo.</p>
        </div>

        {notice && <p className="notice">{notice}</p>}

        <div className="studioGrid">
          <div className="panel">
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

            <div className="referenceTitle">
              <strong>Referencia visual opcional</strong>
              <small>Sube ropa, fondo, objeto, estilo o escena de ejemplo.</small>
            </div>

            <label className="uploadBox referenceBox">
              {referencePreview ? (
                <img src={referencePreview} alt="Referencia visual" />
              ) : (
                <div>
                  <strong>Subir referencia</strong>
                  <small>Ejemplo: outfit, auto, fondo, actor, objeto o estilo.</small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleReferenceImage} />
            </label>

            <button onClick={generateImage} disabled={loading} className="generateBtn">
              {loading ? "Generando imagen..." : "Generar con IA"}
            </button>

            {error && <p className="error">{error}</p>}
          </div>

          <div className="panel">
            <h3>2. Elige qué transformar</h3>

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
              
              <div className="freePromptNotice">
                <strong>✨ Describe tu idea con total libertad</strong>
                <span>Pide fondos, ropa, ciudades, accesorios, poses, objetos, iluminación, estilos y formatos para redes sociales. Tu identidad siempre será preservada.</span>
              </div>

              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ejemplos:
• Hazme una foto LinkedIn profesional con fondo ejecutivo.
• Ponme en una playa con lentes negros.
• Agrega un Lamborghini negro estilo luxury.
• Hazme una miniatura para YouTube cinematográfica."
              />
              <small>Escribe cualquier idea: fondos, ropa, objetos, plataformas, iluminación o estilo.</small>
            </div>
          </div>

          <div className="panel">
            <h3>3. Resultado</h3>

            <div className="resultBox">
              {loading ? (
                <div className="loading">
                  <div className="spinner" />
                  <p>Creando tu imagen premium...</p>
                </div>
              ) : output ? (
                <div className="beforeAfter">
                  <div className="compareCard">
                    <span>Antes</span>
                    <img src={preview} alt="Imagen original" />
                  </div>

                  <div className="compareCard">
                    <span>Después</span>
                    <img src={output} alt="Resultado generado" />
                  </div>
                </div>
              ) : (
                <div className="emptyResult">
                  <span>✨</span>
                  <div className="emptyResultText">
                  <h3>✨ Resultado profesional generado por IA</h3>
                  <p>✔ Conserva tu identidad</p>
                  <p>✔ Optimizado para redes sociales</p>
                  <p>✔ Calidad premium</p>
                  <p>✔ Descarga inmediata</p>
                </div>
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

      <section id="credits" className="creditsSection">
        <div className="sectionHeader">
          
          <FeaturesBanner />
      <TrustBanner />
      <WhatCanYouAskBanner />
      <PremiumStylesGrid />
      <SocialReadyBanner />

<h2>Compra paquetes en MXN</h2>
          <p>✨ 1 crédito = 1 transformación profesional con IA.</p>
        </div>

        <div id="planes" className="creditsGrid">
          {creditPackages.map((pack) => (
            <div key={pack.id} className={`creditCard ${pack.id === "pro_mxn" ? "popularCard" : ""} ${pack.id === "premium_mxn" ? "premiumCard" : ""}`}>
              <div className="creditIcon">{pack.id === "pro_mxn" ? "👑" : "✨"}</div>
              {pack.id === "pro_mxn" && <div className="popularBadge">🔥 MÁS POPULAR</div>}
              {pack.id === "premium_mxn" && <div className="popularBadge valueBadge">👑 MEJOR VALOR</div>}
              <h3>{pack.name}</h3>
              {pack.id === "pro_mxn" && <p className="savingsText">🔥 El favorito de nuestros clientes</p>}
              {pack.id === "premium_mxn" && <p className="savingsText">🚀 Ideal para agencias, creadores y negocios</p>}
              <strong>{pack.price}</strong>
              <button onClick={() => buyCredits(pack.id)}>Comprar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="historySection">
        <div className="sectionHeader">
          <span>Galería</span>
          <h2>Últimas imágenes generadas</h2>
          <p>Historial temporal guardado en este dispositivo.</p>
        </div>

        {history.length === 0 ? (
          <p className="emptyHistory">Aún no has generado imágenes.</p>
        ) : (
          <>
            <div className="historyGrid">
              {history.map((item) => (
                <div key={item.id} className="historyCard">
                  <img src={item.image} alt="Imagen generada" />
                  <div>
                    <strong>{item.preset}</strong>
                    <small>{item.createdAt}</small>
                  </div>
                  <a href={item.image} download>Descargar</a>
                </div>
              ))}
            </div>

            <button onClick={clearHistory} className="clearBtn">
              Limpiar historial
            </button>
          </>
        )}
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

        .hero, .studio, .creditsSection, .historySection {
          position: relative;
          padding: 80px 6vw;
        }

        .hero { overflow: hidden; padding-top: 28px; }

        .glow {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.45;
          pointer-events: none;
        }

        .glowOne { background: #7c3aed; top: 80px; left: -120px; }
        .glowTwo { background: #0ea5e9; right: -140px; top: 140px; }

        .nav {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
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

        .navLinks { display: flex; gap: 22px; }

        .navLinks a, .userBox a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        .userBox {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
        }

        .userBox button {
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          color: white;
          border-radius: 999px;
          padding: 8px 12px;
          cursor: pointer;
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
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
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
          color: rgba(255,255,255,0.68);
          font-size: 18px;
          line-height: 1.7;
          margin: 26px 0 34px;
        }

        .heroActions, .trust {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .trust {
          margin-top: 28px;
          color: rgba(255,255,255,0.62);
          font-size: 14px;
        }

        .primaryBtn, .secondaryBtn, .generateBtn, .downloadBtn, .creditCard button, .clearBtn {
          border: 0;
          cursor: pointer;
          text-decoration: none;
          font-weight: 800;
          border-radius: 18px;
          transition: 0.2s ease;
        }

        .primaryBtn, .generateBtn, .creditCard button {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
        }

        .primaryBtn, .secondaryBtn { padding: 16px 24px; }

        .secondaryBtn, .downloadBtn, .clearBtn {
          background: rgba(255,255,255,0.08);
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .heroCard, .panel, .feature, .creditCard, .historyCard {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 28px;
          padding: 24px;
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.28);
        }

        .heroCard { padding: 18px; border-radius: 34px; }

        .mockImage {
          height: 460px;
          border-radius: 26px;
          background:
            linear-gradient(160deg, rgba(255,255,255,0.18), transparent),
            radial-gradient(circle at 50% 20%, rgba(14,165,233,0.7), transparent 28%),
            radial-gradient(circle at 50% 55%, rgba(124,58,237,0.75), transparent 35%),
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
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          font-size: 42px;
          font-weight: 900;
        }

        .mockInfo {
          padding: 18px 6px 4px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mockInfo span { color: rgba(255,255,255,0.58); font-size: 14px; }

        .sectionHeader { text-align: center; margin-bottom: 38px; }
        .sectionHeader span { color: #a78bfa; font-weight: 800; }

        .sectionHeader h2 {
          font-size: clamp(34px, 5vw, 56px);
          margin: 10px 0;
          letter-spacing: -0.05em;
        }

        .sectionHeader p { color: rgba(255,255,255,0.6); }

        .notice {
          max-width: 760px;
          margin: 0 auto 24px;
          padding: 14px 16px;
          border-radius: 16px;
          color: #bbf7d0;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.24);
          text-align: center;
        }

        .studioGrid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr 1fr;
          gap: 22px;
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
          background: rgba(139,92,246,0.2);
          color: #ddd6fe;
          font-size: 13px;
          font-weight: 800;
        }

        .uploadBox {
          min-height: 260px;
          border: 1px dashed rgba(255,255,255,0.22);
          border-radius: 24px;
          display: grid;
          place-items: center;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          margin: 18px 0;
        }

        .uploadBox img {
          width: 100%;
          height: 100%;
          max-height: 320px;
          object-fit: cover;
        }

        .referenceTitle {
          margin: 18px 0 10px;
        }

        .referenceTitle strong {
          display: block;
          color: rgba(255,255,255,0.9);
        }

        .referenceTitle small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.4;
        }

        .referenceBox {
          min-height: 190px;
          margin-top: 0;
        }

        .uploadBox input { display: none; }
        .uploadBox small, .promptBox small {
          display: block;
          margin-top: 8px;
          color: rgba(255,255,255,0.55);
        }

        .generateBtn {
          width: 100%;
          padding: 16px 18px;
        }

        .generateBtn:disabled { opacity: 0.65; cursor: not-allowed; }

        .error {
          color: #fecaca;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.2);
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
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
        }

        .preset.active, .preset:hover {
          border-color: rgba(139,92,246,0.75);
          background: rgba(139,92,246,0.18);
        }

        .preset span { font-size: 24px; }
        .preset strong { display: block; margin: 8px 0 5px; }
        .preset small { color: rgba(255,255,255,0.55); line-height: 1.4; }

        .promptBox { margin-top: 18px; }

        .promptBox label {
          display: block;
          margin-bottom: 8px;
          font-weight: 800;
        }

        .promptBox textarea {
          width: 100%;
          min-height: 120px;
          resize: vertical;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: white;
          padding: 14px;
          font-size: 14px;
          outline: none;
          font-family: inherit;
        }

        .resultBox {
          min-height: 390px;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .resultBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .beforeAfter {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 12px;
        }

        .compareCard {
          position: relative;
          min-height: 360px;
          overflow: hidden;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .compareCard span {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(0,0,0,0.55);
          color: white;
          font-size: 12px;
          font-weight: 900;
        }

        .compareCard img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .emptyResult, .loading {
          text-align: center;
          color: rgba(255,255,255,0.62);
          padding: 24px;
        }

        .spinner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.15);
          border-top-color: white;
          margin: 0 auto 14px;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .downloadBtn {
          display: block;
          text-align: center;
          margin-top: 16px;
          padding: 15px 18px;
        }

        .creditsGrid, .historyGrid, .features {
          display: grid;
          gap: 18px;
        }

        
                .creditsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(260px, 360px));
          justify-content: center;
          gap: 28px;
          margin-top: 42px;
        }

        .historyGrid { grid-template-columns: repeat(3, 1fr); }

        .features {
          grid-template-columns: repeat(3, 1fr);
          padding: 20px 6vw 90px;
        }

        
        .creditCard {
          position: relative;
          padding: 34px 30px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 45%),
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          text-align: center;
          overflow: hidden;
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }

        .creditCard strong { display: block; font-size: 28px; margin-bottom: 18px; }
        .creditCard button { width: 100%; padding: 14px 18px; color: white; }

        .emptyHistory {
          text-align: center;
          color: rgba(255,255,255,0.55);
        }

        .historyCard { padding: 14px; }

        .historyCard img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: 18px;
        }

        .historyCard div {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin: 12px 0;
        }

        .historyCard small { color: rgba(255,255,255,0.45); }

        .historyCard a {
          display: block;
          text-align: center;
          color: white;
          text-decoration: none;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.1);
        }

        .clearBtn {
          display: block;
          margin: 24px auto 0;
          padding: 14px 22px;
        }

        .feature span { font-size: 32px; }
        .feature p { color: rgba(255,255,255,0.6); line-height: 1.6; }

        @media (max-width: 980px) {
          .heroGrid, .studioGrid, .features, .creditsGrid, .historyGrid, .beforeAfter {
            grid-template-columns: 1fr;
          }

          .nav { align-items: flex-start; flex-wrap: wrap; }
          .navLinks { display: none; }
          .mockImage { height: 360px; }
        }

        @media (max-width: 620px) {
          .hero { padding-top: 22px; }
          .presetGrid { grid-template-columns: 1fr; }
          .heroActions { flex-direction: column; }

          .primaryBtn, .secondaryBtn {
            width: 100%;
            text-align: center;
          }

          .studio, .creditsSection, .historySection {
            padding-top: 48px;
          }
        }
      `}      </style>
    </main>
  );
}
