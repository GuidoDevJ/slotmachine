'use client'
import { useState } from 'react';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          {/* Icono de menú hamburguesa */}
          <svg
            className="h-5 w-5 text-black-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm0 4h14a1 1 0 100-2H3a1 1 0 100 2zm0 6h14a1 1 0 100-2H3a1 1 0 100 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={0}
              id="menu-item-0"
            >
              Inicio
            </a>
            <a
              href="/categories"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={0}
              id="menu-item-1"
            >
              Categorias
            </a>
            <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                role="menuitem"
                tabIndex={0}
                id="menu-item-3"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
