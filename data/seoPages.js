const baseUrl = "https://www.fotoia.pro";

function createSeoPage({
  slug,
  name,
  title,
  description,
  h1,
  subtitle,
  badge,
  cta,
  keyword,
  benefits,
  useCases,
  prompts,
}) {
  return {
    slug,
    title,
    description,
    canonical: `${baseUrl}/${slug}`,
    h1,
    subtitle,
    badge,
    cta,
    keyword,
    benefits,
    useCases,
    prompts,
    faqs: [
      {
        q: `¿Puedo crear ${keyword} con FotoIA Pro?`,
        a: `Sí. FotoIA Pro te permite transformar una imagen usando inteligencia artificial para crear ${keyword} de forma rápida y sencilla.`,
      },
      {
        q: "¿La IA cambia mi rostro?",
        a: "La intención es conservar tu identidad y mejorar elementos como fondo, iluminación, estilo, ropa o calidad visual.",
      },
      {
        q: "¿Necesito saber editar fotos?",
        a: "No. Solo subes tu imagen, describes el resultado que quieres y FotoIA Pro genera la versión editada con IA.",
      },
    ],
  };
}

export const seoPages = [
  createSeoPage({
    slug: "foto-linkedin",
    name: "LinkedIn",
    title: "Foto para LinkedIn con IA | FotoIA Pro",
    description: "Crea una foto profesional para LinkedIn con inteligencia artificial. Mejora fondo, iluminación, ropa y calidad sin perder tu identidad.",
    h1: "Foto Profesional para LinkedIn con Inteligencia Artificial",
    subtitle: "Convierte una foto normal en una imagen profesional para LinkedIn, CV, entrevistas, marca personal o perfil corporativo.",
    badge: "Foto profesional para LinkedIn",
    cta: "Crear mi foto para LinkedIn",
    keyword: "foto para LinkedIn",
    benefits: [
      { title: "Conserva tu identidad", text: "Mantiene tu rostro y mejora el estilo visual." },
      { title: "Apariencia profesional", text: "Fondo corporativo, iluminación cuidada y presentación formal." },
      { title: "Lista para perfiles laborales", text: "Ideal para LinkedIn, CV, entrevistas y marca personal." },
    ],
    useCases: [
      { title: "Perfil LinkedIn", text: "Mejora tu imagen profesional." },
      { title: "CV", text: "Genera una foto adecuada para empleo." },
      { title: "Retrato ejecutivo", text: "Crea presencia corporativa." },
    ],
    prompts: [
      "Convierte esta foto en una imagen profesional para LinkedIn, conserva mi rostro, mejora la iluminación y agrega fondo corporativo elegante.",
      "Hazme una foto estilo ejecutivo para LinkedIn con ropa formal y fondo de oficina moderna.",
    ],
  }),

  createSeoPage({
    slug: "foto-instagram",
    name: "Instagram",
    title: "Foto para Instagram con IA | FotoIA Pro",
    description: "Crea fotos atractivas para Instagram con inteligencia artificial. Mejora estilo, fondo, iluminación y calidad visual.",
    h1: "Foto para Instagram con Inteligencia Artificial",
    subtitle: "Transforma tus fotos en imágenes llamativas para perfil, publicaciones, historias y contenido de redes sociales.",
    badge: "Fotos para redes sociales",
    cta: "Crear foto para Instagram",
    keyword: "foto para Instagram",
    benefits: [
      { title: "Más impacto visual", text: "Crea imágenes más atractivas para redes." },
      { title: "Estilos personalizados", text: "Pide looks urbanos, lifestyle, luxury o cinematográficos." },
      { title: "Lista para publicar", text: "Ideal para perfil, feed, historias y marca personal." },
    ],
    useCases: [
      { title: "Foto de perfil", text: "Mejora tu imagen principal." },
      { title: "Contenido lifestyle", text: "Crea fotos para publicaciones." },
      { title: "Marca personal", text: "Refuerza tu presencia digital." },
    ],
    prompts: [
      "Haz esta foto más atractiva para Instagram, con iluminación profesional, fondo moderno y estilo lifestyle.",
      "Convierte esta imagen en una foto de perfil llamativa para redes sociales.",
    ],
  }),

  createSeoPage({
    slug: "foto-shopify",
    name: "Shopify",
    title: "Foto de Producto para Shopify con IA | FotoIA Pro",
    description: "Mejora fotos de productos para Shopify con IA. Crea fondos limpios, iluminación profesional y apariencia comercial.",
    h1: "Foto de Producto para Shopify con Inteligencia Artificial",
    subtitle: "Optimiza imágenes de productos para tu tienda online con fondos limpios, mejor iluminación y estilo profesional.",
    badge: "Fotos para ecommerce",
    cta: "Crear foto para Shopify",
    keyword: "foto de producto para Shopify",
    benefits: [
      { title: "Imagen comercial", text: "Haz que tus productos se vean más profesionales." },
      { title: "Fondos limpios", text: "Crea fondos blancos, minimalistas o de catálogo." },
      { title: "Mejor presentación", text: "Ideal para tiendas online y anuncios." },
    ],
    useCases: [
      { title: "Producto ecommerce", text: "Mejora fotos para vender online." },
      { title: "Catálogo", text: "Crea imágenes limpias y consistentes." },
      { title: "Anuncios", text: "Prepara imágenes para campañas." },
    ],
    prompts: [
      "Mejora esta foto de producto para Shopify con fondo blanco, iluminación profesional y apariencia de catálogo.",
      "Convierte esta imagen en una foto comercial limpia para ecommerce.",
    ],
  }),

  createSeoPage({
    slug: "foto-youtube",
    name: "YouTube",
    title: "Foto para YouTube con IA | FotoIA Pro",
    description: "Crea imágenes para YouTube con IA. Mejora fotos para perfil, miniaturas, banners y contenido visual.",
    h1: "Foto para YouTube con Inteligencia Artificial",
    subtitle: "Crea imágenes atractivas para canal, miniaturas, banners y contenido de YouTube usando IA.",
    badge: "Contenido para YouTube",
    cta: "Crear foto para YouTube",
    keyword: "foto para YouTube",
    benefits: [
      { title: "Más presencia visual", text: "Crea imágenes que llamen la atención." },
      { title: "Ideal para creadores", text: "Perfecta para canal, perfil y contenido." },
      { title: "Estilo profesional", text: "Mejora calidad, fondo e iluminación." },
    ],
    useCases: [
      { title: "Foto de canal", text: "Mejora tu imagen como creador." },
      { title: "Miniatura", text: "Crea base visual para thumbnails." },
      { title: "Banner", text: "Genera imágenes para branding." },
    ],
    prompts: [
      "Convierte esta foto en una imagen profesional para canal de YouTube con estilo moderno y fondo llamativo.",
      "Mejora esta imagen para usarla como foto de creador de contenido.",
    ],
  }),

  createSeoPage({
    slug: "foto-tiktok",
    name: "TikTok",
    title: "Foto para TikTok con IA | FotoIA Pro",
    description: "Crea fotos llamativas para TikTok con inteligencia artificial. Mejora tu perfil, estilo visual y contenido.",
    h1: "Foto para TikTok con Inteligencia Artificial",
    subtitle: "Transforma tus imágenes en fotos modernas, creativas y listas para redes sociales.",
    badge: "Foto para TikTok",
    cta: "Crear foto para TikTok",
    keyword: "foto para TikTok",
    benefits: [
      { title: "Estilo moderno", text: "Crea imágenes con apariencia actual y atractiva." },
      { title: "Ideal para perfil", text: "Mejora tu foto principal de TikTok." },
      { title: "Contenido llamativo", text: "Genera visuales para destacar." },
    ],
    useCases: [
      { title: "Perfil TikTok", text: "Mejora tu primera impresión." },
      { title: "Contenido viral", text: "Crea imágenes para publicaciones." },
      { title: "Marca personal", text: "Refuerza tu imagen digital." },
    ],
    prompts: [
      "Haz esta foto más llamativa para TikTok, con estilo moderno, colores vibrantes y buena iluminación.",
      "Convierte esta selfie en una foto creativa para perfil de TikTok.",
    ],
  }),

  createSeoPage({
    slug: "foto-whatsapp",
    name: "WhatsApp",
    title: "Foto de Perfil para WhatsApp con IA | FotoIA Pro",
    description: "Crea una foto de perfil para WhatsApp con IA. Mejora iluminación, fondo y apariencia sin complicarte.",
    h1: "Foto de Perfil para WhatsApp con Inteligencia Artificial",
    subtitle: "Mejora tu foto de perfil con un estilo limpio, atractivo y profesional usando IA.",
    badge: "Foto de perfil",
    cta: "Crear foto para WhatsApp",
    keyword: "foto de perfil para WhatsApp",
    benefits: [
      { title: "Perfil más cuidado", text: "Mejora tu imagen personal." },
      { title: "Fondo limpio", text: "Cambia escenarios o elimina distracciones." },
      { title: "Resultado rápido", text: "Crea una foto lista para usar." },
    ],
    useCases: [
      { title: "Perfil personal", text: "Mejora tu foto cotidiana." },
      { title: "Perfil profesional", text: "Úsala para trabajo o negocios." },
      { title: "Foto social", text: "Crea una imagen más atractiva." },
    ],
    prompts: [
      "Mejora esta foto para usarla como perfil de WhatsApp, con fondo limpio y buena iluminación.",
      "Convierte esta imagen en una foto de perfil natural, clara y atractiva.",
    ],
  }),

  createSeoPage({
    slug: "foto-luxury",
    name: "Luxury",
    title: "Foto Estilo Luxury con IA | FotoIA Pro",
    description: "Crea fotos estilo lujo con inteligencia artificial. Genera looks premium, fondos elegantes y estética exclusiva.",
    h1: "Foto Estilo Luxury con Inteligencia Artificial",
    subtitle: "Transforma tus fotos con una estética premium, elegante y de alto impacto visual.",
    badge: "Estilo luxury",
    cta: "Crear foto luxury",
    keyword: "foto estilo luxury",
    benefits: [
      { title: "Look premium", text: "Crea una imagen elegante y sofisticada." },
      { title: "Fondos exclusivos", text: "Genera escenarios de lujo o alto nivel." },
      { title: "Ideal para marca personal", text: "Dale más fuerza visual a tu imagen." },
    ],
    useCases: [
      { title: "Retrato luxury", text: "Imagen elegante para redes." },
      { title: "Marca personal", text: "Crea presencia premium." },
      { title: "Contenido aspiracional", text: "Ideal para lifestyle." },
    ],
    prompts: [
      "Convierte esta foto en una imagen estilo luxury, con iluminación elegante, fondo premium y apariencia sofisticada.",
      "Haz esta foto más exclusiva, con estilo de marca de lujo y acabado profesional.",
    ],
  }),

  createSeoPage({
    slug: "foto-playa",
    name: "Playa",
    title: "Foto en Playa con IA | FotoIA Pro",
    description: "Crea fotos en la playa con inteligencia artificial. Cambia el fondo, mejora la luz y genera escenas tropicales.",
    h1: "Foto en Playa con Inteligencia Artificial",
    subtitle: "Transforma tu imagen con fondos de playa, luz natural, ambiente tropical y estilo vacacional.",
    badge: "Fondo de playa",
    cta: "Crear foto en playa",
    keyword: "foto en playa con IA",
    benefits: [
      { title: "Fondo tropical", text: "Cambia el escenario a una playa realista." },
      { title: "Luz natural", text: "Mejora colores, brillo y ambiente." },
      { title: "Estilo vacacional", text: "Ideal para redes y contenido lifestyle." },
    ],
    useCases: [
      { title: "Foto de viaje", text: "Crea una escena vacacional." },
      { title: "Redes sociales", text: "Genera contenido atractivo." },
      { title: "Lifestyle", text: "Transforma tu foto con ambiente tropical." },
    ],
    prompts: [
      "Coloca esta foto en una playa tropical al atardecer, conserva mi rostro y mejora la iluminación.",
      "Cambia el fondo a una playa con mar azul, arena clara y luz natural.",
    ],
  }),

  createSeoPage({
    slug: "foto-dubai",
    name: "Dubái",
    title: "Foto en Dubái con IA | FotoIA Pro",
    description: "Crea fotos con fondo de Dubái usando IA. Genera escenarios urbanos, lujo, rascacielos y estilo premium.",
    h1: "Foto en Dubái con Inteligencia Artificial",
    subtitle: "Convierte tu foto en una imagen con fondo de Dubái, estilo urbano, lujo moderno y apariencia premium.",
    badge: "Fondo Dubái",
    cta: "Crear foto en Dubái",
    keyword: "foto en Dubái con IA",
    benefits: [
      { title: "Escenario premium", text: "Crea fondos urbanos inspirados en Dubái." },
      { title: "Estética de lujo", text: "Ideal para redes y marca personal." },
      { title: "Cambio de fondo", text: "Transforma tu entorno sin salir de casa." },
    ],
    useCases: [
      { title: "Foto urbana", text: "Crea fondo de ciudad moderna." },
      { title: "Contenido luxury", text: "Imagen aspiracional y elegante." },
      { title: "Redes sociales", text: "Destaca con escenarios premium." },
    ],
    prompts: [
      "Coloca esta foto en Dubái con rascacielos modernos, estilo luxury y luz dorada.",
      "Cambia el fondo a una ciudad moderna tipo Dubái, conserva mi rostro y mejora la calidad.",
    ],
  }),

  createSeoPage({
    slug: "foto-autos",
    name: "Autos",
    title: "Foto con Autos con IA | FotoIA Pro",
    description: "Crea fotos con autos usando inteligencia artificial. Agrega autos deportivos, escenarios urbanos y estilo cinematográfico.",
    h1: "Foto con Autos con Inteligencia Artificial",
    subtitle: "Transforma tus imágenes agregando autos, escenarios premium y estilo visual de alto impacto.",
    badge: "Fotos con autos",
    cta: "Crear foto con autos",
    keyword: "foto con autos con IA",
    benefits: [
      { title: "Autos deportivos", text: "Agrega vehículos como elemento visual." },
      { title: "Escena realista", text: "Crea fondos urbanos o cinematográficos." },
      { title: "Impacto visual", text: "Ideal para redes y contenido aspiracional." },
    ],
    useCases: [
      { title: "Foto con auto", text: "Agrega un vehículo a la escena." },
      { title: "Estilo deportivo", text: "Crea una imagen más potente." },
      { title: "Contenido social", text: "Ideal para publicaciones llamativas." },
    ],
    prompts: [
      "Agrega un auto deportivo de lujo junto a mí, con fondo urbano nocturno y estilo cinematográfico.",
      "Convierte esta foto en una escena con un auto premium, iluminación profesional y acabado realista.",
    ],
  }),

  createSeoPage({
    slug: "foto-corporativa",
    name: "Corporativo",
    title: "Foto Corporativa con IA | FotoIA Pro",
    description: "Crea fotos corporativas con inteligencia artificial. Mejora imagen profesional, fondo, ropa e iluminación.",
    h1: "Foto Corporativa con Inteligencia Artificial",
    subtitle: "Genera una imagen profesional para empresa, perfil ejecutivo, equipo de trabajo o presentación corporativa.",
    badge: "Foto corporativa",
    cta: "Crear foto corporativa",
    keyword: "foto corporativa",
    benefits: [
      { title: "Imagen profesional", text: "Ideal para empresa, perfiles y presentaciones." },
      { title: "Fondo corporativo", text: "Genera escenarios limpios y elegantes." },
      { title: "Ropa formal", text: "Crea una apariencia más ejecutiva." },
    ],
    useCases: [
      { title: "Perfil ejecutivo", text: "Mejora tu imagen laboral." },
      { title: "Equipo empresarial", text: "Crea una estética profesional." },
      { title: "Presentación", text: "Usa la foto en perfiles y documentos." },
    ],
    prompts: [
      "Convierte esta foto en una imagen corporativa profesional, con fondo de oficina, ropa formal y buena iluminación.",
      "Hazme una foto ejecutiva para empresa, conservando mi rostro y mejorando la calidad.",
    ],
  }),

  createSeoPage({
    slug: "foto-anime",
    name: "Anime",
    title: "Foto estilo Anime con IA | FotoIA Pro",
    description: "Convierte fotos en estilo anime con inteligencia artificial. Crea imágenes artísticas, creativas y llamativas.",
    h1: "Foto Estilo Anime con Inteligencia Artificial",
    subtitle: "Transforma tu imagen en una versión artística estilo anime para redes, avatares o contenido creativo.",
    badge: "Estilo anime",
    cta: "Crear foto anime",
    keyword: "foto estilo anime",
    benefits: [
      { title: "Transformación artística", text: "Crea una versión anime de tu imagen." },
      { title: "Ideal para avatares", text: "Úsala en redes, perfiles o comunidades." },
      { title: "Estilo creativo", text: "Genera imágenes originales y llamativas." },
    ],
    useCases: [
      { title: "Avatar anime", text: "Crea una imagen para perfil." },
      { title: "Arte digital", text: "Transforma tu foto en ilustración." },
      { title: "Redes sociales", text: "Crea contenido diferente." },
    ],
    prompts: [
      "Convierte esta foto en una ilustración estilo anime, conserva rasgos principales y agrega iluminación artística.",
      "Haz una versión anime de esta imagen con estilo moderno, colores vivos y acabado profesional.",
    ],
  }),
];
