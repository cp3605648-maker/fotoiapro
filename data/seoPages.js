const baseUrl = "https://www.fotoia.pro";

function getSeoCategory(slug) {
  if (
    slug.includes("amazon") ||
    slug.includes("mercado-libre") ||
    slug.includes("shopify") ||
    slug.includes("etsy") ||
    slug.includes("ebay") ||
    slug.includes("ecommerce") ||
    slug.includes("tienda-online")
  ) {
    return "ecommerce";
  }

  if (
    slug.includes("instagram") ||
    slug.includes("facebook") ||
    slug.includes("tiktok") ||
    slug.includes("whatsapp") ||
    slug.includes("pinterest") ||
    slug.includes("linkedin") ||
    slug.includes("redes-sociales")
  ) {
    return "redes-sociales";
  }

  if (
    slug.includes("restaurante") ||
    slug.includes("comida") ||
    slug.includes("menu") ||
    slug.includes("bebidas") ||
    slug.includes("postres") ||
    slug.includes("delivery") ||
    slug.includes("cafeteria")
  ) {
    return "restaurantes";
  }

  if (
    slug.includes("publicidad") ||
    slug.includes("anuncios") ||
    slug.includes("flyer") ||
    slug.includes("promociones") ||
    slug.includes("catalogo") ||
    slug.includes("branding") ||
    slug.includes("lanzamiento")
  ) {
    return "marketing";
  }

  if (
    slug.includes("calzado") ||
    slug.includes("ropa") ||
    slug.includes("cosmeticos") ||
    slug.includes("joyeria") ||
    slug.includes("relojes") ||
    slug.includes("electronica") ||
    slug.includes("muebles") ||
    slug.includes("decoracion") ||
    slug.includes("artesanias") ||
    slug.includes("bolsos") ||
    slug.includes("perfumes") ||
    slug.includes("alimentos")
  ) {
    return "sectores";
  }

  return "fotografia-producto";
}

function createSeoPage({
  slug,
  title,
  description,
  h1,
  subtitle,
  badge,
  cta,
  keyword,
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
    category: getSeoCategory(slug),

    benefits: [
      {
        title: "Producto fiel al original",
        text: `FotoIA Pro prioriza conservar la identidad real del producto al crear ${keyword}.`,
      },
      {
        title: "Presentación comercial",
        text: "Mejora fondo, iluminación, composición y apariencia para vender online.",
      },
      {
        title: "Lista para tu negocio",
        text: "Genera imágenes para ecommerce, redes sociales, publicidad y catálogos.",
      },
    ],

    useCases: [
      {
        title: "Ecommerce",
        text: `Utiliza ${keyword} para mejorar fichas y publicaciones de producto.`,
      },
      {
        title: "Publicidad",
        text: "Crea visuales profesionales para campañas, promociones y lanzamientos.",
      },
      {
        title: "Redes sociales",
        text: "Prepara contenido comercial para atraer atención hacia tus productos.",
      },
    ],

    prompts: [
      `Crea ${keyword} usando exactamente el producto de la imagen. Conserva su forma, color, logotipo, materiales y detalles reales.`,
      `Convierte esta foto en ${keyword} con iluminación profesional, composición comercial y un fondo que ayude a destacar el producto sin modificarlo.`,
    ],

    faqs: [
      {
        q: `¿Puedo crear ${keyword} con FotoIA Pro?`,
        a: `Sí. Sube una fotografía clara de tu producto y utiliza FotoIA Pro para crear ${keyword} con inteligencia artificial.`,
      },
      {
        q: "¿FotoIA Pro modifica el producto real?",
        a: "El objetivo es preservar la forma, color, branding y características visibles del producto mientras mejora su presentación comercial.",
      },
      {
        q: "¿Necesito saber diseño o edición?",
        a: "No. Sube la foto del producto, selecciona lo que quieres crear y describe el resultado comercial que necesitas.",
      },
    ],
  };
}

