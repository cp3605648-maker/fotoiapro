import { useState, useEffect } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credits, setCredits] = useState(1); // 1 crédito gratis al inicio
  const [userEmail, setUserEmail] = useState('');

  // Detecta si vino de Stripe con créditos nuevos
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const newCredits = params.get('credits');

    if (sessionId && newCredits) {
      setCredits(parseInt(newCredits));
      setUserEmail('pro@fotoia.com'); // Aquí pondrías el email real de Stripe
      alert(`¡Pago exitoso! Tienes ${newCredits} créditos nuevos`);
      window.history.replaceState({}, '', '/'); // Limpia la URL
    }
  }, []);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width, height = img.height;
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
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    });
  };

  const handleGenerate = async () => {
    if (!image ||!description) return alert('Sube imagen y describe qué hacer');
    if (credits <= 0) return alert('Sin créditos. Compra más para continuar');

    setLoading(true);
    setError('');
    setOutput(null);

    const resizedBase64 = await resizeImage(image);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: resizedBase64,
        prompt: description,
        userEmail: userEmail,
        credits: credits
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.details || data.error);
    } else {
      setOutput(data.output);
      setCredits(data.creditsLeft); // Actualizamos créditos
      console.log('Prompt usado:', data.usedPrompt);
    }
    setLoading(false);
  };

  const buyCredits = async (packageType) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package: packageType })
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">FotoIA</h1>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="font-bold">Créditos: {credits}</span>
        </div>
      </div>

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

      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-3">Sube tu imagen</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50"
        />
        {image && <p className="mt-2 text-sm text-green-600">✓ {image.name}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-3">Describe qué quieres hacer</h3>
        <p className="text-sm text-gray-600 mb-2">
          Escribe en pocas palabras. Ej: "playa", "atardecer", "oficina moderna"
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: playa con atardecer"
          rows="2"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || credits <= 0}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading? 'Generando...' : `Editar Imagen - 1 crédito`}
      </button>

      {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

      {credits <= 0 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="font-bold mb-2">¡Sin créditos!</p>
          <div className="flex gap-2">
            <button onClick={() => buyCredits('basic')} className="bg-green-600 text-white px-4 py-2 rounded">
              10 Créditos - $9
            </button>
            <button onClick={() => buyCredits('pro')} className="bg-purple-600 text-white px-4 py-2 rounded">
              30 Créditos - $19
            </button>
          </div>
        </div>
      )}

      {output && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3">Resultado:</h3>
          <img src={output} alt="Resultado" className="w-full rounded-lg mb-3" />
          <a href={output} download="fotoia.jpg" className="bg-green-600 text-white px-6 py-2 rounded inline-block">
            Descargar
          </a>
        </div>
      )}
    </div>
  );
}
