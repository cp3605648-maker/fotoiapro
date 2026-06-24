import SeoLandingPage from "../components/seo/SeoLandingPage";

export default function FotoLinkedIn() {
  return (
    <SeoLandingPage
      title="Foto para LinkedIn con IA | FotoIA Pro"
      description="Crea una foto profesional para LinkedIn con inteligencia artificial. Mejora fondo, iluminación, ropa y calidad sin perder tu identidad."
      canonical="https://www.fotoia.pro/foto-linkedin"
      h1="Foto Profesional para LinkedIn con Inteligencia Artificial"
      subtitle="Convierte una foto normal en una imagen profesional para LinkedIn, CV, entrevistas, marca personal o perfil corporativo."
      badge="Foto profesional para LinkedIn"
      cta="Crear mi foto para LinkedIn"
      keyword="foto para LinkedIn"
      benefits={[
        {
          title: "Conserva tu identidad",
          text: "La edición busca mantener tu rostro y mejorar solo el estilo visual de la fotografía.",
        },
        {
          title: "Apariencia profesional",
          text: "Crea una imagen con fondo corporativo, iluminación cuidada y presentación más formal.",
        },
        {
          title: "Lista para redes profesionales",
          text: "Ideal para LinkedIn, CV, currículum, entrevistas, portafolio o marca personal.",
        },
      ]}
      useCases={[
        {
          title: "Foto para LinkedIn",
          text: "Mejora tu perfil profesional con una imagen más clara, elegante y confiable.",
        },
        {
          title: "Foto para CV",
          text: "Genera una imagen adecuada para currículum, solicitudes de empleo o perfiles laborales.",
        },
        {
          title: "Retrato ejecutivo",
          text: "Crea una foto con estilo corporativo, fondo limpio y presencia profesional.",
        },
      ]}
      prompts={[
        "Convierte esta foto en una imagen profesional para LinkedIn, conserva mi rostro, mejora la iluminación y agrega fondo corporativo elegante.",
        "Hazme una foto estilo ejecutivo para LinkedIn con ropa formal, fondo de oficina moderna y aspecto profesional.",
        "Mejora esta selfie para usarla en mi CV y perfil de LinkedIn sin cambiar mi identidad.",
      ]}
      faqs={[
        {
          q: "¿FotoIA Pro cambia mi rostro?",
          a: "No. La idea es conservar tu identidad y mejorar la foto con fondo, iluminación, ropa y estilo profesional.",
        },
        {
          q: "¿Puedo usar la foto en LinkedIn?",
          a: "Sí. Puedes crear una imagen profesional ideal para perfil de LinkedIn, CV, marca personal o búsqueda de empleo.",
        },
        {
          q: "¿Necesito saber editar fotos?",
          a: "No. Solo subes tu imagen, describes el resultado que quieres y FotoIA Pro genera la versión mejorada con IA.",
        },
      ]}
    />
  );
}
