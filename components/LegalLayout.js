export default function LegalLayout({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <a
          href="/"
          className="inline-block mb-6 text-sm text-blue-600 hover:text-blue-800"
        >
          ← Volver a FotoIA Pro
        </a>

        <div className="bg-white rounded-2xl shadow p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Última actualización: {updated}
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}