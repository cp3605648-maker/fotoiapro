import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);

  const handleGenerate = async () => {
    if (!file) return alert('Sube una foto primero');
    setLoading(true);
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ image: reader.result })
      });
      const data = await res.json();
      setPhotos(data.photos || []);
      setLoading(false);
    };
  };

  return (
    <div style={{fontFamily:'Arial', maxWidth:600, margin:'40px auto', padding:20}}>
      <h1>FotoIA.pro</h1>
      <h2>Convierte tus fotos en dinero</h2>
      <h3>Prueba GRATIS con 3 fotos:</h3>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <br/><br/>
      <button onClick={handleGenerate} disabled={loading} style={{padding:'10px 20px', fontSize:16, background:'#000', color:'white', border:'none', borderRadius:8}}>
        {loading? 'Generando...' : 'Generar 3 fotos GRATIS'}
      </button>
      <div style={{marginTop:30}}>
        {photos.map((p,i) => (
          <img key={i} src={p} width={180} style={{borderRadius:8, margin:5}} />
        ))}
      </div>
    </div>
  );
}
