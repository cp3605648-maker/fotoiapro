import FreeCreditBanner from "../components/FreeCreditBanner";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../lib/uploadImage";
import { trackEvent } from "../lib/tracking";

const presets = [
  {
    id: "menu",
    name: "Menú",
    desc: "Diseño gastronómico profesional para restaurantes, cafeterías y negocios de comida.",
    emoji: "🍽️",
  },
  {
    id: "ad",
    name: "Anuncio",
    desc: "Publicidad profesional para presentar tu producto y atraer clientes.",
    emoji: "📢",
  },
  {
    id: "flyer",
    name: "Flyer",
    desc: "Pieza promocional completa para imprimir o publicar en internet.",
    emoji: "📰",
  },
  {
    id: "social",
    name: "Redes sociales",
    desc: "Contenido comercial para Instagram, Facebook y TikTok.",
    emoji: "📱",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Imágenes profesionales optimizadas para vender en marketplaces y tiendas online.",
    emoji: "🛒",
  },
  {
    id: "catalog",
    name: "Catálogo",
    desc: "Presentación profesional de producto para tiendas y ecommerce.",
    emoji: "🛍️",
  },
  {
    id: "promotion",
    name: "Promoción",
    desc: "Diseños de ofertas, descuentos, lanzamientos y campañas de venta.",
    emoji: "🔥",
  },
];


const menuTypes = [
  { id: "full_menu", name: "Menú completo" },
  { id: "restaurant", name: "Restaurante" },
  { id: "cafe", name: "Cafetería" },
  { id: "fast_food", name: "Comida rápida" },
  { id: "drinks", name: "Bebidas" },
  { id: "desserts", name: "Postres" },
  { id: "combos", name: "Combos / promociones" },
  { id: "whatsapp_menu", name: "Menú para WhatsApp" },
  { id: "screen_menu", name: "Menú para pantalla" },
];

const adTypes = [
  { id: "product_ad", name: "Anuncio de producto" },
  { id: "service_ad", name: "Anuncio de servicio" },
  { id: "launch", name: "Lanzamiento" },
  { id: "commercial_offer", name: "Oferta comercial" },
  { id: "brand_ad", name: "Publicidad de marca" },
];

const flyerTypes = [
  { id: "product_flyer", name: "Flyer de producto" },
  { id: "service_flyer", name: "Flyer de servicio" },
  { id: "event_flyer", name: "Flyer de evento" },
  { id: "business_flyer", name: "Flyer de negocio" },
  { id: "informational_flyer", name: "Flyer informativo" },
];

const promotionTypes = [
  { id: "discount", name: "Descuento" },
  { id: "special_offer", name: "Oferta especial" },
  { id: "two_for_one", name: "2x1" },
  { id: "combo", name: "Combo" },
  { id: "clearance", name: "Liquidación" },
  { id: "seasonal", name: "Temporada" },
  { id: "featured_product", name: "Producto destacado" },
];

const marketplacePlatforms = [
  { id: "amazon", name: "Amazon" },
  { id: "mercadolibre", name: "Mercado Libre" },
  { id: "ebay", name: "eBay" },
  { id: "shopify", name: "Shopify" },
];

const marketplaceImageTypes = [
  { id: "main", name: "Imagen principal" },
  { id: "secondary", name: "Imagen secundaria" },
];

