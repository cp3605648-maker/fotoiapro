import { useEffect, useState } from 'react';
import Head from 'next/head';

const CATEGORIES = [
  { 
    id: 'linkedin', 
    name: '💼 LinkedIn', 
    example: 'Con traje formal, fondo gris de oficina, sonriendo profesional'
  },
  { 
    id: 'casual', 
    name: '😎 Casual Pro', 
    example: 'Ropa casual elegante, en cafetería, luz natural, look confiado'
  },
  { 
    id: 'creativo', 
    name: '🎨 Creativo', 
    example: 'Fondo colorido, luz artística, estilo moderno y creativo'
  },
  { 
    id: 'dating', 
    name: '❤️ Tinder', 
    example: 'Sonrisa natural, al aire libre, ropa que te favorece, atractivo'
  }
];

export default function Home() {
  const [packCount, setPackCount] = useState(0);
  const [freeUsed, setFreeUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
    setErrorMsg('');
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryClick = (example) => {
    setCustomPrompt(example);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setErrorMsg('Error: ' + e.message);
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setErrorMsg('');
    
    if (!photo) {
      setErrorMsg('Sube una foto primero');
      return;
    }

    if (!customPrompt.trim()) {
      setErrorMsg('Describe qué quieres que haga la IA con tu foto');
      return;
    }

    if (freeUsed && packCount <= 0) {
      handleCheckout();
      return;
    }

    setLoading(true);

    const prevFreeUsed = freeUsed;
    const prevPackCount = packCount;

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
            prompt: customPrompt
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
          setCustomPrompt('');
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      } catch (e) {
        setErrorMsg(e.message);
        localStorage.setItem('fotoia_free_used', String(prevFreeUsed));
        localStorage.setItem('fotoia_pack', String(prevPackCount));
        setFreeUsed(prevFreeUsed);
        setPackCount(prevPackCount);
      }
      setLoading(false);
    };
  };

  const canGenerate = !freeUsed || packCount > 0;
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
            background: packCount > 0 || !freeUsed ? '#e8f5e9' : '#fff3e0', 
            borderRadius: '12px', 
            color: packCount > 0 || !freeUsed ? '#2e7d32' : '#e65100',
            border: `2px solid ${packCount > 0 || !freeUsed ? '#4caf50' : '#ff9800'}`
          }}>
            {packCount > 0 ? (
              <p style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                Pack Activo: {packCount} fotos restantes
              </p>
            ) : !freeUsed ? (
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
                maxHeight: '250px',
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

          <div style={{ margin: '20px 0', textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              1. ¿Qué tipo de foto quieres? Toca para usar de ejemplo:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.example)}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{cat.name}</div>
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Toca para copiar</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ margin: '16px 0', textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              2. Describe qué quieres que haga la IA *OBLIGATORIO*:
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ej: Con traje azul marino, fondo de oficina moderna, sonriendo, luz profesional..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: errorMsg && !customPrompt ? '2px solid #f44336' : '1px solid #ddd',
                fontSize: '14px',
                minHeight: '80px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
            <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 0 0' }}>
              Sé específico: ropa, fondo, expresión, iluminación
            </p>
          </div>

          {errorMsg && (
            <div style={{
              padding: '12px',
              background: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              fontSize: '14px',
              margin: '16px 0'
            }}>
              {errorMsg}
            </div>
          )}
          
          <button 
            onClick={showPayButton ? handleCheckout : handleGenerate}
            disabled={loading}
            style={{
              padding: '16px 24px',
              background: loading ? '#ccc' : showPayButton ? '#9C27B0' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%',
              marginTop: '8px'
            }}
          >
            {loading ? 'Generando... 30-40 seg' : 
             showPayButton ? 'Comprar Pack 10 Fotos - $9 USD' : 
             'Generar Foto Pro'}
          </button>

          <p style={{ fontSize: '12px', color: '#999', marginTop: '16px' }}>
            💡 Tip: Usa selfies claras, de frente, con buena luz y sin objetos en la cara
          </p>
        </div>
      </div>
    </>
  );
}
