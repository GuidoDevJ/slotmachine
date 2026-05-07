'use client';

import { useReward } from '@/stores/rewards';
import PlayButton from '@/ui/Buttons/Play';
import { getConfig } from '@/utils/requests';
import { createRedemptionCode } from '@/utils/mutations';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Symbol {
  imageURL: string;
  value: number;
  name: string;
}

const SlotMachine: React.FC = () => {
  const router = useRouter();
  const setWinningSymbol = useReward((state) => state.setWinningSymbol);
  const setRedemptionCode = useReward((state) => state.setRedemptionCode);

  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState<Symbol[][]>([]);
  const [stoppingReels, setStoppingReels] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  // Use refs for values accessed inside timeouts to avoid stale closures
  const spinCountRef = useRef(0);
  const spinsUntilWinRef = useRef(3);
  const symbolsRef = useRef<Symbol[]>([]);
  const stoppingReelsRef = useRef<boolean[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Keep refs in sync
  useEffect(() => { symbolsRef.current = symbols; }, [symbols]);
  useEffect(() => { stoppingReelsRef.current = stoppingReels; }, [stoppingReels]);

  const { data: config = [], isSuccess } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });

  const calculateReelCount = useCallback((): number => {
    return typeof window !== 'undefined' && window.innerWidth < 1280 ? 9 : 15;
  }, []);

  const optimizeCloudinaryUrl = (url: string, width = 300): string => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', `/upload/w_${width}/`);
  };

  // Load config into state
  useEffect(() => {
    if (isSuccess && config?.categoriesSelected) {
      const allProducts = config.categoriesSelected.flatMap(
        (category: any) => category.products || []
      );
      setSymbols(allProducts);
      symbolsRef.current = allProducts;
      spinsUntilWinRef.current = config.winnerInterval || 3;
    }
  }, [isSuccess, config]);

  // Initialize reels when symbols are loaded
  useEffect(() => {
    if (symbols.length === 0) return;
    const count = calculateReelCount();
    setReels(
      Array.from({ length: count }, () => {
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        return sym ? [sym] : [];
      })
    );
    setStoppingReels(Array.from({ length: count }, () => false));
  }, [symbols, calculateReelCount]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (symbolsRef.current.length === 0) return;
      const count = calculateReelCount();
      const syms = symbolsRef.current;
      setReels(
        Array.from({ length: count }, () => {
          const sym = syms[Math.floor(Math.random() * syms.length)];
          return sym ? [sym] : [];
        })
      );
      setStoppingReels(Array.from({ length: count }, () => false));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateReelCount]);

  // Spin effect
  useEffect(() => {
    if (!isSpinning) return;

    const syms = symbolsRef.current;
    if (syms.length === 0) {
      setIsSpinning(false);
      return;
    }

    // Determine win/loss at spin start
    const currentSpinCount = spinCountRef.current;
    const isWin = currentSpinCount + 1 === spinsUntilWinRef.current;
    const winningSymbol = isWin ? syms[Math.floor(Math.random() * syms.length)] : undefined;

    // Shuffle reels every 100ms
    const updateInterval = setInterval(() => {
      setReels((prevReels) =>
        prevReels.map((reel, index) => {
          if (stoppingReelsRef.current[index]) return reel;
          const sym = syms[Math.floor(Math.random() * syms.length)];
          return sym ? [sym] : reel;
        })
      );
    }, 100);

    // Staggered stopping per column
    const reelCount = calculateReelCount();
    const cols = reelCount === 9 ? 3 : 5;
    const rows = reelCount / cols;

    for (let col = 0; col < cols; col++) {
      const delay = 1200 + col * 400;

      const t = setTimeout(() => {
        setStoppingReels((prev) => {
          const next = [...prev];
          for (let row = 0; row < rows; row++) {
            const reelIndex = row * cols + col;
            if (reelIndex < reelCount) {
              next[reelIndex] = true;
            }
          }
          stoppingReelsRef.current = next;
          return next;
        });

        // Vibrate on column stop
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }

        // Last column stopped
        if (col === cols - 1) {
          const finishTimeout = setTimeout(() => {
            clearInterval(updateInterval);
            setIsSpinning(false);

            if (isWin && winningSymbol) {
              // Set middle reels to winning symbol
              const start = reelCount === 9 ? 3 : 5;
              const end = reelCount === 9 ? 5 : 9;
              setReels((prevReels) =>
                prevReels.map((reel, index) =>
                  index >= start && index <= end ? [winningSymbol] : reel
                )
              );
              setResult(`¡Ganaste! ${winningSymbol.name}`);
              setWinningSymbol(winningSymbol);
              spinCountRef.current = 0;
              setShowResult(true);

              if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100, 50, 200]);
              }

              // Crear codigo de canje en el servidor
              createRedemptionCode({
                productName: winningSymbol.name,
                productImageURL: winningSymbol.imageURL,
                productId: (winningSymbol as any)._id,
              })
                .then(({ code }) => {
                  setRedemptionCode(code);
                  setTimeout(() => router.push('/Win'), 1000);
                })
                .catch(() => {
                  // Si falla la API, navegar igualmente
                  setTimeout(() => router.push('/Win'), 1000);
                });
            } else {
              // Near miss on the spin before winning
              const nextSpinIsWin = currentSpinCount + 2 === spinsUntilWinRef.current;
              if (nextSpinIsWin && syms.length > 0) {
                const nearMissSymbol = syms[Math.floor(Math.random() * syms.length)];
                const middleRowStart = cols;
                const middleRowEnd = middleRowStart + cols - 1;
                const skipIndex = middleRowStart + Math.floor(Math.random() * cols);
                setReels((prevReels) =>
                  prevReels.map((reel, index) =>
                    index >= middleRowStart && index <= middleRowEnd && index !== skipIndex
                      ? [nearMissSymbol]
                      : reel
                  )
                );
              }

              setResult('Intenta de nuevo');
              setShowResult(true);
              spinCountRef.current = currentSpinCount + 1;

              setTimeout(() => setShowResult(false), 2000);
            }

            // Reset stopping state
            setStoppingReels((prev) => prev.map(() => false));
            stoppingReelsRef.current = stoppingReelsRef.current.map(() => false);
          }, 200);
          timeoutsRef.current.push(finishTimeout);
        }
      }, delay);
      timeoutsRef.current.push(t);
    }

    return () => {
      clearInterval(updateInterval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isSpinning, calculateReelCount, setWinningSymbol, setRedemptionCode, router]);

  const handleSpinClick = (): void => {
    if (isSpinning || symbolsRef.current.length === 0) return;
    setShowResult(false);
    setResult('');
    setIsSpinning(true);
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col justify-evenly items-center bg-game-bg bg-cover bg-right md:bg-center"
      role="main"
      aria-label="Tragamonedas"
    >
      <div className="w-[90vw] md:w-[70vw] xl:w-[60vw] h-[70vh] flex flex-col justify-between items-center bg-gradient-to-r from-[#2E86AB] to-[#344D49] rounded-2xl p-2 shadow-2xl">
        <div
          className={`w-full h-full p-3 grid ${
            reels.length <= 9 ? 'grid-cols-3' : 'grid-cols-5'
          } gap-3 md:gap-5`}
          style={{ gridAutoRows: 'minmax(0, 1fr)' }}
          aria-label="Carretes del tragamonedas"
        >
          {reels.map((reel, index) => (
            <div
              key={index}
              className={`w-full h-full border-none mx-1 flex justify-center items-center transition-transform duration-200 ${
                isSpinning && !stoppingReels[index] ? 'animate-pulse' : ''
              }`}
            >
              {reel.map((symbol, symbolIndex) => (
                <div
                  key={symbolIndex}
                  className={`w-full h-full flex justify-center items-center overflow-hidden rounded-lg relative transition-all duration-300 ${
                    isSpinning && !stoppingReels[index]
                      ? 'blur-[1px] scale-[1.02]'
                      : 'blur-0 scale-100'
                  }`}
                >
                  {symbol?.imageURL ? (
                    <Image
                      src={optimizeCloudinaryUrl(symbol.imageURL)}
                      alt={symbol.name || `Simbolo ${symbolIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
                      className="object-fill w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                      Sin imagen
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <PlayButton disabled={isSpinning || symbols.length === 0} fn={handleSpinClick} />

      <div
        className={`mt-4 text-lg text-white font-moul transition-all duration-500 ${
          showResult ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        aria-live="polite"
      >
        {result}
      </div>
    </div>
  );
};

export default SlotMachine;
