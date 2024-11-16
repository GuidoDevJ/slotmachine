'use client';
import { useSelectedCategory } from '@/stores/categories';
import { Category as ICategory } from '@/utils/requests';
import { Category } from './Category';

interface AllCategoriesProps {
  categories: ICategory[];
  goTo?: (id: string) => void;
}

const AllCategories = ({ categories, goTo=()=>{} }: AllCategoriesProps) => {
  // Hook llamado directamente en el cuerpo del componente
  const setSelectedCategory = useSelectedCategory((state) => state.setSelectedCategory);
  return (
    <>
      {categories.map((category) => ( 
        // Componente Category
        <Category
          goTo={goTo}
          key={category._id}
          _id={category._id}
          name={category.name}
          imageURL={category.imageURL}
        />
      ))}
    </>
  );
};

export default AllCategories;
