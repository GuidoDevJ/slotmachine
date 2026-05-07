'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1a0a1e] via-[#2d1233] to-[#0f0a1a] flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl md:text-9xl font-moul font-bold bg-custom-gradient bg-clip-text text-transparent mb-4">
          404
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Pagina no encontrada
        </h1>

        <p className="text-gray-400 mb-8">
          La pagina que buscas no existe o fue movida. Prueba volviendo al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home" aria-label="Ir al inicio">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-3 px-8 rounded-full text-lg cursor-pointer"
            >
              Ir al Inicio
            </motion.div>
          </Link>
          <Link href="/" aria-label="Jugar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              Jugar
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
