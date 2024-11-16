'use client';
import React from 'react';
const symbols: string[] = ['🍒', '🍋', '🍊', '🍉', '🔔', '⭐', '7'];

const getRandomSymbol = (): string =>
  symbols[Math.floor(Math.random() * symbols.length)];

// const SlotMachine: React.FC = () => {
//   const router = useRouter()
//   const setReward = useReward((state)=> state.setReward)
//   const [isSpinning, setIsSpinning] = useState<boolean>(false);
//   const [spinCount, setSpinCount] = useState<number>(0);
//   const [spinsUntilWin, setSpinsUntilWin] = useState<number>(3);
//   const [result, setResult] = useState<string>('');
//   const [reels, setReels] = useState<string[][]>([]);
//   const reelsRef = useRef<(HTMLDivElement | null)[]>([]);

//   const calculateReelCount = (): number => {
//     if (typeof window === 'undefined') {
//       return 15; // Valor por defecto para evitar errores en el servidor
//     }
//     return window.innerWidth < 1280 ? 9 : 15;
//   };
  

//   // Inicializar reels basado en el tamaño de la pantalla
//   const initializeReels = (count: number) => {
//     setReels(
//       Array.from({ length: count }, () => Array(1).fill(getRandomSymbol()))
//     );
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (typeof window !== 'undefined') {
//         initializeReels(calculateReelCount());
//       }
//     };
  
//     handleResize(); // Inicialización inicial en el cliente
//     window.addEventListener('resize', handleResize); // Detectar cambio de tamaño
  
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
  

//   const setMiddleReels = (winningSymbol: string): void => {
//     const reelCount = calculateReelCount();
//     const start = reelCount === 9 ? 3 : 5;
//     const end = reelCount === 9 ? 5 : 9;

//     setReels(
//       reels.map((reel, index) => {
//         if (index >= start && index <= end) {
//           return Array(1).fill(winningSymbol); // Cambiar solo el contenido de estos reels
//         }
//         return reel; // Dejar los otros reels intactos
//       })
//     );
//   };

//   useEffect(() => {
//     let spinInterval: NodeJS.Timeout;
//     let updateInterval: NodeJS.Timeout | undefined;

//     if (isSpinning) {
//       spinInterval = setTimeout(() => {
//         console.log('Pasaron los dos minutos');
//         clearInterval(updateInterval);
//         stopSpin();
//         if (spinCount + 1 === spinsUntilWin) {
//           const winningSymbol = getRandomSymbol();
//           setMiddleReels(winningSymbol);
//           setResult(`¡Ganaste! Símbolo: ${winningSymbol}`);
//           setReward(winningSymbol)
//           setSpinCount(0);
//           router.push('/Win',)
//         } else {
//           setResult('Intenta de nuevo');
//         }
//         setIsSpinning(false);
//       }, 2000);
//       updateInterval = setInterval(() => {
//         updateSymbols();
//       }, 100);
//     }

//     return () => {
//       if (updateInterval) clearInterval(updateInterval);
//       if (spinInterval) clearTimeout(spinInterval);
//     };
//   }, [isSpinning]);

//   const updateSymbols = (): void => {
//     setReels(reels.map((reel) => reel.map(() => getRandomSymbol())));
//   };

//   const stopSpin = (): void => {
//     setIsSpinning(false);
//     setSpinCount((prev) => prev + 1);
//   };
//   const handleSpinClick = (): void => {
//     setIsSpinning(true);
//   };

//   return (
//     <div className='w-full h-[100vh] flex flex-col justify-evenly items-center bg-game-bg bg-cover bg-right md:bg-center'>
//       <div className="w-[70%] h-[70vh] flex flex-col justify-between items-center bg-gradient-to-r from-[#2E86AB] to-[#344D49] rounded-2xl p-2">
//         <div
//           className={`w-full  h-full grid ${
//             window.innerWidth < 1280 ? 'grid-cols-3' : 'grid-cols-5'
//           } gap-5`}
//         >
//           {reels.map((reel, index) => (
//             <div
//               ref={(el) => {
//                 if (el) reelsRef.current[index] = el;
//               }}
//               key={index}
//               className="w-full h-full border-2 border-black mx-1 flex justify-center items-center rounded-lg"
//             >
//               {reel.map((symbol, symbolIndex) => (
//                 <div key={symbolIndex} className="text-3xl">
//                   {symbol}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div>

//         </div>
       
//       </div>
//       <PlayButton disabled={isSpinning} fn={handleSpinClick} />
//         <div className="mt-4 text-lg text-white">{result}</div>
//     </div>
//   );
// };

const SlotMachine: React.FC = ()=>{
  return<>
  <h1>Slot Machine</h1> 
  </>
}
export default SlotMachine;
