'use client';
import AddCategoryForm from '@/components/Form/addCategory';
import Header from '@/components/Header/Header';
import NewCategory from '@/ui/PopUp/newCategory';
import { useState } from 'react';

const AddCategory = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <Header />
      <div className="w-[100vw] h-auto flex flex-col justify-around items-center mb-10">
        <h1 className="text-center font-bold mt-6 mb-6">Nueva Categoria</h1>
        <div className="w-[90%] sm:w-[50%] h-[90%] flex justify-center items-center border-2 rounded-lg">
          <AddCategoryForm setShowPopUp={setShowPopUp}/>
        </div>
      </div>

      {showPopUp ? (
        <div className="absolute top-16 right-0">
          <NewCategory
            description="Se agrego correctamente una categoria"
            title="Categoria nueva"
          />
        </div>
      ) : null}
    </>
  );
};
export default AddCategory;
