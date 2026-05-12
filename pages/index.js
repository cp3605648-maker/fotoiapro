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

    if (file.size > 4 * 1024 * 1024) {
      setError("La foto esError("La foto es muy pesada. Máximo 4MB. Usa una captura de pantalla");
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
          // MOSTRAMOS EL ERROR REAL DE REPLICATE
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
    <div style={{fontFamily
