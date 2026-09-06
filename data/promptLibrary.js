const baseUrl = "https://www.fotoia.pro";

export const promptLibrary = [
  {
    slug: "prompts-producto",
    title: "Prompts para Fotos de Producto con IA",
    description:
      "Prompts para crear imágenes profesionales de producto para ecommerce, catálogos y publicidad.",
    canonical: `${baseUrl}/prompts/prompts-producto`,
    category: "Producto",
    prompts: [
      "Convierte esta fotografía en una imagen profesional de producto con iluminación de estudio y composición comercial. Conserva exactamente el producto.",
      "Aísla visualmente el producto y crea una presentación limpia para ecommerce sin modificar forma, color, branding ni detalles.",
      "Crea una fotografía premium del producto con fondo minimalista, sombras realistas y acabado comercial.",
    ],
    ctaUrl: "/foto-producto",
  },
  {
    slug: "prompts-ecommerce",
    title: "Prompts para Fotos de Ecommerce con IA",
    description:
      "Prompts listos para preparar imágenes de producto para tiendas online y fichas de ecommerce.",
    canonical: `${baseUrl}/prompts/prompts-ecommerce`,
    category: "Ecommerce",
    prompts: [
      "Crea una imagen limpia para ecommerce manteniendo el producto fiel al original y utilizando iluminación profesional.",
      "Presenta este producto sobre un fondo limpio y comercial, con encuadre centrado y alta claridad visual.",
      "Genera una imagen secundaria de ecommerce mostrando el producto claramente desde una perspectiva comercial.",
    ],
    ctaUrl: "/fotos-producto-ecommerce",
  },
  {
    slug: "prompts-publicidad-productos",
    title: "Prompts para Publicidad de Productos con IA",
    description:
      "Prompts para crear anuncios, promociones y contenido comercial a partir de fotografías reales de productos.",
    canonical: `${baseUrl}/prompts/prompts-publicidad-productos`,
    category: "Publicidad",
    prompts: [
      "Crea un anuncio moderno donde este producto sea el elemento principal. Conserva el producto real y utiliza una composición diseñada para publicidad.",
      "Genera una pieza promocional profesional para redes sociales sin inventar precios, descuentos, claims ni información que no haya proporcionado.",
      "Presenta este producto en una composición premium de lanzamiento manteniendo intacta su identidad visual.",
    ],
    ctaUrl: "/publicidad-productos-ia",
  },
];