const socialFormats = [
  {
    id: "instagram_post",
    name: "Instagram Post",
    aspectRatio: "1:1",
  },
  {
    id: "instagram_story",
    name: "Instagram Story",
    aspectRatio: "9:16",
  },
  {
    id: "instagram_reel",
    name: "Instagram Reel",
    aspectRatio: "9:16",
  },
  {
    id: "facebook_post",
    name: "Facebook Post",
    aspectRatio: "1:1",
  },
  {
    id: "facebook_story",
    name: "Facebook Story",
    aspectRatio: "9:16",
  },
  {
    id: "tiktok",
    name: "TikTok",
    aspectRatio: "9:16",
  },
  {
    id: "whatsapp_status",
    name: "WhatsApp Status",
    aspectRatio: "9:16",
  },
  {
    id: "linkedin_post",
    name: "LinkedIn Post",
    aspectRatio: "16:9",
  },
  {
    id: "x_post",
    name: "X / Twitter",
    aspectRatio: "16:9",
  },
  {
    id: "pinterest_pin",
    name: "Pinterest Pin",
    aspectRatio: "2:3",
  },
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
  const [preset, setPreset] = useState("menu");
  const [socialFormat, setSocialFormat] = useState("instagram_post");
const [marketplacePlatform, setMarketplacePlatform] = useState("amazon");
const [marketplaceImageType, setMarketplaceImageType] = useState("main");
  const [menuType, setMenuType] = useState("full_menu");
  const [adType, setAdType] = useState("product_ad");
  const [flyerType, setFlyerType] = useState("product_flyer");
  const [promotionType, setPromotionType] = useState("discount");
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState(0);
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState([]);

  // Creador de logotipos
  const [showLogoCreator, setShowLogoCreator] = useState(false);
  const [logoBusinessName, setLogoBusinessName] = useState("");
  const [logoBusinessType, setLogoBusinessType] = useState("Restaurante");
  const [logoStyle, setLogoStyle] = useState("Moderno");
  const [logoColors, setLogoColors] = useState("");
  const [logoDescription, setLogoDescription] = useState("");
  const [logoLoading, setLogoLoading] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState(null);
  const [logoPaymentSession, setLogoPaymentSession] = useState(null);

  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: "FotoIA Pro Home",
      content_category: "Commercial Product Marketing",
    });
  }, []);

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
      const purchase = params.get("purchase");

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

          if (
            data?.productType === "logo" ||
            purchase === "logo"
          ) {
            const savedLogo = sessionStorage.getItem(
              "fotoia_pending_logo"
            );

            if (savedLogo) {
              try {
                const logoData = JSON.parse(savedLogo);

                setLogoBusinessName(
                  logoData.businessName || ""
                );
                setLogoBusinessType(
                  logoData.businessType || "Restaurante"
                );
                setLogoStyle(
                  logoData.style || "Moderno"
                );
                setLogoColors(
                  logoData.colors || ""
                );
                setLogoDescription(
                  logoData.description || ""
                );
              } catch (parseError) {
                console.error(
                  "LOGO_STORAGE_ERROR:",
                  parseError
                );
              }
            }

            setLogoPaymentSession(sessionId);

            sessionStorage.setItem(
              "fotoia_logo_payment_session",
              sessionId
            );

            setShowLogoCreator(true);

            trackEvent("Purchase", {
              currency: "MXN",
              value:
                data?.amount
                  ? data.amount / 100
                  : 69,
              product_type: "logo",
            });

            setNotice(
              "✅ Pago de $69 MXN confirmado. Ahora pulsa “Generar mi logotipo pagado”."
            );
          } else {
            setCredits(data.credits);

            trackEvent("Purchase", {
              currency: "MXN",
              value:
                data?.amount
                  ? data.amount / 100
                  : undefined,
              credits:
                data?.addedCredits ||
                data?.creditsAdded ||
                undefined,
            });

            setNotice(
              "Pago exitoso. Tus créditos fueron agregados."
            );
          }

          window.history.replaceState(
            {},
            "",
            window.location.pathname
          );
        } catch (err) {
          setError(err.message || "Error confirmando pago.");
        }
      }

      if (cancelled === "true") {
        if (purchase === "logo") {
          setNotice(
            "Pago del logotipo cancelado. No se realizó ningún cargo."
          );
        } else {
          setNotice(
            "Pago cancelado. No se agregaron créditos."
          );
        }

        window.history.replaceState(
          {},
          "",
          window.location.pathname
        );
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

  const downloadGeneratedImage = (imageUrl) => {
    try {
      setError("");

      const socialNames = {
        instagram_post: "instagram-post",
        instagram_story: "instagram-story",
        instagram_reel: "instagram-reel",
        facebook_post: "facebook-post",
        facebook_story: "facebook-story",
        tiktok: "tiktok",
        whatsapp_status: "whatsapp-status",
        linkedin_post: "linkedin-post",
        x_post: "x-twitter-post",
        pinterest_pin: "pinterest-pin",
      };

      const marketplaceNames = {
        amazon: "amazon",
        mercadolibre: "mercado-libre",
        ebay: "ebay",
        shopify: "shopify",
      };

      const marketplaceImageNames = {
        main: "imagen-principal",
        secondary: "imagen-secundaria",
        lifestyle: "lifestyle",
        detail: "detalle-producto",
        infographic: "infografia",
      };

      const presetNames = {
        menu: "menu",
        ad: "anuncio",
        flyer: "flyer",
        social: socialNames[socialFormat] || "redes-sociales",
        catalog: "catalogo",
        promotion: "promocion",
        marketplace:
          `${marketplaceNames[marketplacePlatform] || "marketplace"}-` +
          `${marketplaceImageNames[marketplaceImageType] || "producto"}`,
      };

      const fileName =
        `fotoia-${presetNames[preset] || "publicidad"}.png`;

      const downloadUrl =
        `/api/download-image?url=${encodeURIComponent(imageUrl)}` +
        `&filename=${encodeURIComponent(fileName)}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("DOWNLOAD ERROR:", err);

      setError(
        "No se pudo descargar la imagen. Intenta nuevamente."
      );
    }
  };

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
        ? typeof referenceImage === "string"
          ? referenceImage
          : await uploadImage(referenceImage, `${user.id}/references`)
        : null;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedUrl,
          referenceImage: uploadedReferenceUrl,
          prompt: customPrompt.trim(),
          preset,
          socialFormat,
          marketplacePlatform,
          marketplaceImageType,
          menuType,
          adType,
          flyerType,
          promotionType,
          credits,
          isPaid: true,
          userId: user.id,
          imageMeta,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.details || data?.error || "No se pudo generar la imagen.");
      }

      setOutput(data.output);

      const newCredits =
        data.creditsLeft !== undefined ? data.creditsLeft : Math.max(credits - 1, 0);

      trackEvent("GenerateImage", {
        preset,
        credits_left: newCredits,
      });

      setCredits(newCredits);

      const newItem = {
        id: Date.now(),
        image: data.output,
        preset,
        prompt: customPrompt.trim(),
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

  const startLogoCheckout = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const businessName = logoBusinessName.trim();

    if (!businessName) {
      setError("Escribe el nombre de tu negocio.");
      return;
    }

    try {
      setLogoLoading(true);
      setError("");
      setNotice("");

      const pendingLogo = {
        businessName,
        businessType: logoBusinessType.trim(),
        style: logoStyle.trim(),
        colors: logoColors.trim(),
        description: logoDescription.trim(),
      };

      sessionStorage.setItem(
        "fotoia_pending_logo",
        JSON.stringify(pendingLogo)
      );

      trackEvent("InitiateCheckout", {
        package_id: "logo_launch_mxn",
        product_type: "logo",
        value: 69,
        currency: "MXN",
      });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageType: "logo_launch_mxn",
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(
          data?.details ||
          data?.error ||
          "No se pudo iniciar el pago."
        );
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("LOGO_CHECKOUT_ERROR:", err);

      setError(
        err.message ||
        "No se pudo iniciar el pago del logotipo."
      );

      setLogoLoading(false);
    }
  };

  const generateLogo = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const businessName = logoBusinessName.trim();

    if (!businessName) {
      setError("Escribe el nombre de tu negocio.");
      return;
    }

    if (!logoPaymentSession) {
      setError(
        "Primero debes completar el pago de $69 MXN para crear tu logotipo."
      );
      return;
    }

    try {
      setLogoLoading(true);
      setError("");
      setNotice("");

      const res = await fetch("/api/generate-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          paymentSessionId: logoPaymentSession,
          businessName,
          businessType: logoBusinessType.trim(),
          style: logoStyle.trim(),
          colors: logoColors.trim(),
          description: logoDescription.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.details ||
          data?.error ||
          "No se pudo crear el logotipo."
        );
      }

      if (!data?.output) {
        throw new Error("La IA no devolvió un logotipo.");
      }

      setGeneratedLogo(data.output);

      trackEvent("GenerateLogo", {
        business_name: businessName,
        business_type: logoBusinessType.trim(),
        value: 69,
        currency: "MXN",
      });

      sessionStorage.removeItem("fotoia_pending_logo");
      sessionStorage.removeItem("fotoia_logo_payment_session");

      setLogoPaymentSession(null);

      setNotice(
        "✨ Logotipo creado correctamente. Tu pago fue aplicado y no se descontaron créditos."
      );
    } catch (err) {
      console.error("LOGO_ERROR:", err);

      setError(
        err.message ||
        "Ocurrió un error al crear el logotipo."
      );
    } finally {
      setLogoLoading(false);
    }
  };


  const buyCredits = async (packageType) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError("");
      setNotice("");

      trackEvent("InitiateCheckout", {
        package_id: packageType,
      });

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

      if (!data?.url) {
        throw new Error("Stripe no devolvió URL de pago.");
      }

      window.location.assign(data.url);
    } catch (err) {
      setError(err.message || "Error al conectar con Stripe.");
      setLoading(false);
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
            <a href="#studio">Crear publicidad</a>
            <a href="#planes">Precios</a>
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
            <div className="badge">🚀 Marketing visual con IA para negocios</div>

            <h1>
              Convierte las fotos de tus productos en publicidad que vende.
            </h1>

            <p>
              Sube una foto de tu producto y crea menús, anuncios, flyers,
              promociones, catálogos y contenido para redes sociales en minutos.
            </p>

            <div className="heroActions">
              <a href="#studio" className="primaryBtn">🚀 Crear mi publicidad</a>

              <button
                type="button"
                className="secondaryBtn"
                onClick={() =>
                  document.getElementById("planes")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  })
                }
              >
                💎 Ver precios
              </button>
            </div>

            <div className="heroTrustBar">
              <span>📸 Una foto de producto</span>
              <span>🤖 IA para marketing</span>
              <span>📱 Lista para redes</span>
              <span>⚡ Generación rápida</span>
            </div>

            <div className="trust">
              <span>💰 Diseñado para vender</span>
              <span>🔒 Créditos seguros</span>
              <span>🇲🇽 Precios en MXN</span>
            </div>
          </div>

          <div className="heroProductCard">
            <div className="heroProductHeader">
              <span>ANTES</span>
              <span>→</span>
              <span>PUBLICIDAD IA</span>
            </div>

            <div className="productMockup">
              <div className="productMockupImage">
                <span>🍔</span>
              </div>

              <div className="productMockupContent">
                <small>PUBLICIDAD PARA TU NEGOCIO</small>
                <h3>Tu producto puede verse así.</h3>
                <p>
                  Imagen profesional para menú, redes sociales,
                  promociones o anuncios.
                </p>
                <div className="mockupTags">
                  <span>Instagram</span>
                  <span>WhatsApp</span>
                  <span>Menú</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLogoCreator && (
        <div className="logoModalOverlay">
          <div className="logoModal">
            <button
              type="button"
              className="logoModalClose"
              onClick={() => setShowLogoCreator(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="logoModalHeader">
              <span>✨ CREACIÓN DE LOGOTIPO</span>
              <h2>Crea el logotipo de tu negocio con IA</h2>
              <p>
                Este proceso es independiente de la creación de publicidad.
                No necesitas subir una foto. Solo dinos cómo quieres que sea
                tu marca y la IA creará una propuesta de logotipo.
              </p>
            </div>

            {!generatedLogo ? (
              <div className="logoForm">
                <label>
                  Nombre del negocio
                  <input
                    type="text"
                    value={logoBusinessName}
                    onChange={(e) => setLogoBusinessName(e.target.value)}
                    placeholder="Ej. La Casa de la Hamburguesa"
                    maxLength={80}
                  />
                </label>

                <label>
                  Tipo de negocio
                  <select
                    value={logoBusinessType}
                    onChange={(e) => setLogoBusinessType(e.target.value)}
                  >
                    <option>Restaurante</option>
                    <option>Cafetería</option>
                    <option>Bar</option>
                    <option>Panadería</option>
                    <option>Tienda</option>
                    <option>Ropa y moda</option>
                    <option>Salón de belleza</option>
                    <option>Barbería</option>
                    <option>Construcción</option>
                    <option>Servicios profesionales</option>
                    <option>Ecommerce</option>
                    <option>Otro</option>
                  </select>
                </label>

                <label>
                  Estilo del logotipo
                  <select
                    value={logoStyle}
                    onChange={(e) => setLogoStyle(e.target.value)}
                  >
                    <option>Moderno</option>
                    <option>Minimalista</option>
                    <option>Elegante</option>
                    <option>Premium</option>
                    <option>Divertido</option>
                    <option>Artesanal</option>
                    <option>Corporativo</option>
                    <option>Juvenil</option>
                    <option>Lujo</option>
                  </select>
                </label>

                <label>
                  Colores
                  <input
                    type="text"
                    value={logoColors}
                    onChange={(e) => setLogoColors(e.target.value)}
                    placeholder="Ej. Negro y dorado"
                    maxLength={120}
                  />
                </label>

                <label>
                  Describe tu idea
                  <textarea
                    value={logoDescription}
                    onChange={(e) => setLogoDescription(e.target.value)}
                    placeholder="Ej. Quiero un logo con una hamburguesa sencilla, elegante y fácil de reconocer."
                    maxLength={500}
                  />
                </label>

                <div className="logoLaunchOffer">
                  <span className="logoLaunchBadge">
                    🔥 PRECIO ESPECIAL DE LANZAMIENTO
                  </span>

                  <div className="logoLaunchPrice">
                    <span className="logoRegularPrice">
                      $149 MXN
                    </span>

                    <strong>$69 MXN</strong>
                  </div>

                  <p>
                    Pago único por la creación de tu logotipo.
                    No consume créditos de publicidad.
                  </p>
                </div>

                <button
                  type="button"
                  className="generateLogoBtn"
                  onClick={
                    logoPaymentSession
                      ? generateLogo
                      : startLogoCheckout
                  }
                  disabled={logoLoading}
                >
                  {logoLoading
                    ? logoPaymentSession
                      ? "Creando tu logotipo..."
                      : "Abriendo pago seguro..."
                    : logoPaymentSession
                    ? "✨ Generar mi logotipo pagado"
                    : "✨ Crear mi logotipo — $69 MXN"}
                </button>
              </div>
            ) : (
              <div className="generatedLogoArea">
                <div className="generatedLogoPreview">
                  <img
                    src={generatedLogo}
                    alt={`Logotipo generado para ${logoBusinessName}`}
                  />
                </div>

                <h3>Tu logotipo está listo</h3>

                <p>
                  Tu logotipo fue creado de forma independiente y ya puedes
                  utilizarlo en flyers, menús, promociones, anuncios,
                  redes sociales y otras piezas de tu negocio.
                </p>

                <div className="logoResultActions">
                  <button
                    type="button"
                    className="useLogoBtn"
                    onClick={() => {
                      setReferenceImage(generatedLogo);
                      setReferencePreview(generatedLogo);
                      setNotice("✨ Logotipo seleccionado. Ahora puedes crear tu publicidad.");
                      setShowLogoCreator(false);
                      document
                        .getElementById("studio")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                  >
                    ✅ Usar este logotipo
                  </button>

                  <a
                    href={generatedLogo}
                    download={`${logoBusinessName || "logotipo"}-logo.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="downloadLogoBtn"
                  >
                    Descargar logotipo
                  </a>

                  <button
                    type="button"
                    className="generateAnotherLogoBtn"
                    onClick={() => setGeneratedLogo(null)}
                  >
                    🔄 Generar otro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <section id="studio" className="studio">
        <div className="sectionHeader">
          <span>Estudio IA</span>
          <h2>Crea publicidad para tu negocio</h2>
          <p>
            Sube la foto de tu producto, elige qué quieres crear y describe
            cómo quieres que se vea tu publicidad.
          </p>
        </div>

        {notice && <p className="notice">{notice}</p>}

        <div className="studioGrid">
          <div className="panel">
            <div className="panelTop">
              <h3>1. Sube tu producto</h3>
              <span>{credits} créditos</span>
            </div>

            <label className="uploadBox">
              {preview ? (
                <img src={preview} alt="Vista previa" />
              ) : (
                <div>
                  <strong>Haz clic para subir la foto de tu producto</strong>
                  <small>JPG, PNG o WEBP · máximo 5MB</small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>

            <div className="referenceTitle logoTitle">
              <div>
                <strong>🏷️ Logotipo de tu negocio</strong>
                <small>
                  Opcional. Sube el logotipo de tu empresa para incorporarlo
                  a tus flyers, menús, promociones, anuncios y otras piezas
                  publicitarias.
                </small>
              </div>
            </div>

            <label className="uploadBox referenceBox logoUploadBox">
              {referencePreview ? (
                <img src={referencePreview} alt="Logotipo del negocio" />
              ) : (
                <div>
                  <span className="logoUploadIcon">🏷️</span>
                  <strong>Subir logotipo</strong>
                  <small>
                    JPG, PNG o WEBP · máximo 5MB
                  </small>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleReferenceImage} />
            </label>

            <div className="logoCreatorCallout">
              <div className="logoCreatorIcon">✨</div>

              <div className="logoCreatorText">
                <strong>¿Tu negocio no tiene logotipo?</strong>
                <span>
                  Créalo desde cero con IA. No necesitas subir ninguna foto.
                </span>
              </div>

              <button
                type="button"
                className="createLogoBtn"
                onClick={() => {
                  setError("");
                  setNotice("");
                  setGeneratedLogo(null);
                  setShowLogoCreator(true);
                }}
              >
                Crear mi logotipo
              </button>
            </div>

            <button onClick={generateImage} disabled={loading} className="generateBtn">
              {loading ? "Creando publicidad..." : "Crear publicidad con IA"}
            </button>

            {error && <p className="error">{error}</p>}
          </div>

          <div className="panel">
            <h3>2. ¿Qué quieres crear?</h3>

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

            {preset === "menu" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige el tipo de menú</strong>
                  <small>Selecciona la opción que mejor se adapte a tu negocio.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {menuTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setMenuType(item.id)}
                      className={
                        menuType === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preset === "ad" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige el tipo de anuncio</strong>
                  <small>Define qué tipo de publicidad quieres generar.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {adTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setAdType(item.id)}
                      className={
                        adType === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preset === "flyer" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige el tipo de flyer</strong>
                  <small>Selecciona el formato comercial que necesitas.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {flyerTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setFlyerType(item.id)}
                      className={
                        flyerType === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preset === "promotion" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige el tipo de promoción</strong>
                  <small>Selecciona cómo quieres presentar tu oferta.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {promotionTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPromotionType(item.id)}
                      className={
                        promotionType === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preset === "marketplace" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige tu marketplace</strong>
                  <small>Selecciona primero dónde vas a publicar tu producto.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {marketplacePlatforms.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setMarketplacePlatform(item.id)}
                      className={
                        marketplacePlatform === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                <div className="categoryOptionsHeader secondary">
                  <strong>Ahora elige el tipo de imagen</strong>
                  <small>Define qué presentación necesitas para ese marketplace.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {marketplaceImageTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setMarketplaceImageType(item.id)}
                      className={
                        marketplaceImageType === item.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {preset === "social" && (
              <div className="categoryOptionsPanel">
                <div className="categoryOptionsHeader">
                  <strong>Elige el formato de red social</strong>
                  <small>Selecciona dónde vas a publicar tu diseño.</small>
                </div>

                <div className="categoryOptionsGrid">
                  {socialFormats.map((format) => (
                    <button
                      type="button"
                      key={format.id}
                      onClick={() => setSocialFormat(format.id)}
                      className={
                        socialFormat === format.id
                          ? "categoryOption active"
                          : "categoryOption"
                      }
                    >
                      <strong>{format.name}</strong>
                      <small>{format.aspectRatio}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="promptBox">
              
              <div className="freePromptNotice">
                <strong>✨ Describe tu publicidad</strong>
                <span>
                  Indica qué quieres comunicar, qué estilo buscas, colores,
                  oferta, texto, ambiente, público y plataforma.
                </span>
              </div>

              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ejemplos:
• Crea un anuncio moderno para Instagram con este producto.
• Haz un menú elegante para un restaurante.
• Crea una promoción de 20% de descuento con estilo llamativo.
• Presenta este producto sobre un fondo premium para redes sociales."
              />
              <small>
                Describe tu objetivo, oferta, estilo, formato o mensaje.
                La IA utilizará tu indicación para crear la pieza visual.
              </small>
            </div>
          </div>

          <div className="panel">
            <h3>3. Tu publicidad</h3>

            <div className="resultBox">
              {loading ? (
                <div className="loading">
                  <div className="spinner" />
                  <p>Creando tu publicidad con IA...</p>
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
                  <span>📢</span>
                  <div className="emptyResultText">
                    <h3>Tu publicidad aparecerá aquí</h3>
                    <p>✔ Imagen profesional para tu negocio</p>
                    <p>✔ Diseñada para vender y comunicar</p>
                    <p>✔ Lista para redes sociales</p>
                    <p>✔ Descarga inmediata</p>
                  </div>
                </div>
              )}
            </div>

            {output && (
              <button
                type="button"
                onClick={() => downloadGeneratedImage(output)}
                className="downloadBtn"
              >
                Descargar publicidad
              </button>
            )}
          </div>
        </div>
      </section>

      <section id="credits" className="creditsSection">
        <div className="sectionHeader">
          
<h2>Publicidad profesional sin mensualidad</h2>
          <p>
            Compra créditos cuando los necesites. 1 crédito = 1 generación con IA.
          </p>
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
          <span>Tu biblioteca</span>
          <h2>Últimas publicidades creadas</h2>
          <p>Historial temporal guardado en este dispositivo.</p>
        </div>

        {history.length === 0 ? (
          <p className="emptyHistory">Aún no has creado ninguna publicidad.</p>
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
                  <button
                    type="button"
                    onClick={() => downloadGeneratedImage(item.image)}
                  >
                    Descargar publicidad
                  </button>
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
          <span>🍔</span>
          <h3>Restaurantes</h3>
          <p>
            Crea menús, promociones y contenido visual para atraer clientes.
          </p>
        </div>

        <div className="feature">
          <span>🛍️</span>
          <h3>Tiendas y ecommerce</h3>
          <p>
            Convierte fotos sencillas de productos en imágenes comerciales.
          </p>
        </div>

        <div className="feature">
          <span>📱</span>
          <h3>Negocios locales</h3>
          <p>
            Crea anuncios y contenido para Instagram, Facebook y WhatsApp.
          </p>
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

        .heroProductCard {
          position: relative;
          padding: 18px;
          border-radius: 32px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 30px 90px rgba(0,0,0,0.4);
          backdrop-filter: blur(18px);
        }

        .heroProductHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          padding: 0 6px;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .productMockup {
          overflow: hidden;
          border-radius: 24px;
          background: #111827;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .productMockupImage {
          min-height: 330px;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 35%, rgba(245,158,11,0.5), transparent 28%),
            radial-gradient(circle at 50% 70%, rgba(239,68,68,0.42), transparent 35%),
            linear-gradient(145deg, #1f2937, #111827);
        }

        .productMockupImage span {
          width: 150px;
          height: 150px;
          display: grid;
          place-items: center;
          border-radius: 42px;
          font-size: 82px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 25px 70px rgba(0,0,0,0.35);
        }

        .productMockupContent {
          padding: 22px;
        }

        .productMockupContent small {
          color: #a78bfa;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .productMockupContent h3 {
          margin: 8px 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .productMockupContent p {
          margin: 0;
          color: rgba(255,255,255,0.58);
          line-height: 1.5;
        }

        .mockupTags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .mockupTags span {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          font-weight: 700;
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

        .logoTitle {
          margin-top: 24px;
        }

        .logoUploadBox {
          min-height: 180px;
          border-style: dashed;
        }

        .logoUploadBox > div {
          padding: 24px;
        }

        .logoUploadIcon {
          display: block;
          font-size: 36px;
          margin-bottom: 10px;
        }

        .logoCreatorCallout {
          margin-top: 14px;
          padding: 18px;
          border-radius: 20px;
          background:
            linear-gradient(
              135deg,
              rgba(139,92,246,0.12),
              rgba(6,182,212,0.08)
            );
          border: 1px solid rgba(139,92,246,0.25);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          align-items: center;
        }

        .logoCreatorIcon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(139,92,246,0.18);
          font-size: 24px;
        }

        .logoCreatorText {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .logoCreatorText strong {
          color: white;
          font-size: 14px;
        }

        .logoCreatorText span {
          color: rgba(255,255,255,0.55);
          font-size: 12px;
          line-height: 1.4;
        }

        .logoCreatorCallout .createLogoBtn {
          grid-column: 1 / -1;
          margin-top: 2px;
        }

        .createLogoBtn {
          width: 100%;
          margin-top: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.12);
          color: #ddd6fe;
          cursor: pointer;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .createLogoBtn:hover {
          background: rgba(139,92,246,0.22);
          border-color: rgba(139,92,246,0.75);
          transform: translateY(-1px);
        }

        .logoModalOverlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(14px);
        }

        .logoModal {
          position: relative;
          width: min(720px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          padding: 34px;
          border-radius: 30px;
          background:
            radial-gradient(circle at top right, rgba(6,182,212,0.12), transparent 35%),
            radial-gradient(circle at top left, rgba(124,58,237,0.18), transparent 40%),
            #0c0c18;
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 40px 120px rgba(0,0,0,0.55);
        }

        .logoModalClose {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: white;
          font-size: 24px;
          cursor: pointer;
        }

        .logoModalHeader {
          padding-right: 45px;
          margin-bottom: 28px;
        }

        .logoModalHeader > span {
          color: #a78bfa;
          font-size: 13px;
          font-weight: 800;
        }

        .logoModalHeader h2 {
          margin: 8px 0;
          font-size: clamp(30px, 5vw, 44px);
          letter-spacing: -0.05em;
        }

        .logoModalHeader p {
          margin: 0;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        .logoForm {
          display: grid;
          gap: 16px;
        }

        .logoForm label {
          display: grid;
          gap: 8px;
          color: rgba(255,255,255,0.9);
          font-weight: 800;
          font-size: 14px;
        }

        .logoForm input,
        .logoForm select,
        .logoForm textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          background: rgba(255,255,255,0.06);
          color: white;
          padding: 14px;
          font: inherit;
          outline: none;
        }

        .logoForm select option {
          color: #111827;
        }

        .logoForm textarea {
          min-height: 110px;
          resize: vertical;
        }

        .logoForm input:focus,
        .logoForm select:focus,
        .logoForm textarea:focus {
          border-color: rgba(139,92,246,0.7);
        }

        .logoCreditInfo {
          padding: 13px 15px;
          border-radius: 14px;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .logoCreditInfo strong {
          color: #ddd6fe;
        }

        .generateLogoBtn,
        .useLogoBtn {
          width: 100%;
          padding: 16px 18px;
          border: 0;
          border-radius: 17px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          font-weight: 900;
          cursor: pointer;
          font-size: 15px;
        }

        .generateLogoBtn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .generatedLogoArea {
          text-align: center;
        }

        .generatedLogoPreview {
          min-height: 320px;
          display: grid;
          place-items: center;
          padding: 20px;
          border-radius: 24px;
          background:
            linear-gradient(45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.04) 25%, transparent 25%),
            rgba(255,255,255,0.03);
          background-size: 28px 28px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .generatedLogoPreview img {
          width: 100%;
          max-width: 500px;
          max-height: 420px;
          object-fit: contain;
          border-radius: 18px;
        }

        .generatedLogoArea h3 {
          margin: 24px 0 8px;
          font-size: 26px;
        }

        .generatedLogoArea > p {
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        .logoResultActions {
          display: grid;
          gap: 10px;
          margin-top: 22px;
        }

        .downloadLogoBtn,
        .generateAnotherLogoBtn {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 14px 18px;
          border-radius: 16px;
          text-align: center;
          text-decoration: none;
          font-weight: 800;
          cursor: pointer;
        }

        .downloadLogoBtn {
          color: white;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .generateAnotherLogoBtn {
          color: #ddd6fe;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.25);
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

        .categoryOptionsPanel {
          margin-top: 18px;
          padding: 18px;
          border: 1px solid rgba(124, 92, 255, 0.28);
          border-radius: 18px;
          background:
            linear-gradient(
              180deg,
              rgba(124, 92, 255, 0.08),
              rgba(255, 255, 255, 0.025)
            );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            0 12px 30px rgba(0, 0, 0, 0.16);
        }

        .categoryOptionsPanel::before {
          content: "Paso adicional · Elige una opción";
          display: inline-flex;
          align-items: center;
          margin-bottom: 14px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(124, 92, 255, 0.12);
          border: 1px solid rgba(124, 92, 255, 0.24);
          color: rgba(218, 209, 255, 0.95);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .categoryOptionsHeader {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 14px;
        }

        .categoryOptionsHeader.secondary {
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .categoryOptionsHeader strong {
          color: #fff;
          font-size: 15px;
          line-height: 1.35;
        }

        .categoryOptionsHeader small {
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
          line-height: 1.45;
        }

        .categoryOptionsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .categoryOption {
          width: 100%;
          min-height: 58px;
          padding: 12px 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          background: rgba(255, 255,255, 0.035);
          color: rgba(255, 255, 255, 0.82);
          cursor: pointer;
          text-align: left;
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;
        }

        .categoryOption:hover {
          transform: translateY(-1px);
          border-color: rgba(124, 92, 255, 0.45);
          background: rgba(124, 92, 255, 0.08);
        }

        .categoryOption.active {
          border-color: rgba(139, 108, 255, 0.85);
          background:
            linear-gradient(
              180deg,
              rgba(124, 92, 255, 0.18),
              rgba(124, 92, 255, 0.08)
            );
          color: #fff;
          box-shadow:
            0 0 0 1px rgba(124, 92, 255, 0.1),
            0 10px 24px rgba(84, 56, 180, 0.14);
        }

        .categoryOption strong {
          display: block;
          margin: 0 0 3px;
          font-size: 13px;
          color: inherit;
        }

        .categoryOption small {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
        }

        .categoryOption.active small {
          color: rgba(255, 255, 255, 0.72);
        }

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

          .nav {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .navLinks {
            display: none;
          }

          .mockImage {
            height: 360px;
          }

          .heroProductCard {
            max-width: 720px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 620px) {
          .logoModalOverlay {
            padding: 10px;
          }

          .logoModal {
            padding: 24px 18px;
            border-radius: 24px;
          }

          .generatedLogoPreview {
            min-height: 240px;
          }

          .hero { padding-top: 22px; }
          .presetGrid { grid-template-columns: 1fr; }

          .categoryOptionsGrid {
            grid-template-columns: 1fr;
          }

          .categoryOptionsPanel {
            padding: 14px;
          }
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
