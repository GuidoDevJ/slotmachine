"use client";

import AllCategories from "@/components/AllCategories/AllCategories";
import ProtectedRoute from "@/components/ProtectedRoute/protectedRoute";
import AddCategoryButton from "@/ui/Buttons/AddCategoryButton";
import { SkeletonCategoryCard } from "@/ui/Loaders";
import { Category, getCategories } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const navigation = useRouter();

  const handleAddCategory = (url: string) => {
    navigation.push(url);
  };

  const { data: categories = [], isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <ProtectedRoute>
      {isLoading ? (
        <div className="w-full h-auto flex justify-center items-center">
          <div className="w-[80vw] h-full flex flex-col justify-between items-center">
            <h1 className="text-center text-[20px] mt-10 font-bold">Categorias</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCategoryCard key={i} />
              ))}
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error al cargar las categorias</h2>
          <p className="text-gray-500 mb-4">Hubo un problema al obtener los datos. Intenta recargar la pagina.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Reintentar
          </button>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center px-4">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-xl font-bold mb-2">No hay categorias aun</h2>
          <p className="text-gray-500 mb-6">Crea tu primera categoria para empezar a organizar tus productos.</p>
          <AddCategoryButton />
        </div>
      ) : (
        <div className="w-full h-auto flex justify-center items-center">
          <div className="w-[80vw] h-full flex flex-col justify-between items-center">
            <h1 className="text-center text-[20px] mt-10 font-bold">Categorias</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <AllCategories categories={categories} goTo={handleAddCategory} />
            </div>
            <div className="w-60 mt-6 mb-6 sm:h-10">
              <AddCategoryButton />
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default CategoriesPage;
