'use client';
import { useSelectedCategory } from '@/stores/categories';
import { Category } from '@/utils/requests';
import Image from 'next/image';

interface AllCategoriesProps {
  categories: Category[];
  goTo?: (id: string) => void;
}

const AllCategories = ({ categories, goTo=()=>{} }: AllCategoriesProps) => {
  // Hook llamado directamente en el cuerpo del componente
  const setSelectedCategory = useSelectedCategory((state) => state.setSelectedCategory);
  return (
    <>
      {categories.map((category) => (
        <div
          onClick={() =>{
            setSelectedCategory({
              _id: category._id,
              name: category.name,
              imageUrl: category.imageURL,
            })
            goTo(`categories/${category._id}/products`)
          }

          }
          key={category._id}
          className="bg-gray-200 w-full h-[180px] relative p-4 flex justify-center items-center hover:cursor-pointer"
        >
          <Image src={category.imageURL} alt={category.name} layout="fill" objectFit="cover" />
          <h2 className="text-white z-50 font-inter font-bold">{category.name}</h2>
        </div>
      ))}
    </>
  );
};

export default AllCategories;
