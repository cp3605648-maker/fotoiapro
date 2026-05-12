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
    if (!image ||!description) {
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">FotoIA.pro</h1>
        
        {/* PASO 1: INSPÍRATE - Solo informativo, sin selección */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Paso 1: Inspírate</h2>
          <p className="text-gray-600 mb-4">Aquí tienes algunas ideas de lo que puedes crear:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold">🎨 Logos</h3>
              <p className="text-sm text-gray-600">Crea logos únicos para tu marca</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold">💼 Fotos Profesionales</h3>
              <p className="text-sm text-gray-600">Headshots para LinkedIn o CV</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold">🛍️ Fotos Comerciales</h3>
              <p className="text-sm text-gray-600">Imágenes para tu tienda online</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-bold">✨ Haz tu Branding</h3>
              <p className="text-sm text-gray-600">Contenido para redes sociales</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold">🏠 Decora un Espacio</h3>
              <p className="text-sm text-gray-600">Visualiza cambios en tu casa</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold">👕 Cambia Ropa</h3>
              <p className="text-sm text-gray-600">Prueba outfits sin comprarlos</p>
            </div>
          </div>
        </div>

        {/* PASO 2: SUBE TU IMAGEN */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Paso 2: Sube tu imagen</h2>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image && <p className="mt-2 text-sm text-green-600">✓ Imagen cargada: {image.name}</p>}
        </div>

        {/* PASO 3: DESCRIBE QUÉ QUIERES */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Paso 3: Describe qué quieres hacer</h2>
          <p className="text-sm text-gray-600 mb-2">
            Solo escribe en pocas palabras. La IA mejorará tu idea automáticamente.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: ponlo en una playa, cambia la camisa a azul, haz un logo minimalista"
            className="w-full p-3 border rounded-lg"
            rows="3"
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading? 'Generando... Esto tarda 20-40 seg' : 'Generar Imagen'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {output && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Resultado:</h2>
            <img src={output} alt="Imagen generada" className="w-full rounded-lg" />
            <a 
              href={output} 
              download="fotoia-generada.jpg"
              className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Descargar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
