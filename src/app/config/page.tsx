'use client';
import ConfigContainer from "@/components/ConfigElements/ConfigContainer";
import ConfigItems from "@/components/ConfigElements/ConfigItems";
import Header from '@/components/Header/Header';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import { useState } from 'react';


const ConfigPage = () => {
  const [disabledInput,setDisabledInput] = useState<boolean>(true)
  const [inputValue,setInputValue] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value)
    setInputValue(value);
  }
  const saveWinnersCount =()=>{
  alert(`${inputValue}`)
  }
  return (
    <ProtectedRoute>
      <Header />
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-2xl mt-10 mb-10">
          Configuración
        </h1>
        <ConfigContainer externalFn={setDisabledInput} saveFn={saveWinnersCount}>
            <h2>Intervalo de ganadores</h2>
            <div className="ml-4 mt-4">
                    
              <input className="w-[200px] border-solid border-[2px] border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 rounded-md p-2" value={inputValue} disabled={disabledInput} onChange={(e:any)=>handleInputChange(e)}/>
              <span className="mt-2 font-extralight text-[10px] text-gray-400 block mb-10">
                *Indica cada cuantos tiros habrá un ganador
              </span>
            </div>
        </ConfigContainer>
        <ConfigItems/>
        {/* {selectedProducts.length !== 0 ? (
          <div className="mx-auto my-auto p-6">
            <Button color="primary" size="small">
              Guardar
            </Button>
          </div>
        ) : null} */}
      </div>
    </ProtectedRoute>
  );
};

export default ConfigPage;
