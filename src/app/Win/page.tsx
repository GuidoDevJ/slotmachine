'use client';

import { useReward } from '@/stores/rewards';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const WinPage = () => {
  const reward = useReward((state) => state.reward);
  const winningSymbol = useReward((state) => state.winningSymbol);
  const redemptionCode = useReward((state) => state.redemptionCode);
  const resetReward = useReward((state) => state.reset);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FEEF9F', '#F1C861', '#CE993C', '#DF3132', '#602E44'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FEEF9F', '#F1C861', '#CE993C', '#DF3132', '#602E44'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  useEffect(() => {
    fireConfetti();

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  }, [fireConfetti]);

  const handlePlayAgain = () => {
    resetReward();
    router.push('/');
  };

  const handleCopyCode = async () => {
    if (redemptionCode) {
      await navigator.clipboard.writeText(redemptionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const optimizeCloudinaryUrl = (url: string, width = 400): string => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width}/`);
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col justify-center items-center overflow-hidden">
      {/* Background: capas de gradientes profesionales */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0d1117]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(158,35,36,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(206,153,60,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(96,46,68,0.2),transparent_50%)]" />

      {/* Orbes de luz animados */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 w-full px-4 py-6 sm:py-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 max-w-[90vw] sm:max-w-md md:max-w-lg w-full flex flex-col items-center gap-4 sm:gap-6 shadow-2xl shadow-black/40"
        >
          {/* Titulo */}
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-moul font-bold bg-custom-gradient bg-clip-text text-transparent text-center leading-tight"
          >
            ¡FELICITACIONES!
          </motion.h1>

          {/* Imagen del premio */}
          {winningSymbol?.imageURL && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 relative rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-yellow-400/80 shadow-lg shadow-yellow-400/20"
            >
              <Image
                src={optimizeCloudinaryUrl(winningSymbol.imageURL)}
                alt={winningSymbol.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
              />
            </motion.div>
          )}

          {/* Nombre del premio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-moul"
          >
            Te ganaste{' '}
            <span className="font-bold bg-custom-gradient bg-clip-text text-transparent">
              {reward.replace(/"/g, '')}
            </span>
          </motion.p>

          {/* Codigo de canje */}
          {redemptionCode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white/[0.06] border border-white/10 rounded-xl p-3 sm:p-4 md:p-5 w-full text-center"
            >
              <p className="text-gray-400 text-xs sm:text-sm mb-2">Tu codigo de canje:</p>
              <button
                onClick={handleCopyCode}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono font-bold text-yellow-400 tracking-widest hover:text-yellow-300 cursor-pointer px-2 py-1 rounded-lg hover:bg-white/5 active:scale-95 transition-all break-all"
                title="Copiar codigo"
                aria-label={`Copiar codigo de canje: ${redemptionCode}`}
              >
                {redemptionCode}
              </button>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                {copied ? (
                  <span className="text-green-400">¡Codigo copiado!</span>
                ) : (
                  'Toca el codigo para copiarlo'
                )}
              </p>
            </motion.div>
          )}

          {/* Boton jugar de nuevo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="w-full mt-1 sm:mt-2"
          >
            <button
              onClick={handlePlayAgain}
              className="w-full bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-2.5 sm:py-3 md:py-3.5 px-6 rounded-full hover:scale-[1.03] active:scale-95 transition-transform text-sm sm:text-base md:text-lg shadow-lg shadow-red-900/30"
              aria-label="Jugar de nuevo"
            >
              Jugar de nuevo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WinPage;
