// app/categories/components/AllCategories.tsx

import { Category } from '@/utils/requests';

interface AllCategoriesProps {
  categories: Category[];
  selectCategory: (category: any) => void;
}

const AllCategories = ({ categories,selectCategory}: AllCategoriesProps) => {
  return (
    <>
      {categories.map((category) => (
        <div
          onClick={() => selectCategory({
            id: category.id,
            name: category.name,
            image: category.imageURL
          })}
          key={category.id}
          className="bg-gray-200 w-full h-[180px] p-4 flex justify-center items-center"
        >
          {category.name}
        </div>
      ))}
    </>
  );
};

export default AllCategories;
