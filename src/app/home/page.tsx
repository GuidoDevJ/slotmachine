'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1a0a1e] via-[#2d1233] to-[#0f0a1a] flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center relative px-4">
        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DF3132]/20 rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 relative mx-auto mb-8">
            <Image
              src="/Logo.svg"
              alt="Casino Mocana Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-moul font-bold bg-custom-gradient bg-clip-text text-transparent mb-6">
            Casino Mocana
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-4 font-inter">
            Gira los carretes y gana premios increibles
          </p>
          <p className="text-gray-400 text-sm md:text-base mb-10 font-inter">
            Cada tirada es una oportunidad. ¿Estas listo para probar tu suerte?
          </p>

          <Link href="/" aria-label="Jugar ahora">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-shadow cursor-pointer"
            >
              Jugar Ahora
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 text-gray-500 flex flex-col items-center gap-2"
        >
          <span className="text-sm">Descubre mas</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-5xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-moul text-center bg-custom-gradient bg-clip-text text-transparent mb-16"
        >
          ¿Como funciona?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Gira',
              description: 'Presiona el boton de jugar para girar los carretes',
              icon: '🎰',
            },
            {
              step: '2',
              title: 'Alinea',
              description: 'Si los simbolos coinciden en la fila central, ganas',
              icon: '✨',
            },
            {
              step: '3',
              title: 'Gana',
              description: 'Recibe tu premio y un codigo unico de canje',
              icon: '🏆',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:border-[#DF3132]/40 transition-colors"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-[#DF3132] font-bold text-sm mb-2">PASO {item.step}</div>
              <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-3xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#2E86AB]/30 to-[#344D49]/30 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <h2 className="text-3xl md:text-4xl font-moul text-white mb-4">
            ¿Listo para ganar?
          </h2>
          <p className="text-gray-400 mb-8">
            No necesitas registro. Solo presiona jugar y prueba tu suerte.
          </p>
          <Link href="/" aria-label="Empezar a jugar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg shadow-red-500/30 cursor-pointer"
            >
              Empezar a Jugar
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm border-t border-white/5">
        <p>Casino Mocana - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Home;
