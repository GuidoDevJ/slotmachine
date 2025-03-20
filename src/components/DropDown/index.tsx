'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const menuItems = [
  { href: '/config', label: 'Inicio' },
  { href: '/categories', label: 'Categorias' },
];
const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logOut = useAuthStore((state) => state.logout); // Obtiene la función login de Zustand
  const navigation = useRouter();

  const goToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previene el comportamiento predeterminado
    logOut();
    navigation.push('login');
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          {/* Icono de menú hamburguesa */}
          <svg
            className="h-5 w-5 text-white-400"
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
          className="absolute right-0 z-10 m-[17px] mt-[15px] mr-[12px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={0}
                id={`menu-item-${index}`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={0}
              id="menu-item-logout"
              onClick={goToLogin}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
