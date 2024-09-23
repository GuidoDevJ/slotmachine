// app/categories/page.tsx

import AllCategories from '@/components/AllCategories/AllCategories';
import Header from '@/components/Header/Header';
import { useSelectedCategory } from '@/stores/categories';
import AddCategoryButton from '@/ui/Buttons/AddCategoryButton';
import { Category, getCategories } from '@/utils/requests';

export const revalidate = 10;

const CategoriesPage = async () => {

  const selectedCategory = useSelectedCategory((state)=>state.setSelectedCategory)

  try {
    const categories: Category[] = await getCategories();

    return (
      <>
        <Header />
        <div className="w-full flex justify-center items-center">
          <div className="w-[80vw] h-full flex flex-col justify-between items-center">
            <h1 className="text-center mt-10">Categorías</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <AllCategories categories={categories} selectCategory={selectedCategory}/>
            </div>
            <div className="w-60 mt-6 mb-6 sm:h-10">
              <AddCategoryButton />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    // Puedes personalizar una página de error o manejarla de otra manera
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error al cargar las categorías.</p>
      </div>
    );
  }
};

export default CategoriesPage;
