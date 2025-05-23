"use client";

import AllCategories from "@/components/AllCategories/AllCategories";
import ProtectedRoute from "@/components/ProtectedRoute/protectedRoute";
import AddCategoryButton from "@/ui/Buttons/AddCategoryButton";
import { MainSpinner } from "@/ui/Loaders";
import { Category, getCategories } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const navigation = useRouter();

  const handleAddCategory = (url: string) => {
    navigation.push(url);
  };

  // useQuery para obtener las categorías
  const { data: categories = [], isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <ProtectedRoute>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>Cargando categorías...</p>
          <MainSpinner />
        </div>
      ) : isError ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>Error al cargar las categorías</p>
        </div>
      ) : (
        <div className="w-full h-auto flex justify-center items-center">
          <div className="w-[80vw] h-full flex flex-col justify-between items-center">
            <h1 className="text-center text-[20px] mt-10 font-bold">Categorías</h1>
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
