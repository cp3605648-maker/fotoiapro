import { useState, useEffect } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const presets = [
    { emoji: '🌴', label: 'Playa', prompt: 'playa tropical de lujo' },
    { emoji: '💼', label: 'CEO', prompt: 'oficina corporativa profesional' },
    { emoji: '🏙', label: 'Cyberpunk', prompt: 'cyberpunk futurista neon' },
    { emoji: '🎬', label: 'Netflix', prompt: 'pelicula netflix cinematografica' },
    { emoji: '💎', label: 'Luxury', prompt: 'lujo millonario elegante' },
    { emoji: '🎌', label: 'Anime', prompt: 'anime estilo japones' },
    { emoji: '💪', label: 'Fitness', prompt: 'fitness gym profesional' },
    { emoji: '🌅', label: 'Atardecer', prompt: 'atardecer cinematografico' },
  ];

  const loadingMessages = [
    '🧠 Analizando rostro...',
    '🎨 Aplicando iluminación cinematográfica...',
    '✨ Mejorando detalles faciales...',
    '🌈 Generando composición profesional...',
    '🚀 Renderizando imagen final...',
  ];

  const [credits, setCredits] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('fotoia_credits') || '1');
    }
    return 1;
  });

  const [isPaid, setIsPaid] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fotoia_isPaid') === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('fotoia_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('fotoia_isPaid', isPaid.toString());
  }, [isPaid]);

  useEffect(() => {
    let interval;

    if (loading) {
      setLoadingMessage(loadingMessages[0]);

      interval = setInterval(() => {
        setLoadingStep((prev) => {
          const next = (prev + 1) % loadingMessages.length;
          setLoadingMessage(loadingMessages[next]);
          return next;
        });
      }, 2200);
    }

    return () => clearInterval(interval);
  }, [loading]);

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

        let width = img.width;
        let height = img.height;

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
    if (!image || !description) {
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
        body: JSON.stringify({ image: resizedBase64, prompt: description, isPaid, credits })
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">FotoIA Pro</h1>

          <div className="bg-blue-100 px-4 py-2 rounded-xl">
            <span className="font-bold text-blue-900">Créditos: {credits}</span>
            {isPaid && (
              <span className="ml-2 text-xs bg-yellow-400 px-2 py-1 rounded">
                PRO
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-3">Inspírate</h3>
          <p className="text-gray-600 mb-4">
            Transforma tus fotos con inteligencia artificial
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎨 Branding</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">💼 CEO Profesional</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎬 Netflix</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🎌 Anime</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">💎 Luxury</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">🏙 Cyberpunk</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-4">
          <h3 className="text-xl font-semibold mb-3">Sube tu imagen</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded-xl" />
              <p className="mt-2 text-sm text-green-600">✓ {image.name}</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-4">
          <h3 className="text-xl font-semibold mb-4">Elige un estilo IA</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setDescription(preset.prompt)}
                className={`p-4 rounded-xl border-2 transition text-left hover:scale-105 ${
                  description === preset.prompt
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{preset.emoji}</div>
                <div className="font-bold text-gray-900">{preset.label}</div>
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">Describe cómo quieres verte</h3>

          <p className="text-sm text-gray-600 mb-3">
            Ejemplo: “como millonario”, “película futurista”, “anime épico”
          </p>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu transformación..."
            rows="3"
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || credits <= 0 || !image}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading
            ? 'Generando magia IA...'
            : credits <= 0
            ? 'Sin créditos'
            : 'Transformar Imagen - 1 crédito'}
        </button>

        {loading && (
          <div className="mt-6 bg-white p-8 rounded-2xl shadow text-center border border-blue-100">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Generando con IA
            </h3>

            <p className="text-blue-700 font-medium text-lg animate-pulse">
              {loadingMessage}
            </p>

            <div className="mt-5 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-blue-600 h-full animate-pulse w-3/4 rounded-full"></div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Esto puede tardar unos segundos dependiendo de la calidad
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {credits <= 0 && (
          <div className="mt-4 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="font-bold mb-3 text-yellow-900">¡Sin créditos!</p>
            <p className="text-sm text-yellow-800 mb-4">
              Compra un paquete para seguir creando imágenes premium
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => buyCredits('basic')}
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-400"
              >
                10 Créditos - $9
              </button>

              <button
                onClick={() => buyCredits('pro')}
                disabled={loading}
                className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-purple-700 disabled:bg-gray-400"
              >
                30 Créditos - $19
              </button>
            </div>
          </div>
        )}

        {output && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Resultado IA</h3>

            <img src={output} alt="Resultado" className="w-full rounded-xl mb-4" />

            {!isPaid && (
              <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-3 rounded-lg">
                Versión Demo - Compra créditos para calidad Pro
              </p>
            )}

            <a
              href={output}
              download="fotoia-editada.jpg"
              className="bg-green-600 text-white px-6 py-3 rounded-xl inline-block font-bold hover:bg-green-700 transition"
            >
              Descargar Imagen
            </a>
          </div>
        )}
      </div>

      <footer className="mt-12 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p className="mb-3">© 2026 FotoIA Pro — IA para transformar tus fotos</p>

        <div className="flex justify-center gap-6 flex-wrap">
          <a href="/terms" className="hover:text-blue-600 transition">Términos</a>
          <a href="/privacy" className="hover:text-blue-600 transition">Privacidad</a>
          <a href="/refunds" className="hover:text-blue-600 transition">Reembolsos</a>
        </div>
      </footer>
    </div>
  );
}