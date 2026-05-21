import LegalLayout from '../components/LegalLayout';

export default function Refunds() {
  return (
    <LegalLayout title="Política de Reembolsos" updated="Mayo 2026">

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          1. Naturaleza digital del servicio
        </h2>

        <p>
          FotoIA Pro utiliza inteligencia artificial y recursos computacionales
          externos para procesar imágenes. Cada generación puede consumir recursos
          y créditos digitales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          2. Créditos utilizados
        </h2>

        <p>
          Los créditos consumidos normalmente no son reembolsables debido al costo
          asociado al procesamiento mediante IA.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          3. Casos revisables
        </h2>

        <p>
          Podemos revisar solicitudes relacionadas con:
        </p>

        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Cargos duplicados</li>
          <li>Cobros incorrectos</li>
          <li>Errores técnicos comprobables</li>
          <li>Fallos atribuibles directamente a la plataforma</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          4. Resultados IA
        </h2>

        <p>
          Los resultados pueden variar según fotografía, estilo y modelo utilizado.
          Diferencias creativas o preferencias personales no constituyen automáticamente
          motivo de reembolso.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          5. Pagos externos
        </h2>

        <p>
          Los pagos pueden procesarse mediante Stripe u otros proveedores externos
          sujetos a sus propias políticas.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          6. Contacto
        </h2>

        <p>
          Para revisión de pagos o soporte utiliza los canales oficiales de FotoIA Pro.
        </p>
      </section>

    </LegalLayout>
  );
}
