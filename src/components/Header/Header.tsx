'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DropDown from '../DropDown';

const breadcrumbMap: Record<string, string> = {
  config: 'Configuracion',
  categories: 'Categorias',
  products: 'Productos',
  add: 'Agregar',
  addCategory: 'Agregar Categoria',
  update: 'Actualizar',
};

const Header = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = breadcrumbMap[segment] || segment;
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav
      className="w-full h-[8vh] flex justify-between items-center p-[20px] md:p-[30px] bg-[#DF3132]"
      role="navigation"
      aria-label="Navegacion principal"
    >
      <div className="w-full flex items-center gap-2">
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold font-sans text-white">
          <Link href="/config">Tragamonedas</Link>
        </h1>

        {breadcrumbs.length > 1 && (
          <div
            className="hidden md:flex items-center gap-1 ml-4 text-sm"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.href} className="flex items-center gap-1">
                {idx > 0 && <span className="text-white/50">/</span>}
                {crumb.isLast ? (
                  <span className="text-white/80">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="absolute right-0">
        <DropDown />
      </div>
    </nav>
  );
};

export default Header;
