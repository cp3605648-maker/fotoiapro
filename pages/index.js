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
    { emoji: '💼', label: 'CEO', prompt: 'oficina corporativa profesional', desc: 'Foto profesional tipo LinkedIn' },
    { emoji: '🎬', label: 'Netflix', prompt: 'pelicula netflix cinematografica', desc: 'Estilo póster cinematográfico' },
    { emoji: '💎', label: 'Luxury', prompt: 'lujo millonario elegante', desc: 'Estética premium y elegante' },
    { emoji: '🏙', label: 'Cyberpunk', prompt: 'cyberpunk futurista neon', desc: 'Neón, ciudad futurista y estilo sci-fi' },
    { emoji: '🎌', label: 'Anime', prompt: 'anime estilo japones', desc: 'Transformación estilo anime' },
    { emoji: '💪', label: 'Fitness', prompt: 'fitness gym profesional', desc: 'Look deportivo profesional' },
    { emoji: '🌴', label: 'Playa', prompt: 'playa tropical de lujo', desc: 'Vacaciones tropicales premium' },
    { emoji: '🌅', label: 'Atardecer', prompt: 'atardecer cinematografico', desc: 'Luz dorada y fondo cinematográfico' },
  ];

  const loadingMessages = [
    '🧠 Analizando imagen...',
    '🎨 Aplicando estilo profesional...',
    '✨ Mejorando detalles visuales...',
    '🌈 Ajustando iluminación...',
    '🚀 Renderizando resultado final...',
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
      return alert('Sube una imagen y elige o describe un estilo');
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.25),transparent_35%)] pointer-events-none" />

      <main className="relative z-10">
        <section className="max-w-6xl mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-14">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                FotoIA <span className="text-blue-400">Pro</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Transformación profesional de fotos con IA
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur">
              <span className="font-bold text-blue-200">
                Créditos: {credits}
              </span>

              {isPaid && (
                <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-bold">
                  PRO
                </span>
              )}
            </div>
          </header>

          <section className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-200 px-4 py-2 rounded-full text-sm mb-5">
                ✨ IA premium para retratos, estilos virales y branding
              </div>

              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-5">
                Convierte tus fotos en imágenes profesionales con IA
              </h2>

              <p className="text-slate-300 text-lg mb-8">
                Sube una foto, elige un estilo y genera una versión profesional, cinematográfica o viral en segundos.
              </p>

              <a
                href="#generator"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-7 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-600/30"
              >
                Transformar mi foto
              </a>

              <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-2xl font-black">8+</p>
                  <p className="text-xs text-slate-400">Estilos IA</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-2xl font-black">1</p>
                  <p className="text-xs text-slate-400">Crédito por foto</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-2xl font-black">Pro</p>
                  <p className="text-xs text-slate-400">Calidad premium</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur">
              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-sm text-slate-400 mb-4">Ejemplos de estilos:</p>

                <div className="grid grid-cols-2 gap-3">
                  {presets.slice(0, 6).map((preset) => (
                    <div key={preset.label} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                      <div className="text-3xl mb-2">{preset.emoji}</div>
                      <p className="font-bold">{preset.label}</p>
                      <p className="text-xs text-slate-400 mt-1">{preset.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="generator" className="bg-white text-slate-900 rounded-3xl shadow-2xl p-5 md:p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-3xl font-black mb-2">Crea tu imagen IA</h3>
              <p className="text-slate-600">
                Sube tu foto, elige un estilo y deja que FotoIA Pro haga la magia.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl mb-6 text-sm text-blue-900">
              <strong>Aviso IA:</strong> Las imágenes son generadas mediante inteligencia artificial.
              Los resultados pueden variar según la foto original, el estilo elegido y la disponibilidad del modelo.
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h4 className="text-xl font-bold mb-3">1. Sube tu imagen</h4>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />

                {imagePreview && (
                  <div className="mt-4">
                    <img src={imagePreview} alt="Preview" className="max-h-72 rounded-2xl shadow" />
                    <p className="mt-2 text-sm text-green-600">✓ {image?.name}</p>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h4 className="text-xl font-bold mb-3">2. Elige un estilo</h4>

                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setDescription(preset.prompt)}
                      className={`p-4 rounded-2xl border-2 transition text-left hover:scale-[1.02] ${
                        description === preset.prompt
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{preset.emoji}</div>
                      <div className="font-bold">{preset.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{preset.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl mb-5">
              <h4 className="text-xl font-bold mb-2">3. Describe tu transformación</h4>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ejemplo: como millonario elegante, película futurista, anime épico..."
                rows="3"
                className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || credits <= 0 || !image}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/20"
            >
              {loading
                ? 'Generando magia IA...'
                : credits <= 0
                ? 'Sin créditos'
                : 'Transformar Imagen - 1 crédito'}
            </button>

            {loading && (
              <div className="mt-6 bg-slate-50 p-8 rounded-3xl shadow text-center border border-blue-100">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  Generando con IA
                </h3>

                <p className="text-blue-700 font-bold text-lg animate-pulse">
                  {loadingMessage}
                </p>

                <div className="mt-5 bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-600 h-full animate-pulse w-3/4 rounded-full"></div>
                </div>

                <p className="text-sm text-slate-500 mt-4">
                  Esto puede tardar unos segundos dependiendo de la calidad.
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200">
                {error}
              </div>
            )}

            {credits <= 0 && (
              <div className="mt-6 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                <p className="font-black mb-2 text-yellow-900">¡Sin créditos!</p>
                <p className="text-sm text-yellow-800 mb-4">
                  Compra un paquete para seguir creando imágenes premium.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => buyCredits('basic')}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-green-700 disabled:bg-slate-400"
                  >
                    10 Créditos - $9
                  </button>

                  <button
                    onClick={() => buyCredits('pro')}
                    disabled={loading}
                    className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-purple-700 disabled:bg-slate-400"
                  >
                    30 Créditos - $19
                  </button>
                </div>
              </div>
            )}

            {output && (
              <div className="mt-8 bg-slate-50 p-6 rounded-3xl shadow border border-slate-200">
                <h3 className="text-2xl font-black mb-4">Resultado IA</h3>

                <img src={output} alt="Resultado" className="w-full rounded-2xl mb-4 shadow" />

                {!isPaid && (
                  <p className="text-sm text-slate-600 mb-3 bg-white p-3 rounded-xl">
                    Versión Demo - Compra créditos para calidad Pro.
                  </p>
                )}

                <a
                  href={output}
                  download="fotoia-editada.jpg"
                  className="bg-green-600 text-white px-6 py-3 rounded-2xl inline-block font-bold hover:bg-green-700 transition"
                >
                  Descargar Imagen
                </a>
              </div>
            )}
          </section>

          <section className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              ['⚡', 'Rápido', 'Genera imágenes en segundos.'],
              ['🔒', 'Seguro', 'Tus fotos se procesan para crear resultados.'],
              ['🎨', 'Creativo', 'Estilos profesionales y virales.'],
              ['💬', 'Soporte', 'Contacto oficial para ayuda.'],
            ].map(([icon, title, text]) => (
              <div key={title} className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur">
                <div className="text-3xl mb-2">{icon}</div>
                <h4 className="font-black mb-1">{title}</h4>
                <p className="text-sm text-slate-400">{text}</p>
              </div>
            ))}
          </section>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
          <p className="mb-3">© 2026 FotoIA Pro — IA para transformar tus fotos</p>

          <div className="flex justify-center gap-6 flex-wrap">
            <a href="/terms" className="hover:text-white transition">Términos</a>
            <a href="/privacy" className="hover:text-white transition">Privacidad</a>
            <a href="/refunds" className="hover:text-white transition">Reembolsos</a>
            <a href="/contact" className="hover:text-white transition">Contacto</a>
          </div>
        </footer>
      </main>
    </div>
  );
}