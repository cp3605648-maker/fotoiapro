import { useState, useEffect } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [style, setStyle] = useState('profesional');
  const [hasPaid, setHasPaid] = useState(false);
  const [freeUsed, setFreeUsed] = useState(false);

  // Checa si ya pagó o si ya usó el gratis
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === 'true') {
      setHasPaid(true);
      localStorage.setItem('fotoia_paid', 'true');
    }
    if (localStorage.getItem('fotoia_paid') === 'true') setHasPaid(true);
    if (localStorage.getItem('fotoia_free_used') === 'true') setFreeUsed(true);
  }, []);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1024;
          if (width > height && width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          let quality = 0.9;
          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (blob.size > 3.5 * 1024 && quality > 0.3) {
                  quality -= 0.1;
                  tryCompress();
                } else {
                  resolve(blob);
                }
              },
              'image/jpeg',
              quality
            );
          };
          tryCompress();
        };
      };
    });
  };

  const handleGenerate = async () => {
    setError('');
    if (!file) {
      setError("Primero sube una foto");
      return;
    }

    if (!hasPaid && freeUsed) {
      setError("Ya usaste tu foto gratis. Compra el pack para continuar.");
      return;
    }

    setLoading(true);
    try {
      const compressedBlob = await compressImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onload = async () => {
        try {
          const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              image: reader.result,
              style: style,
              paid: hasPaid
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.detail || data.error || 'Error al generar');

          setPhotos(data.photos || []);
          if (!hasPaid) {
            localStorage.setItem('fotoia_free_used', 'true');
            setFreeUsed(true);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    } catch (err) {
      setError("Error al comprimir imagen");
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', { method: 'POST' });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div style={{fontFamily:'Arial', maxWidth:600, margin:'40px auto', padding:20}}>
      <h1>FotoIA.pro</h1>
      <h2>Convierte tus fotos en dinero</h2>

      {!hasPaid &&!freeUsed && <h3 style={{color:'green'}}>Prueba GRATIS con 1 foto</h3>}
      {freeUsed &&!hasPaid && <h3 style={{color:'#ff6b00'}}>Ya usaste tu foto gratis</h3>}
      {hasPaid && <h3 style={{color:'blue'}}>Pack Activo: 10 fotos</h3>}

      <p style={{color:'#666', fontSize:14}}>1. Sube tu foto 2. Elige el estilo 3. Genera</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{marginBottom:15}}
      />

      <div style={{marginBottom:15}}>
        <label style={{display:'block', marginBottom:8, fontWeight:'bold'}}>¿Qué quieres hacer?</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          style={{padding:'10px', fontSize:16, width:'100%', borderRadius:6, border:'1px solid #ccc'}}
        >
          <option value="profesional">Foto Profesional - LinkedIn/CV</option>
          <option value="producto">Foto para Productos - Ecommerce</option>
          <option value="negocio">Foto para Negocios - Branding</option>
        </select>
      </div>

      {(!freeUsed || hasPaid)? (
        <button
          onClick={handleGenerate}
          disabled={loading ||!file}
          style={{padding:'12px 20px', fontSize:16, background:'#000', color:'white', cursor:'pointer', width:'100%', border:'none', borderRadius:6}}
        >
          {loading? 'Generando...' : 'Generar Foto'}
        </button>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{padding:'12px 20px', fontSize:16, background:'#635bff', color:'white', cursor:'pointer', width:'100%', border:'none', borderRadius:6}}
        >
          {loading? 'Cargando...' : 'Comprar Pack 10 Fotos - $9 USD'}
        </button>
      )}

      {error && <p style={{color:'red', marginTop:20}}>{error}</p>}

      <div style={{marginTop:30, display:'flex', flexWrap:'wrap', gap:10}}>
        {photos.map((p,i) => (
          <img key={i} src={p} width={180} style={{borderRadius:8}} alt="generada" />
        ))}
      </div>
    </div>
  );
}
