import LegalLayout from '../components/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout title="Política de Privacidad" updated="Mayo 2026">

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          1. Información recopilada
        </h2>

        <p>
          FotoIA Pro puede recopilar imágenes subidas, datos técnicos del navegador,
          preferencias básicas y datos necesarios para operar la plataforma.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          2. Uso de imágenes
        </h2>

        <p>
          Las imágenes se utilizan únicamente para procesar solicitudes mediante
          inteligencia artificial y entregar resultados al usuario.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          3. Servicios externos
        </h2>

        <p>
          FotoIA Pro utiliza proveedores externos para operar correctamente:
        </p>

        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Replicate — procesamiento IA</li>
          <li>Vercel — hosting e infraestructura</li>
          <li>Stripe — pagos digitales</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          4. Cookies y localStorage
        </h2>

        <p>
          El sitio puede utilizar almacenamiento local y tecnologías similares
          para recordar preferencias o mejorar experiencia.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          5. Seguridad
        </h2>

        <p>
          Implementamos medidas razonables para reducir riesgos de acceso no autorizado.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          6. Contacto
        </h2>

        <p>
          Para dudas relacionadas con privacidad o datos utiliza los canales
          oficiales de FotoIA Pro.
        </p>
      </section>

    </LegalLayout>
  );
}
