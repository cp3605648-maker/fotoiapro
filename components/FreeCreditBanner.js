export default function FreeCreditBanner() {
  return (
    <div style={{
      width: "100%",
      margin: "16px 0 24px",
      padding: "16px 18px",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
      color: "white",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      textAlign: "center",
      fontWeight: "700"
    }}>
      🎁 Regístrate gratis y recibe <strong>1 crédito</strong> para probar FotoIA.pro
      <div style={{
        marginTop: "6px",
        fontSize: "14px",
        fontWeight: "500",
        opacity: 0.95
      }}>
        Crea tu cuenta, sube una foto y genera tu primera edición con IA.
      </div>
    </div>
  );
}
