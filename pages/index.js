import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [packCount, setPackCount] = useState(0);
  const [freeUsed, setFreeUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPackCount(parseInt(localStorage.getItem('fotoia_pack') || '0'));
    setFreeUsed(localStorage.getItem('fotoia_free_used') === 'true');
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === 'true') {
      localStorage.setItem('fotoia_pack', 10);
      localStorage.setItem('fotoia_free_used', 'true');
      window.history.replaceState({}, document.title, window.location.pathname);
      alert('¡Pago exitoso! Ya tienes 10 fotos listas.');
      window.location.reload();
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      alert('Error: ' + e.message);
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!photo) {
      alert('Sube una foto primero');
      return;
    }

    if (freeUsed && packCount <= 0) {
      handleCheckout();
      return;
    }

    setLoading(true);

    // Guardar estado antes por si falla
    const prevFreeUsed = freeUsed;
    const prevPackCount = packCount;

    // Restar foto
    if (!freeUsed) {
      localStorage.setItem('fotoia_free_used', 'true');
      setFreeUsed(true);
    } else {
      const newCount = packCount - 1;
      localStorage.setItem('fotoia_pack', newCount);
      setPackCount(newCount);
    }

    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      const base64 = reader.result;
      
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            image: base64,
            prompt: "professional corporate headshot, wearing business suit, neutral background, studio lighting, sharp focus, 8k"
          })
        });
        
        const data = await res.json();
        
        if (data.image) {
          const link = document.createElement('a');
          link.href = data.image;
          link.download = `foto-pro-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          alert('¡Lista! Tu foto pro se descargó');
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      } catch (e) {
        alert('Error generando: ' + e.message);
        // Regresar el crédito si falló
        localStorage.setItem('fotoia_free_used', String(prevFreeUsed));
        localStorage.setItem('fotoia_pack', String(prevPackCount));
        setFreeUsed(prevFreeUsed);
        setPackCount(prevPackCount);
      }
      setLoading(false);
    };
  };

  const canGenerate =!freeUsed || packCount > 0;
  const showPayButton = freeUsed && packCount <= 0;

  return (
    <>
      <Head>
        <title>FotolA.pro - Convierte tus fotos en dinero</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        background: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>FotolA.pro</h1>
          <p style={{ color: '#666', margin: '0 0 24px 0' }}>Convierte tus fotos en dinero</p>
          
          <div style={{ 
            margin: '20px 0', 
            padding: '16px', 
            background: packCount > 0 ||!freeUsed? '#e8f5e9' : '#fff3e0', 
            borderRadius: '12px', 
            color: packCount > 0 ||!freeUsed? '#2e7d32' : '#e65100',
            border: `2px solid ${packCount > 0 ||!freeUsed? '#4caf50' : '#ff9800'}`
          }}>
            {packCount > 0? (
              <p style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                Pack Activo: {packCount} fotos restantes
              </p>
            ) :!freeUsed? (
              <p style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                Tienes 1 foto GRATIS para probar
              </p>
            ) : (
              <p style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                Sin créditos. Compra un pack para seguir
              </p>
            )}
          </div>

          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '12px',
                margin: '16px 0'
              }}
            />
          )}
          
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            style={{ 
              margin: '16px 0', 
              display: 'block', 
              width: '100%',
              padding: '12px',
              border: '2px dashed #ddd',
              borderRadius: '8px'
            }} 
          />
          
          <button 
            onClick={showPayButton? handleCheckout : handleGenerate}
            disabled={loading}
            style={{
              padding: '16px 24px',
              background: loading? '#ccc' : showPayButton? '#9C27B0' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '8px'
            }}
          >
            {loading? 'Generando foto... 30 seg' : 
             showPayButton? 'Comprar Pack 10 Fotos - $9 USD' : 
             'Generar Foto Pro'}
          </button>

          <p style={{ fontSize: '12px', color: '#999', marginTop: '16px' }}>
            Tarda 20-40 seg en generar. La foto se descarga automática.
          </p>
        </div>
      </div>
    </>
  );
}
