import Delete from '@/../public/images/botton_borrar_black.svg';
import Edit from '@/../public/images/botton_edit.svg';
import Button from '@/ui/Buttons/ButtonText';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';

interface ConfigContainerProps {
  children?: ReactNode;
  both?: boolean;
  externalFn?: (value: boolean) => void;
  externalFnDelete?: (value: boolean) => void;
  saveFn?: () => void;
  showButtons?: boolean;
}

const ConfigContainer: React.FC<ConfigContainerProps> = ({
  children,
  both = false,
  externalFn,
  externalFnDelete,
  saveFn,
  showButtons = true,
}) => {
  const [edit, setEdit] = useState(false);

  const handleToggleEdit = () => {
    const newEditState = !edit;
    setEdit(newEditState);
    externalFn?.(!edit);
  };

  const handleSave = () => {
    saveFn?.();
    setEdit(false);
  };

  const handleDelete = () => {
    externalFnDelete?.(true);
  };

  return (
    <div className="relative w-[70%] border border-[#D9D9D9] rounded-lg flex flex-col justify-center items-center mt-6 mb-6 p-4">
      <div className="w-full">
        {children && <div className="mt-4">{children}</div>}

        {edit && (
          <div className="w-full flex justify-center mt-4">
            <Button
              color="primary"
              size="small"
              large="small"
              aria-label="Guardar cambios"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </div>
        )}

        {showButtons && (
          <div className="absolute top-0 right-0 m-4 flex gap-2 cursor-pointer">
            <Image
              src={Edit}
              alt="Editar"
              width={30}
              height={30}
              onClick={handleToggleEdit}
            />
            {both && (
              <Image
                src={Delete}
                alt="Eliminar"
                width={30}
                height={30}
                onClick={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigContainer;
