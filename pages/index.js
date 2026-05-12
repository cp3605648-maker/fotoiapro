import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');

    if (!file) {
      setError("Primero sube una foto");
      return;
    }

    if (file.size > 4 * 1024) {
      setError("La foto es muy pesada. Máximo 4MB. Usa una captura de pantalla");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
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
  };

  return (
    <div style={{fontFamily:'Arial', maxWidth:600, margin:'40px auto', padding:20}}>
      <h1>FotoIA.pro</h1>
      <h2>Convierte tus fotos en dinero</h2>
      <h3>Prueba GRATIS con 1 foto</h3>

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
        {loading? 'Generando...' : 'Generar 1 foto GRATIS'}
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
