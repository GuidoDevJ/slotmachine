'use client';
import ConfigContainer from '@/components/ConfigElements/ConfigContainer';
import ConfigItem from '@/components/ConfigElements/ConfigItem';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import Button from '@/ui/Buttons/ButtonText';
import { SkeletonRow } from '@/ui/Loaders';
import { setIntervalWinner } from '@/utils/mutations';
import { getConfig } from '@/utils/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ConfigPage = () => {
  const [disabledInput, setDisabledInput] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const mutation = useMutation({
    mutationFn: (interval: number) => setIntervalWinner(interval),
    onSuccess: () => {
      toast.success('Intervalo de ganadores actualizado');
    },
    onError: () => {
      toast.error('Error al actualizar el intervalo');
    },
  });

  const saveWinnersCount = () => {
    mutation.mutate(parseInt(inputValue));
  };

  const {
    data: config = [],
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });

  useEffect(() => {
    setInputValue(config.winnerInterval);
  }, [config]);

  return (
    <ProtectedRoute>
      <div className="w-full min-h-[82vh] flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 mt-10 mb-10">
          <h1 className="text-center font-bold text-2xl">Configuracion</h1>
          <Link
            href="/config/stats"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
            Estadisticas
          </Link>
          <Link
            href="/config/redemptions"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Codigos de canje
          </Link>
        </div>

        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : isError ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-gray-500">Error al cargar la configuracion</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <ConfigContainer
              externalFn={setDisabledInput}
              saveFn={saveWinnersCount}
            >
              <h2>Intervalo de ganadores</h2>
              <div className="ml-4 mt-4">
                <input
                  className="w-[80%] max-w-[200px] border-solid border-[2px] border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 rounded-md p-2"
                  value={inputValue}
                  disabled={disabledInput}
                  onChange={(e: any) => handleInputChange(e)}
                  aria-label="Intervalo de ganadores"
                  type="number"
                  min="1"
                />
                <span className="mt-2 font-extralight text-[10px] text-gray-400 block mb-10">
                  *Indica cada cuantos tiros habra un ganador
                </span>
              </div>
            </ConfigContainer>
            {config.categoriesSelected &&
              config.categoriesSelected.map((config: any) => (
                <ConfigItem
                  categoryId={config.categoryId._id}
                  key={config.id}
                  name={config.categoryId.name}
                  products={config.products}
                />
              ))}
            {(!config.categoriesSelected || config.categoriesSelected.length === 0) && (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">🎰</div>
                <p className="text-gray-500">No hay categorias configuradas para el juego</p>
              </div>
            )}
          </>
        )}

        <div className="mx-auto my-auto p-6">
          <Button color="primary" size="small">
            <Link href={"/config/addCategory"}>
              <p className="text-[16px] text-center pb-1">
                <span className="text-[24px]">+</span> Agregar Categoria
              </p>
            </Link>
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ConfigPage;
