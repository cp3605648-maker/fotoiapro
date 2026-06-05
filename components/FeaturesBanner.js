export default function FeaturesBanner() {
  return (
    <div
      style={{
        width: "100%",
        margin: "20px 0",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center"
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "12px"
        }}
      >
        ⭐ Más de 20 estilos y transformaciones con IA
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "10px",
          marginTop: "16px"
        }}
      >
        <div>✅ Cambia fondos y escenarios</div>
        <div>✅ Cambia ropa y apariencia</div>
        <div>✅ Fotos profesionales</div>
        <div>✅ Estilo Anime</div>
        <div>✅ Estilo Cyberpunk</div>
        <div>✅ Portadas de revista</div>
        <div>✅ Luxury Branding</div>
        <div>✅ Estilo Cinemático</div>
        <div>✅ Agrega objetos</div>
        <div>✅ Agrega accesorios</div>
        <div>✅ Cambia iluminación</div>
        <div>✅ Cambia colores</div>
        <div>✅ Cambia ciudades y lugares</div>
        <div>✅ Cambia poses</div>
        <div>✅ Agrega vehículos</div>
        <div>✅ Retratos profesionales</div>
        <div>✅ Fotos para redes sociales</div>
        <div>✅ Fotos corporativas</div>
        <div>✅ Fotos creativas</div>
        <div>✅ Mucho más...</div>
      </div>

      <div
        style={{
          marginTop: "18px",
          fontWeight: "700",
          color: "#06b6d4"
        }}
      >
        🎁 Regístrate y recibe 1 crédito gratis para probar FotoIA.pro
      </div>
    </div>
  );
}
