import LegalLayout from '../components/LegalLayout';

export default function Refunds() {
  return (
    <LegalLayout
      title="Política de Reembolsos"
      updated="Mayo 2026"
    >
      <section>
        <h2 className="text-xl font-bold mb-2">
          1. Naturaleza digital del servicio
        </h2>
        <p>
          FotoIA Pro utiliza inteligencia artificial y servicios computacionales
          externos para procesar imágenes. Cada generación puede consumir
          créditos y recursos digitales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          2. Créditos utilizados
        </h2>
        <p>
          Los créditos utilizados normalmente no son reembolsables debido al
          costo operativo asociado al procesamiento IA.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          3. Casos revisables
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Cargos duplicados</li>
          <li>Errores de cobro</li>
          <li>Fallos técnicos comprobables</li>
          <li>Problemas atribuibles a FotoIA Pro</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          4. Resultados IA
        </h2>
        <p>
          Los resultados generados mediante inteligencia artificial pueden
          variar según imagen, estilo y modelo utilizado. Preferencias
          personales o diferencias creativas no garantizan reembolso.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          5. Pagos externos
        </h2>
        <p>
          Los pagos pueden procesarse mediante Stripe u otros proveedores
          sujetos a sus propias políticas.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">
          6. Contacto
        </h2>
        <p>
          Para soporte o revisión de casos utiliza nuestros canales oficiales.
        </p>
      </section>
    </LegalLayout>
  );
}
