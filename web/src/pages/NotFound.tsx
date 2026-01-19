
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">
        O link que você tentou acessar não existe ou expirou.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Voltar para a home
      </a>
    </div>
  );
}