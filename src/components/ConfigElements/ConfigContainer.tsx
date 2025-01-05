import Delete from '@/../public/images/botton_borrar_black.svg';
import Edit from '@/../public/images/botton_edit.svg';
import Button from '@/ui/Buttons/ButtonText';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

// Definir las props del componente
interface ConfigContainerProps {
  children?: ReactNode; // Si necesitas soportar 'children'
  both?: boolean;
  externalFn?: (value: any) => void;
  externalFnDelete?: (value: any) => void;
  saveFn?: () => void;
  showButtons?: boolean;
}

const ConfigContainer: React.FC<ConfigContainerProps> = ({
  children,
  both = false,
  externalFn,
  saveFn,
  showButtons = true,
  externalFnDelete,
}) => {
  const intervalValue = 3; // Valor constante para el input
  const [edit, setEdit] = useState(false);
  return (
    <div className="relative w-[70%] min-w-[480px] h-auto border-solid border-[#D9D9D9] border-[1px] rounded-lg flex flex-col justify-center items-center mb-6 p-2">
      <div className="w-full h-full pr-4 pl-4">
        {/* Si 'children' es necesario */}
        {children && <div className="mt-4">{children}</div>}
        {edit ? (
          <div className="w-full flex justify-center">
            <div>
              <Button
                color="primary"
                size="small"
                large="small"
                aria-label="Guardar cambios"
                onClick={() => {
                  saveFn && saveFn();
                  setEdit(!edit);
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        ) : null}
        {showButtons ? (
          <div className="absolute top-0 right-0 m-4 cursor-pointer flex">
            {both ? (
              <>
                <Image
                  className=""
                  src={Edit}
                  alt="Edit"
                  width={30}
                  height={30}
                  onClick={() => {
                    setEdit(!edit);
                    if (externalFn) externalFn(false);
                  }}
                />
                <Image
                  className=""
                  src={Delete}
                  alt="Edit"
                  width={30}
                  height={30}
                  onClick={() => {
                    if (externalFnDelete) externalFnDelete(true);
                    console.log('Delete');
                  }}
                />
              </>
            ) : (
              <Image
                className=""
                src={Edit}
                alt="Edit"
                width={30}
                height={30}
                onClick={() => {
                  setEdit(!edit);
                  if (externalFn) externalFn(edit);
                  console.log('Edit');
                }}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConfigContainer;
