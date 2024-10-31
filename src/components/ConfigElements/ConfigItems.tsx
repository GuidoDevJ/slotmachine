import Button from '@/ui/Buttons/ButtonText';
import { AddConfig } from '@/utils/mutations';
import {
  Category,
  getCategories,
  getConfig,
  getProductsCategories,
} from '@/utils/requests';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Drop from '../DropDown/Drop';
import DropItem from '../DropDown/DropItem';
import ConfigContainer from './ConfigContainer';

interface Props {
  show?: boolean;
}
interface ConfigItemsInterface {
  categoryId: string;
  products: string[];
}
const ConfigItems = ({ show = true }: Props) => {
  const navigate = useRouter();
  const { data: config = [] } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });
  const mutation = useMutation({
    mutationFn: AddConfig,
    onSuccess: async (data) => {
      console.log(data);
      setTimeout(() => {
        navigate.push('/config');
      }, 2000);
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  const handlerAddConfig = (data: any): any => {
    mutation.mutate(data);
  };
  const [isOpen, setIsOpen] = useState<boolean>(false); // Tipar el estado correctamente
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [cat, setCat] = useState<ConfigItemsInterface>();

  const [selectedCategory, setSelectedCategory] = useState<{
    text: string;
    id: string;
  }>({
    text: 'Sandwiches',
    id: '',
  });

  // useQuery para obtener las categorías
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const {
    data: category,
    error,
    // isLoading,
  } = useQuery<Category[]>({
    queryKey: ['category', selectedCategory],
    queryFn: () => getProductsCategories(selectedCategory!.id) as any,
    enabled: !!selectedCategory,
  });
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };
  const handleSelect = (id: string): void => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
      const newCat = { categoryId: id, products: selectedProducts };
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
    <ConfigContainer both={true} showButtons={show}>
      <h2 className="mb-4 font-normal text-gray-700 mt-10">Categorías</h2>
      <Drop
        text={selectedCategory!.text}
        toggleDropdown={toggleDropdown}
        isOpen={isOpen}
      >
        {categories.map((c: Category) => (
          <DropItem
            resetProducts={() => {
              setSelectedProducts([]);
            }}
            toggleDropdown={toggleDropdown}
            key={c._id}
            id={c._id}
            text={c.name}
            selectCat={setSelectedCategory}
          />
        ))}
      </Drop>
      <h2 className="mt-4 font-normal text-gray-700">Imágenes seleccionadas</h2>
      <span className="mt-2 font-extralight text-[10px] text-gray-400 block mb-10">
        *Selecciona una categoría para visualizar las imágenes
      </span>
      <div className="w-full max-w-[950px] grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mx-auto my-auto">
        {category &&
          category.map((c: any) => (
            <div
              onClick={(e: any) => selectedProduct(e)}
              key={c._id}
              data-key={c._id}
              className={`max-w-[150px] w-full h-[300px] flex flex-col border-solid border-[2px] rounded-lg ${
                selectedProducts.includes(c._id)
                  ? 'border-red-600'
                  : 'border-[#D9D9D9]'
              }`}
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
              <div className="w-full h-[25%] bg-slate-200 flex flex-col justify-center p-2">
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
              const mapLastConfig = config.categoriesSelected.map(
                (config: any) => {
                  return {
                    categoryId: config.categoryId._id,
                    products: [
                      ...config.products.map((product: any) => product._id),
                    ],
                  };
                }
              );
              const filterConfig = mapLastConfig.filter(
                (config: any) => config.categoryId !== selectedCategory.id
              );
              console.log(filterConfig);
              const data = {
                categoriesSelected: [
                  ...filterConfig,
                  {
                    categoryId: selectedCategory.id,
                    products: selectedProducts,
                  },
                ],
              };
              console.log(data);
              handlerAddConfig(data)
            }}
          >
            Guardar
          </Button>
        </div>
      ) : null}
    </ConfigContainer>
  );
};

export default ConfigItems;
