import LegalLayout from '../components/LegalLayout';

export default function Terms() {
  return (
    <LegalLayout title="Términos y Condiciones" updated="Mayo 2026">
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          1. Servicio
        </h2>

        <p>
          FotoIA Pro ofrece herramientas digitales para transformar imágenes mediante
          inteligencia artificial. Los resultados pueden variar según la imagen original,
          el estilo elegido y la disponibilidad de los modelos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          2. Uso permitido
        </h2>

        <p>
          El usuario se compromete a utilizar el servicio únicamente para fines legales,
          creativos, personales o comerciales permitidos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          3. Imágenes del usuario
        </h2>

        <p>
          El usuario declara contar con permisos necesarios sobre las imágenes que sube
          y procesa en la plataforma.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          4. Resultados IA
        </h2>

        <p>
          Los resultados son generados mediante IA y no se garantiza similitud perfecta,
          exactitud absoluta ni resultados idénticos en cada generación.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          5. Créditos y pagos
        </h2>

        <p>
          Algunas funciones consumen créditos digitales. Los pagos pueden ser procesados
          mediante proveedores externos como Stripe.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          6. Contacto
        </h2>

        <p>
          Para soporte o dudas, utiliza los canales oficiales disponibles en FotoIA Pro.
        </p>
      </section>
    </LegalLayout>
  );
}
