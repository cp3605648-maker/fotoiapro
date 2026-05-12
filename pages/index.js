import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // COMPRIME CUALQUIER IMAGEN A <4MB AUTOMÁTICAMENTE
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

          // Máximo 1024px del lado más largo
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

          // Empieza con calidad 0.9 y baja hasta que pese <3.5MB
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

    setLoading(true);

    try {
      // COMPRIMIMOS AQUÍ. Ya no importa el peso original
      const compressedBlob = await compressImage(file);

      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onload = async () => {
        try {
          const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ image: reader.result })
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.detail || data.error || 'Error al generar');
          }

          setPhotos(data.photos || []);
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

  return (
    <div style={{fontFamily:'Arial', maxWidth:600, margin:'40px auto', padding:20}}>
      <h1>FotoIA.pro</h1>
      <h2>Convierte tus fotos en dinero</h2>
      <h3>Prueba GRATIS con 1 foto</h3>
      <p style={{color:'#666', fontSize:14}}>Sube cualquier foto. La optimizamos automáticamente.</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/><br/>

      <button
        onClick={handleGenerate}
        disabled={loading ||!file}
        style={{padding:'10px 20px', fontSize:16, background:'#000', color:'white', cursor:'pointer'}}
      >
        {loading? 'Optimizando y generando...' : 'Generar 1 foto GRATIS'}
      </button>

      {error && <p style={{color:'red', marginTop:20}}>{error}</p>}

      <div style={{marginTop:30}}>
        {photos.map((p,i) => (
          <img key={i} src={p} width={180} style={{borderRadius:8, margin:5}} alt="generada" />
        ))}
      </div>
    </div>
  );
}
