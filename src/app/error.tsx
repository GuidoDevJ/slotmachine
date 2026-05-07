'use client';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1a0a1e] via-[#2d1233] to-[#0f0a1a] flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">💥</div>
        <h2 className="text-2xl font-bold text-white mb-4">Algo salio mal</h2>
        <p className="text-gray-400 mb-8">
          Ocurrio un error inesperado. Intenta recargar la pagina.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transition-transform"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};

export default Error;
