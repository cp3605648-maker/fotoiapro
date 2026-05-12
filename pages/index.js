import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [packCount, setPackCount] = useState(0);
  const [freeUsed, setFreeUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carga estado del localStorage
    setPackCount(parseInt(localStorage.getItem('fotoia_pack') || '0'));
    setFreeUsed(localStorage.getItem('fotoia_free_used') === 'true');
    
    // Detecta pago exitoso de Stripe
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === 'true') {
      localStorage.setItem('fotoia_pack', 10);
      localStorage.setItem('fotoia_free_used', 'true');
      window.history.replaceState({}, document.title, window.location.pathname);
      alert('¡Pago exitoso! Ya tienes 10 fotos listas.');
      window.location.reload();
    }
  }, []);

  const handleGenerate = async () => {
    if (packCount <= 0 && freeUsed) {
      // Ya usó la gratis y no tiene pack -> mandar a pagar
      setLoading(true);
      try {
        const res = await fetch('/api/checkout', { method: 'POST' });
        const { url } = await res.json();
        window.location.href = url;
      } catch (e) {
        alert('Error: ' + e.message);
        setLoading(false);
      }
      return;
    }

    // Restar foto
    if (!freeUsed) {
      localStorage.setItem('fotoia_free_used', 'true');
      setFreeUsed(true);
    } else {
      const newCount = packCount - 1;
      localStorage.setItem('fotoia_pack', newCount);
      setPackCount(newCount);
    }

    alert('Generando foto... Aquí va tu lógica de Replicate');
  };

  const canGenerate = !freeUsed || packCount > 0;

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
        
        <div style={{ margin: '20px 0', padding: '10px', background: '#e8f5e9', borderRadius: '4px', color: '#2e7d32' }}>
          <p style={{ fontWeight: 'bold', color: '#1976d2', margin: 0 }}>
            Pack Activo: {packCount} fotos restantes
          </p>
          {!freeUsed && <p style={{ margin: '5px 0 0 0' }}>Tienes 1 foto gratis</p>}
        </div>
        
        <input type="file" accept="image/*" style={{ margin: '20px 0' }} />
        
        <button 
          onClick={handleGenerate}
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: canGenerate ? '#4CAF50' : '#9C27B0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Cargando...' : canGenerate ? 'Generar Foto' : 'Comprar Pack 10 Fotos - $9 USD'}
        </button>
      </div>
    </>
  );
}
