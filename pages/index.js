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
      <p>3 tipos de fotos que vendemos:</p>
      <ul>
        <li><b>Influencers:</b> 30 fotos pro en Tulum, café, gym</li>
        <li><b>Tiendas:</b> Fotos de producto estilo Amazon</li>
        <li><b>Negocios:</b> Tu local lleno y aesthetic para Google Maps</li>
      </ul>
      
      <h3>Prueba GRATIS con 3 fotos:</h3>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <br/><br/>
      <button onClick={handleGenerate} disabled={loading} style={{padding:'10px 20px', fontSize:16, background:'#000', color:'white', border:'none', borderRadius:8}}>
        {loading? 'Generando...' : 'Generar 3 fotos GRATIS'}
      </button>

      <div style={{marginTop:30}}>
        {photos.map((p,i) => (
          <div key={i} style={{position:'relative', display:'inline-block', margin:5}}>
            <img src={p} width={180} style={{borderRadius:8}} />
            <div style={{position:'absolute', bottom:5, right:5, background:'red', color:'white', padding:'2px 6px', fontSize:10}}>
              FotoIA.pro
            </div>
          </div>
        ))}
      </div>

      {photos.length > 0 && (
        <div style={{marginTop:20, padding:20, background:'#f0f0f0', borderRadius:8}}>
          <h3>¿Te gustaron? Quita la marca de agua + 27 fotos más por $299</h3>
          <a href="https://wa.me/529999999999?text=Quiero%20mis%2030%20fotos%20de%20FotoIA" 
             style={{background:'#25D366', color:'white', padding:'12px 24px', textDecoration:'none', borderRadius:8, display:'inline-block'}}>
            Pagar $299 por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