const commercialSeoPages = [
  {
    "slug": "foto-producto",
    "title": "Foto de Producto con IA | FotoIA Pro",
    "description": "Crea imágenes profesionales de producto para ecommerce, catálogos, anuncios y marketplaces.",
    "h1": "Foto de Producto con IA",
    "subtitle": "Crea imágenes profesionales de producto para ecommerce, catálogos, anuncios y marketplaces.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto con IA"
  },
  {
    "slug": "fotos-producto-ecommerce",
    "title": "Fotos de Producto para Ecommerce | FotoIA Pro",
    "description": "Prepara imágenes comerciales consistentes para tiendas online y fichas de producto.",
    "h1": "Fotos de Producto para Ecommerce",
    "subtitle": "Prepara imágenes comerciales consistentes para tiendas online y fichas de producto.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para ecommerce"
  },
  {
    "slug": "foto-amazon",
    "title": "Foto para Amazon con IA | FotoIA Pro",
    "description": "Crea imágenes de producto optimizadas para listings de Amazon.",
    "h1": "Foto para Amazon con IA",
    "subtitle": "Crea imágenes de producto optimizadas para listings de Amazon.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto para Amazon"
  },
  {
    "slug": "imagen-principal-amazon",
    "title": "Imagen Principal para Amazon | FotoIA Pro",
    "description": "Aísla tu producto sobre fondo blanco con presentación limpia para Amazon.",
    "h1": "Imagen Principal para Amazon",
    "subtitle": "Aísla tu producto sobre fondo blanco con presentación limpia para Amazon.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "imagen principal para Amazon"
  },
  {
    "slug": "imagen-secundaria-amazon",
    "title": "Imagen Secundaria para Amazon | FotoIA Pro",
    "description": "Genera una vista secundaria profesional y clara de tu producto.",
    "h1": "Imagen Secundaria para Amazon",
    "subtitle": "Genera una vista secundaria profesional y clara de tu producto.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "imagen secundaria para Amazon"
  },
  {
    "slug": "foto-mercado-libre",
    "title": "Foto para Mercado Libre con IA | FotoIA Pro",
    "description": "Mejora imágenes de producto para publicaciones de Mercado Libre.",
    "h1": "Foto para Mercado Libre con IA",
    "subtitle": "Mejora imágenes de producto para publicaciones de Mercado Libre.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto para Mercado Libre"
  },
  {
    "slug": "foto-shopify",
    "title": "Foto de Producto para Shopify | FotoIA Pro",
    "description": "Crea imágenes comerciales consistentes para tu tienda Shopify.",
    "h1": "Foto de Producto para Shopify",
    "subtitle": "Crea imágenes comerciales consistentes para tu tienda Shopify.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto para Shopify"
  },
  {
    "slug": "foto-etsy",
    "title": "Foto de Producto para Etsy | FotoIA Pro",
    "description": "Presenta productos de forma atractiva y profesional para Etsy.",
    "h1": "Foto de Producto para Etsy",
    "subtitle": "Presenta productos de forma atractiva y profesional para Etsy.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto para Etsy"
  },
  {
    "slug": "foto-ebay",
    "title": "Foto de Producto para eBay | FotoIA Pro",
    "description": "Crea imágenes claras y comerciales para publicaciones de eBay.",
    "h1": "Foto de Producto para eBay",
    "subtitle": "Crea imágenes claras y comerciales para publicaciones de eBay.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto para eBay"
  },
  {
    "slug": "foto-tienda-online",
    "title": "Fotos para Tienda Online | FotoIA Pro",
    "description": "Mejora la presentación visual de productos en cualquier ecommerce.",
    "h1": "Fotos para Tienda Online",
    "subtitle": "Mejora la presentación visual de productos en cualquier ecommerce.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos para tienda online"
  },
  {
    "slug": "foto-catalogo",
    "title": "Fotos para Catálogo con IA | FotoIA Pro",
    "description": "Crea imágenes consistentes para catálogos digitales e impresos.",
    "h1": "Fotos para Catálogo con IA",
    "subtitle": "Crea imágenes consistentes para catálogos digitales e impresos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos para catálogo"
  },
  {
    "slug": "catalogo-productos-ia",
    "title": "Catálogo de Productos con IA | FotoIA Pro",
    "description": "Transforma fotos sencillas en un catálogo comercial coherente.",
    "h1": "Catálogo de Productos con IA",
    "subtitle": "Transforma fotos sencillas en un catálogo comercial coherente.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "catálogo de productos con IA"
  },
  {
    "slug": "publicidad-productos-ia",
    "title": "Publicidad de Productos con IA | FotoIA Pro",
    "description": "Crea piezas visuales de producto para campañas y promociones.",
    "h1": "Publicidad de Productos con IA",
    "subtitle": "Crea piezas visuales de producto para campañas y promociones.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "publicidad de productos con IA"
  },
  {
    "slug": "anuncios-producto-ia",
    "title": "Anuncios de Producto con IA | FotoIA Pro",
    "description": "Genera anuncios visuales centrados en el producto para vender online.",
    "h1": "Anuncios de Producto con IA",
    "subtitle": "Genera anuncios visuales centrados en el producto para vender online.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "anuncios de producto con IA"
  },
  {
    "slug": "flyer-producto-ia",
    "title": "Flyer de Producto con IA | FotoIA Pro",
    "description": "Diseña flyers comerciales a partir de fotos reales de producto.",
    "h1": "Flyer de Producto con IA",
    "subtitle": "Diseña flyers comerciales a partir de fotos reales de producto.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "flyer de producto con IA"
  },
  {
    "slug": "promociones-producto-ia",
    "title": "Promociones de Producto con IA | FotoIA Pro",
    "description": "Crea piezas promocionales para descuentos, lanzamientos y ofertas.",
    "h1": "Promociones de Producto con IA",
    "subtitle": "Crea piezas promocionales para descuentos, lanzamientos y ofertas.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "promociones de producto con IA"
  },
  {
    "slug": "foto-instagram-producto",
    "title": "Fotos de Producto para Instagram | FotoIA Pro",
    "description": "Crea contenido comercial de producto para posts y campañas en Instagram.",
    "h1": "Fotos de Producto para Instagram",
    "subtitle": "Crea contenido comercial de producto para posts y campañas en Instagram.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para Instagram"
  },
  {
    "slug": "foto-facebook-producto",
    "title": "Fotos de Producto para Facebook | FotoIA Pro",
    "description": "Genera imágenes de producto para publicaciones y campañas de Facebook.",
    "h1": "Fotos de Producto para Facebook",
    "subtitle": "Genera imágenes de producto para publicaciones y campañas de Facebook.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para Facebook"
  },
  {
    "slug": "foto-tiktok-producto",
    "title": "Fotos de Producto para TikTok | FotoIA Pro",
    "description": "Prepara visuales comerciales para TikTok.",
    "h1": "Fotos de Producto para TikTok",
    "subtitle": "Prepara visuales comerciales para TikTok.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para TikTok"
  },
  {
    "slug": "foto-whatsapp-negocio",
    "title": "Fotos de Producto para WhatsApp Business | FotoIA Pro",
    "description": "Crea imágenes listas para catálogos, estados y ventas por WhatsApp.",
    "h1": "Fotos de Producto para WhatsApp Business",
    "subtitle": "Crea imágenes listas para catálogos, estados y ventas por WhatsApp.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para WhatsApp Business"
  },
  {
    "slug": "foto-pinterest-producto",
    "title": "Fotos de Producto para Pinterest | FotoIA Pro",
    "description": "Crea imágenes verticales atractivas para productos en Pinterest.",
    "h1": "Fotos de Producto para Pinterest",
    "subtitle": "Crea imágenes verticales atractivas para productos en Pinterest.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para Pinterest"
  },
  {
    "slug": "foto-linkedin-empresa",
    "title": "Imágenes de Producto para LinkedIn | FotoIA Pro",
    "description": "Presenta productos y marcas con una estética profesional para LinkedIn.",
    "h1": "Imágenes de Producto para LinkedIn",
    "subtitle": "Presenta productos y marcas con una estética profesional para LinkedIn.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "imágenes de producto para LinkedIn"
  },
  {
    "slug": "redes-sociales-producto",
    "title": "Fotos de Producto para Redes Sociales | FotoIA Pro",
    "description": "Adapta tus productos a formatos comerciales para distintas redes.",
    "h1": "Fotos de Producto para Redes Sociales",
    "subtitle": "Adapta tus productos a formatos comerciales para distintas redes.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para redes sociales"
  },
  {
    "slug": "fondos-producto-ia",
    "title": "Fondos para Productos con IA | FotoIA Pro",
    "description": "Cambia fondos sin perder la identidad del producto real.",
    "h1": "Fondos para Productos con IA",
    "subtitle": "Cambia fondos sin perder la identidad del producto real.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fondos para productos con IA"
  },
  {
    "slug": "quitar-fondo-producto",
    "title": "Quitar Fondo de Producto | FotoIA Pro",
    "description": "Aísla productos para ecommerce, catálogos y marketplaces.",
    "h1": "Quitar Fondo de Producto",
    "subtitle": "Aísla productos para ecommerce, catálogos y marketplaces.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "quitar fondo de producto"
  },
  {
    "slug": "fondo-blanco-producto",
    "title": "Fondo Blanco para Producto | FotoIA Pro",
    "description": "Crea presentaciones limpias sobre blanco para ecommerce.",
    "h1": "Fondo Blanco para Producto",
    "subtitle": "Crea presentaciones limpias sobre blanco para ecommerce.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fondo blanco para producto"
  },
  {
    "slug": "fondo-premium-producto",
    "title": "Fondo Premium para Producto | FotoIA Pro",
    "description": "Genera escenas elegantes que hagan destacar tu producto.",
    "h1": "Fondo Premium para Producto",
    "subtitle": "Genera escenas elegantes que hagan destacar tu producto.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fondo premium para producto"
  },
  {
    "slug": "mejorar-foto-producto",
    "title": "Mejorar Foto de Producto con IA | FotoIA Pro",
    "description": "Mejora iluminación, encuadre y presentación comercial del producto.",
    "h1": "Mejorar Foto de Producto con IA",
    "subtitle": "Mejora iluminación, encuadre y presentación comercial del producto.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "mejorar foto de producto"
  },
  {
    "slug": "iluminacion-producto-ia",
    "title": "Iluminación Profesional para Productos | FotoIA Pro",
    "description": "Mejora la luz de tus fotos para una apariencia de estudio.",
    "h1": "Iluminación Profesional para Productos",
    "subtitle": "Mejora la luz de tus fotos para una apariencia de estudio.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "iluminación de producto con IA"
  },
  {
    "slug": "foto-producto-profesional",
    "title": "Foto de Producto Profesional | FotoIA Pro",
    "description": "Convierte una foto sencilla en una imagen comercial de alta calidad.",
    "h1": "Foto de Producto Profesional",
    "subtitle": "Convierte una foto sencilla en una imagen comercial de alta calidad.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto profesional"
  },
  {
    "slug": "foto-producto-fondo-minimalista",
    "title": "Foto de Producto con Fondo Minimalista | FotoIA Pro",
    "description": "Crea composiciones limpias y modernas para ecommerce.",
    "h1": "Foto de Producto con Fondo Minimalista",
    "subtitle": "Crea composiciones limpias y modernas para ecommerce.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto con fondo minimalista"
  },
  {
    "slug": "foto-producto-fondo-lujo",
    "title": "Foto de Producto Estilo Premium | FotoIA Pro",
    "description": "Presenta tu producto con una estética sofisticada de marca.",
    "h1": "Foto de Producto Estilo Premium",
    "subtitle": "Presenta tu producto con una estética sofisticada de marca.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto premium"
  },
  {
    "slug": "foto-producto-3d-look",
    "title": "Presentación 3D de Producto con IA | FotoIA Pro",
    "description": "Crea una apariencia tridimensional comercial sin reemplazar el producto real.",
    "h1": "Presentación 3D de Producto con IA",
    "subtitle": "Crea una apariencia tridimensional comercial sin reemplazar el producto real.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "presentación 3D de producto"
  },
  {
    "slug": "foto-producto-sombra-realista",
    "title": "Foto de Producto con Sombra Realista | FotoIA Pro",
    "description": "Añade profundidad visual conservando el producto fiel al original.",
    "h1": "Foto de Producto con Sombra Realista",
    "subtitle": "Añade profundidad visual conservando el producto fiel al original.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "foto de producto con sombra realista"
  },
  {
    "slug": "foto-producto-calzado",
    "title": "Fotos de Calzado con IA | FotoIA Pro",
    "description": "Crea imágenes profesionales para tenis, zapatos y sandalias.",
    "h1": "Fotos de Calzado con IA",
    "subtitle": "Crea imágenes profesionales para tenis, zapatos y sandalias.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de calzado"
  },
  {
    "slug": "foto-producto-ropa",
    "title": "Fotos de Ropa para Ecommerce | FotoIA Pro",
    "description": "Mejora imágenes de prendas para tiendas online y catálogos.",
    "h1": "Fotos de Ropa para Ecommerce",
    "subtitle": "Mejora imágenes de prendas para tiendas online y catálogos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de ropa para ecommerce"
  },
  {
    "slug": "foto-producto-cosmeticos",
    "title": "Fotos de Cosméticos con IA | FotoIA Pro",
    "description": "Crea imágenes comerciales para skincare, maquillaje y belleza.",
    "h1": "Fotos de Cosméticos con IA",
    "subtitle": "Crea imágenes comerciales para skincare, maquillaje y belleza.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de cosméticos"
  },
  {
    "slug": "foto-producto-joyeria",
    "title": "Fotos de Joyería con IA | FotoIA Pro",
    "description": "Presenta piezas con fondos limpios e iluminación cuidada.",
    "h1": "Fotos de Joyería con IA",
    "subtitle": "Presenta piezas con fondos limpios e iluminación cuidada.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de joyería"
  },
  {
    "slug": "foto-producto-relojes",
    "title": "Fotos de Relojes con IA | FotoIA Pro",
    "description": "Crea imágenes premium para relojes y accesorios.",
    "h1": "Fotos de Relojes con IA",
    "subtitle": "Crea imágenes premium para relojes y accesorios.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de relojes"
  },
  {
    "slug": "foto-producto-electronica",
    "title": "Fotos de Electrónica con IA | FotoIA Pro",
    "description": "Mejora imágenes de gadgets y dispositivos para ecommerce.",
    "h1": "Fotos de Electrónica con IA",
    "subtitle": "Mejora imágenes de gadgets y dispositivos para ecommerce.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de electrónica"
  },
  {
    "slug": "foto-producto-muebles",
    "title": "Fotos de Muebles con IA | FotoIA Pro",
    "description": "Presenta muebles en composiciones comerciales limpias y atractivas.",
    "h1": "Fotos de Muebles con IA",
    "subtitle": "Presenta muebles en composiciones comerciales limpias y atractivas.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de muebles"
  },
  {
    "slug": "foto-producto-decoracion",
    "title": "Fotos de Decoración con IA | FotoIA Pro",
    "description": "Crea imágenes de productos para hogar y decoración.",
    "h1": "Fotos de Decoración con IA",
    "subtitle": "Crea imágenes de productos para hogar y decoración.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de decoración"
  },
  {
    "slug": "foto-producto-artesanias",
    "title": "Fotos de Artesanías con IA | FotoIA Pro",
    "description": "Mejora la presentación visual de productos artesanales.",
    "h1": "Fotos de Artesanías con IA",
    "subtitle": "Mejora la presentación visual de productos artesanales.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de artesanías"
  },
  {
    "slug": "foto-producto-bolsos",
    "title": "Fotos de Bolsos con IA | FotoIA Pro",
    "description": "Crea imágenes comerciales para bolsos, mochilas y accesorios.",
    "h1": "Fotos de Bolsos con IA",
    "subtitle": "Crea imágenes comerciales para bolsos, mochilas y accesorios.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de bolsos"
  },
  {
    "slug": "foto-producto-perfumes",
    "title": "Fotos de Perfumes con IA | FotoIA Pro",
    "description": "Presenta fragancias con estética premium y comercial.",
    "h1": "Fotos de Perfumes con IA",
    "subtitle": "Presenta fragancias con estética premium y comercial.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de perfumes"
  },
  {
    "slug": "foto-producto-alimentos",
    "title": "Fotos de Alimentos Empacados | FotoIA Pro",
    "description": "Mejora empaques y productos alimenticios para venta online.",
    "h1": "Fotos de Alimentos Empacados",
    "subtitle": "Mejora empaques y productos alimenticios para venta online.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de alimentos empacados"
  },
  {
    "slug": "foto-restaurante",
    "title": "Fotos para Restaurante con IA | FotoIA Pro",
    "description": "Crea imágenes comerciales para platillos, menús y promociones.",
    "h1": "Fotos para Restaurante con IA",
    "subtitle": "Crea imágenes comerciales para platillos, menús y promociones.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos para restaurante"
  },
  {
    "slug": "foto-comida",
    "title": "Fotos de Comida con IA | FotoIA Pro",
    "description": "Haz que platillos y alimentos se vean más atractivos sin inventar productos.",
    "h1": "Fotos de Comida con IA",
    "subtitle": "Haz que platillos y alimentos se vean más atractivos sin inventar productos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de comida"
  },
  {
    "slug": "menu-restaurante-ia",
    "title": "Menú de Restaurante con IA | FotoIA Pro",
    "description": "Crea piezas visuales para menús a partir de fotos reales de platillos.",
    "h1": "Menú de Restaurante con IA",
    "subtitle": "Crea piezas visuales para menús a partir de fotos reales de platillos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "menú de restaurante con IA"
  },
  {
    "slug": "menu-whatsapp-ia",
    "title": "Menú para WhatsApp con IA | FotoIA Pro",
    "description": "Crea imágenes de menú listas para compartir por WhatsApp.",
    "h1": "Menú para WhatsApp con IA",
    "subtitle": "Crea imágenes de menú listas para compartir por WhatsApp.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "menú para WhatsApp con IA"
  },
  {
    "slug": "menu-cafeteria-ia",
    "title": "Menú para Cafetería con IA | FotoIA Pro",
    "description": "Diseña presentaciones visuales para bebidas, postres y alimentos.",
    "h1": "Menú para Cafetería con IA",
    "subtitle": "Diseña presentaciones visuales para bebidas, postres y alimentos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "menú para cafetería con IA"
  },
  {
    "slug": "foto-producto-bebidas",
    "title": "Fotos de Bebidas con IA | FotoIA Pro",
    "description": "Crea imágenes comerciales para botellas, vasos y bebidas.",
    "h1": "Fotos de Bebidas con IA",
    "subtitle": "Crea imágenes comerciales para botellas, vasos y bebidas.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de bebidas"
  },
  {
    "slug": "foto-producto-postres",
    "title": "Fotos de Postres con IA | FotoIA Pro",
    "description": "Mejora imágenes de postres para menús, redes y delivery.",
    "h1": "Fotos de Postres con IA",
    "subtitle": "Mejora imágenes de postres para menús, redes y delivery.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de postres"
  },
  {
    "slug": "foto-producto-comida-rapida",
    "title": "Fotos de Comida Rápida con IA | FotoIA Pro",
    "description": "Crea imágenes comerciales para hamburguesas, pizzas y combos.",
    "h1": "Fotos de Comida Rápida con IA",
    "subtitle": "Crea imágenes comerciales para hamburguesas, pizzas y combos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de comida rápida"
  },
  {
    "slug": "foto-producto-delivery",
    "title": "Fotos para Delivery con IA | FotoIA Pro",
    "description": "Prepara imágenes atractivas para apps y ventas de comida a domicilio.",
    "h1": "Fotos para Delivery con IA",
    "subtitle": "Prepara imágenes atractivas para apps y ventas de comida a domicilio.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos para delivery"
  },
  {
    "slug": "foto-producto-marca",
    "title": "Fotos de Producto para Marca | FotoIA Pro",
    "description": "Crea una presentación visual coherente con la identidad de tu negocio.",
    "h1": "Fotos de Producto para Marca",
    "subtitle": "Crea una presentación visual coherente con la identidad de tu negocio.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para marca"
  },
  {
    "slug": "branding-producto-ia",
    "title": "Branding Visual de Producto con IA | FotoIA Pro",
    "description": "Integra producto, logotipo y estilo de marca en piezas comerciales.",
    "h1": "Branding Visual de Producto con IA",
    "subtitle": "Integra producto, logotipo y estilo de marca en piezas comerciales.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "branding visual de producto con IA"
  },
  {
    "slug": "lanzamiento-producto-ia",
    "title": "Lanzamiento de Producto con IA | FotoIA Pro",
    "description": "Crea piezas visuales para presentar nuevos productos.",
    "h1": "Lanzamiento de Producto con IA",
    "subtitle": "Crea piezas visuales para presentar nuevos productos.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "lanzamiento de producto con IA"
  },
  {
    "slug": "foto-producto-mayoreo",
    "title": "Fotos de Producto para Mayoreo | FotoIA Pro",
    "description": "Crea imágenes consistentes para catálogos y ventas B2B.",
    "h1": "Fotos de Producto para Mayoreo",
    "subtitle": "Crea imágenes consistentes para catálogos y ventas B2B.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para mayoreo"
  },
  {
    "slug": "foto-producto-emprendedores",
    "title": "Fotos de Producto para Emprendedores | FotoIA Pro",
    "description": "Mejora imágenes sin estudio fotográfico para pequeños negocios.",
    "h1": "Fotos de Producto para Emprendedores",
    "subtitle": "Mejora imágenes sin estudio fotográfico para pequeños negocios.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para emprendedores"
  },
  {
    "slug": "foto-producto-pymes",
    "title": "Fotos de Producto para PyMEs | FotoIA Pro",
    "description": "Crea contenido comercial accesible para pequeñas y medianas empresas.",
    "h1": "Fotos de Producto para PyMEs",
    "subtitle": "Crea contenido comercial accesible para pequeñas y medianas empresas.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "fotos de producto para PyMEs"
  },
  {
    "slug": "estudio-fotografico-virtual",
    "title": "Estudio Fotográfico Virtual para Productos | FotoIA Pro",
    "description": "Convierte fotos sencillas en presentaciones de estudio con inteligencia artificial.",
    "h1": "Estudio Fotográfico Virtual para Productos",
    "subtitle": "Convierte fotos sencillas en presentaciones de estudio con inteligencia artificial.",
    "badge": "Imágenes comerciales con IA",
    "cta": "Crear imagen profesional",
    "keyword": "estudio fotográfico virtual para productos"
  }
];

export const seoPages = commercialSeoPages.map(createSeoPage);
