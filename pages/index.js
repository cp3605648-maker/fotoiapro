import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Comprime imagen a 1024px para evitar CUDA out of memory
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        const maxSize = 1024;
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleGenerate = async () => {
    if (!image || !description) {
      alert('Por favor, sube una imagen y escribe qué quieres hacer');
      return;
    }

    setLoading(true);
    setError('');
    setOutput(null);

    try {
      const resizedBase64 = await resizeImage(image);
      
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: resizedBase64, 
          prompt: description 
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || data.error);
      }
      
      setOutput(data.output);
      console.log('Prompt usado:', data.usedPrompt);
      
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>FotoIA</h1>
      
      <div className="inspirate-section">
        <h3>Inspírate</h3>
        <p className="text-gray-600 mb-4">Aquí puedes crear:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎨 Logos</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">💼 Fotos Profesionales</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🛍️ Fotos Comerciales</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">✨ Haz tu Branding</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🏠 Decora un Espacio</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">👕 Cambia Ropa</span>
        </div>
      </div>

      <div className="upload-section">
        <h3>Sube tu imagen</h3>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && <p className="mt-2 text-sm text-green-600">✓ Imagen cargada: {image.name}</p>}
      </div>

      <div className="description-section">
        <h3>Describe qué quieres hacer</h3>
        <p className="text-sm text-gray-600 mb-2">
          Solo escribe en pocas palabras. La IA mejorará tu idea automáticamente.
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: ponlo en una playa, cambia la camisa a azul, haz un logo minimalista"
          rows="3"
        />
      </div>

      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="generate-btn"
      >
        {loading ? 'Generando... Esto tarda 20-40 seg' : 'Editar Imagen con IA'}
      </button>

      {error && (
        <div className="error-msg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {output && (
        <div className="output-section">
          <h3>Resultado:</h3>
          <img src={output} alt="Imagen generada" />
          <a 
            href={output} 
            download="fotoia-generada.jpg"
            className="download-btn"
          >
            Descargar
          </a>
        </div>
      )}
    </div>
  );
}
