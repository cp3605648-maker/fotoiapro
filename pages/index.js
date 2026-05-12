import { useState, useEffect } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Créditos con localStorage para que no se borren
  const [credits, setCredits] = useState(() => {
    if (typeof window!== 'undefined') {
      return parseInt(localStorage.getItem('fotoia_credits') || '1');
    }
    return 1;
  });

  const [isPaid, setIsPaid] = useState(() => {
    if (typeof window!== 'undefined') {
      return localStorage.getItem('fotoia_isPaid') === 'true';
    }
    return false;
  });

  // Guarda créditos cada vez que cambien
  useEffect(() => {
    localStorage.setItem('fotoia_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('fotoia_isPaid', isPaid.toString());
  }, [isPaid]);

  // Detecta pago de Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      const newCredits = parseInt(params.get('credits') || '10');
      setCredits(prev => prev + newCredits);
      setIsPaid(true);
      alert(`¡Pago exitoso! +${newCredits} créditos`);
      window.history.replaceState({}, '', '/');
    }
    if (params.get('cancelled') === 'true') {
      alert('Pago cancelado');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setOutput(null);
      setError('');
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width, height = img.height;
        const maxSize = 1024;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleGenerate = async () => {
    if (!image ||!description) {
      return alert('Sube una imagen y describe qué quieres hacer');
    }
    if (credits <= 0) {
      return alert('Sin créditos. Compra un paquete para continuar.');
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
          prompt: description,
          isPaid: isPaid,
          credits: credits
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Error al generar');
      }

      setOutput(data.output);
      setCredits(data.creditsLeft);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const buyCredits = async (packageType) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageType })
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se pudo crear la sesión de pago');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">FotoIA</h1>
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="font-bold text-blue-900">Créditos: {credits}</span>
            {isPaid && <span className="ml-2 text-xs bg-yellow-400 px-2 py-1 rounded">PRO</span>}
          </div>
        </div>

        {/* Sección Inspírate */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Inspírate</h3>
          <p className="text-gray-600 mb-3">Aquí puedes crear:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎨 Logos</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">💼 Fotos Profesionales</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🛍️ Fotos Comerciales</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">✨ Haz tu Branding</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🏠 Decora un Espacio</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">👕 Cambia Ropa</span>
          </div>
        </div>

        {/* Subir imagen */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h3 className="text-xl font-semibold mb-3">Sube tu imagen</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg" />
              <p className="mt-2 text-sm text-green-600">✓ {image.name}</p>
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="bg-white p-6 rounded-lg shadow mb-4">
          <h3 className="text-xl font-semibold mb-3">Describe qué quieres hacer</h3>
          <p className="text-sm text-gray-600 mb-2">Solo escribe: "playa", "nueva york", "atardecer", "barco"</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: nueva york de noche"
            rows="2"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón generar */}
        <button
          onClick={handleGenerate}
          disabled={loading || credits <= 0 ||!image}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading? 'Generando...' : credits <= 0? 'Sin créditos' : `Editar Imagen - 1 crédito`}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Comprar créditos */}
        {credits <= 0 && (
          <div className="mt-4 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="font-bold mb-3 text-yellow-900">¡Sin créditos!</p>
            <p className="text-sm text-yellow-800 mb-4">Compra un paquete para seguir editando con calidad Pro</p>
            <div className="flex gap-3">
              <button
                onClick={() => buyCredits('basic')}
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
              >
                10 Créditos - $9
              </button>
              <button
                onClick={() => buyCredits('pro')}
                disabled={loading}
                className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-purple-700 disabled:bg-gray-400"
              >
                30 Créditos - $19
              </button>
            </div>
          </div>
        )}

        {/* Resultado */}
        {output && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Resultado:</h3>
            <img src={output} alt="Resultado" className="w-full rounded-lg mb-4" />
            {!isPaid && (
              <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
                Versión Demo - Compra créditos para calidad Pro sin marca de agua
              </p>
            )}
            <a
              href={output}
              download="fotoia-editada.jpg"
              className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block font-bold hover:bg-green-700 transition"
            >
              Descargar Imagen
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
