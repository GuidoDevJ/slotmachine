'use client';
import Add from '@/../public/images/botton_add.svg';
import { IProducts } from '@/app/api/models/Products';
import ProductsCard from '@/components/ProductCard/ProductsCard';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import { useSelectedCategory } from '@/stores/categories';
import DeletePopUp from '@/ui/PopUp/delete';
import { getProductsCategories } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const ProductsCategories = () => {
  const getSelectedCategory = useSelectedCategory((state)=>state.getSelectedCategory)
  const {name} = getSelectedCategory();
  const [hid, setHid] = useState(true);
  const [prodSelect, setProdSelect] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  // useQuery para obtener las categorías
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<IProducts[]>({
    queryKey: ['products',`${name}`],
    queryFn: () => getProductsCategories(`${pathname.split('/')[2]}`),
  });
  const handleAddProduct = () => {
    router.push(`/categories/${pathname.split('/')[2]}/add`);
  };
  const goToEditForm = (id: string) => {
    setProdSelect(id);
    router.push(`/categories/${pathname.split('/')[2]}/products/${id}`);
  };
  return (
    <ProtectedRoute>
      <div className="w-full flex justify-center items-center">
        <div className="w-[60vw] h-full flex flex-col justify-between items-center">
          <h1 className="text-center text-[24px] font-bold mt-10 mb-10">{name}</h1>
          <div className="w-full grid sm:grid-cols-4 xl:grid-cols-6 md:grid-cols-5 gap-4">
            {products.map((product: IProducts) => (
              <ProductsCard
                name={product.name}
                probability={product.probability}
                key={product._id}
                description={product.description}
                imageUrl={product.imageURL}
                hiddenPopUp={setHid}
                id={product._id}
                setSelectProduct={setProdSelect}
                goToEditForm={goToEditForm}
              />
            ))}
            {/*Agregar producto nuevo */}
            <div className="relative group w-full h-[280px]">
              <div className="flex flex-col items-center justify-center w-full h-full p-4 rounded-xl border-[#ddd] border-solid border-[2px]">
                <h3 className="text-center font-semibold">Agregar un producto nuevo</h3>
                <Image
                  src={Add}
                  width={50}
                  height={50}
                  alt="icon-add"
                  onClick={handleAddProduct}
                  className='hover:cursor-pointer'
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-60">
          {hid ? null : (
            <DeletePopUp setHidden={setHid} productId={prodSelect} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductsCategories;
