"use client"
import ConfigContainer from "@/components/ConfigElements/ConfigContainer";
import Button from "@/ui/Buttons/ButtonText";
import { PatchCategorySelected } from "@/utils/mutations";
import { Category, getProductsCategories, getSpecificConfig } from "@/utils/requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateCategorySelected = () => {
  const navigate = useRouter();
  const { categoryId } = useParams(); // Obtén el parámetro `id`
  const { data:selectProd, isLoading, isError } = useQuery({
    queryKey: [`category ${categoryId}`],
    queryFn: () => getSpecificConfig(categoryId as string), // Pass a function that calls getSpecificConfig
  });
  const [allProducts,setAllProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('Sandwiches');
  const mutation = useMutation({
    mutationFn: (data:any)=>PatchCategorySelected(data,categoryId as string),
    onSuccess: async (data) => {
      navigate.push('/config');
    }
  });

  const handlerPatchCategory = (data: any) => {
    mutation.mutate(data);
  };
  const {
    data: products,
    error,
    // isLoading,
  } = useQuery<Category[]>({
    queryKey: ['category', categoryId],
    queryFn: () => getProductsCategories(categoryId as string),
  });

  useEffect(() => {
    if (!selectProd || !products) return; // Asegúrate de que ambos estén definidos
  
    // Extrae los productos activos y márcalos como activos
    const activeProducts = selectProd.products?.map((product: any) => ({
      ...product,
      active: true,
    })) || [];
    activeProducts.forEach((product: any) => {
      if (!selectedProducts.includes(product._id)) {
        setSelectedProducts((selectedProd:any)=>[...selectedProd,product._id]);
      }
    });

    // Combina los productos activos y no activos asegurando la unicidad
    const allCombinedProducts = [...activeProducts, ...products];
    const uniqueProducts = allCombinedProducts.reduce((acc: any[], product: any) => {
      if (!acc.some((item) => item._id === product._id)) {
        acc.push(product);
      }
      return acc;
    }, []);
  
    setAllProducts(uniqueProducts as any);
  }, [selectProd, products]);
  

  const handleSelect = (id: string): void => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };
  const selectedProduct = (e: Event) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    const idElement = element.getAttribute('data-key');
    handleSelect(idElement as string);
  };

  return (
    <ConfigContainer>
      <h2 className="mb-4 font-normal text-gray-700 mt-10">Categorías</h2>
      <input
        className="w-[200px] border-solid border-[2px] border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 rounded-md p-2"
        value={inputValue}
        disabled={true}
      />
      <h2 className="mt-4 font-normal text-gray-700">Imágenes seleccionadas</h2>
      <span className="mt-2 font-extralight text-[10px] text-gray-400 block mb-10">
        *Selecciona una categoría para visualizar las imágenes
      </span>
      <div className="w-full max-w-[950px] grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mx-auto my-auto">
        {allProducts &&
          allProducts.map((c: any) => (
            <div
              onClick={(e: any) => selectedProduct(e)}
              key={c._id}
              data-key={c._id}
              className={`max-w-[150px] w-full h-[300px] flex flex-col border-solid border-[2px] rounded-lg ${selectedProducts.includes(c._id)? "border-red-600" :"" }`}
            >
              <div className="w-full h-[75%]">
                <Image
                  className="w-full h-full"
                  src={c.imageURL}
                  alt={c.name}
                  width={480} // Especifica el ancho real de la imagen
                  height={480} // Especifica la altura real de la imagen
                  layout="responsive" // Asegura que la imagen es responsive
                />
              </div>
              <div className="w-full h-[25%] bg-[#CAC4D0] flex flex-col justify-center p-2">
                <h3 className="text-[16px] font-bold mb-2">{c.name}</h3>
                <span className="text-[8px] text-[#000]">{c.description}</span>
              </div>
            </div>
          ))}
      </div>
      {selectedProducts.length > 0 ? (
        <div className="w-40 p-4 mx-auto block">
          <Button
            color="primary"
            size="small"
            onClick={() => {
              handlerPatchCategory({products: [...selectedProducts]})
            }}
          >
            Guardar
          </Button>
        </div>
      ) : null}
    </ConfigContainer>
  )
}

export default UpdateCategorySelected