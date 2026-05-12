import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [packCount, setPackCount] = useState(0);
  const [freeUsed, setFreeUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

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

    // Si ya gastó la gratis y no tiene pack, mandar a pagar
    if (freeUsed && packCount <= 0) {
      handleCheckout();
      return;
    }

    setLoading(true);

    // Restar foto ANTES de generar
    if (!freeUsed) {
      localStorage.setItem('fotoia_free_used', 'true');
      setFreeUsed(true);
    } else {
      const newCount = packCount - 1;
      localStorage.setItem('fotoia_pack', newCount);
      setPackCount(newCount);
    }

    // Aquí va tu lógica de Replicate
    alert('Generando foto... Aquí conectas con /api/generate');
    setLoading(false);
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
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1>FotolA.pro</h1>
        <p>Convierte tus fotos en dinero</p>
        
        <div style={{ 
          margin: '20px 0', 
          padding: '15px', 
          background: packCount > 0? '#e8f5e9' : '#fff3e0', 
          borderRadius: '8px', 
          color: packCount > 0? '#2e7d32' : '#e65100'
        }}>
          {packCount > 0? (
            <p style={{ fontWeight: 'bold', margin: 0 }}>
              Pack Activo: {packCount} fotos restantes
            </p>
          ) :!freeUsed? (
            <p style={{ fontWeight: 'bold', margin: 0 }}>
              Tienes 1 foto GRATIS para probar
            </p>
          ) : (
            <p style={{ fontWeight: 'bold', margin: 0 }}>
              Sin créditos. Compra un pack para seguir
            </p>
          )}
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setPhoto(e.target.files[0])}
          style={{ margin: '20px 0', display: 'block', width: '100%' }} 
        />
        
        <button 
          onClick={showPayButton? handleCheckout : handleGenerate}
          disabled={loading}
          style={{
            padding: '14px 28px',
            background: showPayButton? '#9C27B0' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          {loading? 'Cargando...' : 
           showPayButton? 'Comprar Pack 10 Fotos - $9 USD' : 
           'Generar Foto Pro'}
        </button>
      </div>
    </>
  );
}
