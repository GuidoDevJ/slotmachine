'use client'
import { ReactNode } from 'react';

interface DropProps {
  children: ReactNode; // Define el tipo para las props children
  text:string;
  isOpen: boolean;
  toggleDropdown: () => void;
}

const Drop: React.FC<DropProps> = ({ children, text, toggleDropdown,isOpen }) => {


  return (
    <div className="relative" data-twe-dropdown-ref>
      {/* Leyenda que aparece solo cuando el dropdown está abierto */}
      {isOpen && (
        <div className="absolute top-[-6px] left-[56px] text-red-700 text-[10px] bg-white  rounded  z-[1001]">
          Seleccione una categoría
        </div>
      )}

      <button
        className="w-[200px] h-[40px] flex items-center rounded p-2 border-[2px] border-solid border-red-500 ml-4"
        type="button"
        id="dropdownMenuButton1"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        {text}
      </button>

      <ul
        className={`absolute z-[1000] float-left m-0 list-none overflow-hidden rounded-lg border-none bg-gray-500 bg-clip-padding text-base shadow-lg ${isOpen ? 'block' : 'hidden'} dark:bg-surface-dark`}
        aria-labelledby="dropdownMenuButton1"
        data-twe-dropdown-menu-ref
        style={{
          left: '16px',
          right: '53px',
          maxWidth: '200px',
          minWidth: '200px',
        }}
      >
        {children}
      </ul>
    </div>
  );
};

export default Drop;
