import LegalLayout from '../components/LegalLayout';

export default function Contact() {
  return (
    <LegalLayout title="Contacto y Soporte" updated="Mayo 2026">
      <section>
        <h2 className="text-xl font-bold mb-2">Soporte</h2>
        <p>
          Si necesitas ayuda con FotoIA Pro, pagos, créditos o resultados generados
          por inteligencia artificial, puedes contactarnos mediante nuestros canales oficiales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Correo de contacto</h2>
        <p>
          Email: <a className="text-blue-600" href="mailto:americaspd@hotmail.com">americaspd@hotmail.com</a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Tiempo de respuesta</h2>
        <p>
          Procuramos responder solicitudes de soporte en un plazo razonable durante días hábiles.
        </p>
      </section>
    </LegalLayout>
  );
}
