'use client';

import { useReward } from '@/stores/rewards';
import PlayButton from '@/ui/Buttons/Play';
import { getConfig } from '@/utils/requests';
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
  const setReward = useReward((state) => state.setReward);

  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [spinsUntilWin, setSpinsUntilWin] = useState(3);
  const [result, setResult] = useState('');
  const [reels, setReels] = useState<Symbol[][]>([]);
  const reelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getRandomSymbol = useCallback((): Symbol => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }, [symbols]);

  // Obtener configuración
  const { data: config = [], isSuccess } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });

  useEffect(() => {
    if (isSuccess) {
      setSymbols(
        config.categoriesSelected.flatMap((category: any) => category.products)
      );
      setSpinsUntilWin(config.winnerInterval);
    }
  }, [isSuccess, config]);

  const calculateReelCount = useCallback((): number => {
    return typeof window !== 'undefined' && window.innerWidth < 1280 ? 9 : 15;
  }, []);
  const optimizeCloudinaryUrl = (url: string, width = 300): string => {
    if (!url || !url.includes('cloudinary.com')) return 'url';
    return url.replace('/upload/', `/upload/w_${width}/`);
  };
  const initializeReels = useCallback(() => {
    const count = calculateReelCount();
    setReels(Array.from({ length: count }, () => [getRandomSymbol()]));
  }, [calculateReelCount, getRandomSymbol]);

  useEffect(() => {
    initializeReels();
    const handleResize = () => initializeReels();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeReels]);

  const setMiddleReels = useCallback(
    (winningSymbol: Symbol): void => {
      const reelCount = calculateReelCount();
      const start = reelCount === 9 ? 3 : 5;
      const end = reelCount === 9 ? 5 : 9;

      setReels((prevReels) =>
        prevReels.map((reel, index) => {
          if (index >= start && index <= end) {
            return [winningSymbol];
          }
          return reel;
        })
      );
    },
    [calculateReelCount]
  );

  const updateSymbols = useCallback(() => {
    setReels((prevReels) => prevReels.map(() => [getRandomSymbol()]));
  }, [getRandomSymbol]);

  useEffect(() => {
    let spinInterval: NodeJS.Timeout;
    let updateInterval: NodeJS.Timeout;

    if (isSpinning) {
      spinInterval = setTimeout(() => {
        stopSpin();

        if (spinCount + 1 === spinsUntilWin) {
          const winningSymbol = getRandomSymbol();
          setMiddleReels(winningSymbol);
          setResult(`¡Ganaste! Símbolo: ${winningSymbol.name}`);
          setReward(JSON.stringify(winningSymbol.name));
          setSpinCount(0);
          router.push('/Win');
        } else {
          setResult('Intenta de nuevo');
        }
      }, 2000);

      updateInterval = setInterval(updateSymbols, 100);
    }

    return () => {
      clearTimeout(spinInterval);
      clearInterval(updateInterval);
    };
  }, [
    isSpinning,
    spinCount,
    spinsUntilWin,
    setMiddleReels,
    updateSymbols,
    router,
    setReward,
    getRandomSymbol,
  ]);

  const stopSpin = (): void => {
    setIsSpinning(false);
    setSpinCount((prev) => prev + 1);
  };

  const handleSpinClick = (): void => {
    setIsSpinning(true);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-evenly items-center bg-game-bg bg-cover bg-right md:bg-center">
      <div className="w-[60vw] h-[70vh] flex flex-col justify-between items-center bg-gradient-to-r from-[#2E86AB] to-[#344D49] rounded-2xl p-2">
        <div
          className={`w-full h-full p-3 grid ${
            reels.length <= 9 ? 'grid-cols-3' : 'grid-cols-5'
          } gap-5`}
          style={{ gridAutoRows: 'minmax(0, 1fr)' }} // Evita que los elementos crezcan más allá del contenedor
        >
          {reels.map((reel, index) => (
            <div
              ref={(el) => {
                if (el) reelsRef.current[index] = el;
              }}
              key={index}
              className="w-full h-full border-none mx-1 flex justify-center items-center"
            >
              {reel.map((symbol, symbolIndex) => (
                <div
                  key={symbolIndex}
                  className="w-full h-full flex justify-center items-center overflow-hidden rounded-lg relative"
                >
                  {symbol?.imageURL ? (
                    <Image
                      src={optimizeCloudinaryUrl(symbol.imageURL)}
                      alt={`Símbolo ${symbolIndex + 1}`}
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

      <PlayButton disabled={isSpinning} fn={handleSpinClick} />
      <div className="mt-4 text-lg text-white">{result}</div>
    </div>
  );
};

export default SlotMachine;
