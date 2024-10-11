'use client';
import AllCategories from '@/components/AllCategories/AllCategories';
import Header from '@/components/Header/Header';
import AddCategoryButton from '@/ui/Buttons/AddCategoryButton';
import { MainSpinner } from '@/ui/Loaders';
import { Category, getCategories } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const CategoriesPage = () => {
  const navigation = useRouter()
  const handleAddCategory = (url:string) => {
    navigation.push(url)
  }
  // useQuery para obtener las categorías
  const { data: categories = [], isLoading, isError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isLoading) {
    // Muestra un mensaje de carga mientras se obtienen los datos
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Cargando categorías...</p>
        <MainSpinner/>
      </div>
    );
  }

  if (isError) {
    // Maneja el error en caso de que falle la solicitud
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error al cargar las categorías.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-center">
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
    </>
  );
};

export default CategoriesPage;
