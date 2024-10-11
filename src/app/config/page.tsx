'use client';
import Drop from '@/components/DropDown/Drop';
import DropItem from '@/components/DropDown/DropItem';
import Header from '@/components/Header/Header';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import Button from '@/ui/Buttons/ButtonText';
import { Category, getCategories } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const initialState = [
  {
    id: 1,
    name: 'Cerveza',
    products: [
      {
        _id: '1',
        name: 'Brahma',
        description: 'Rica como la empa',
        imageURL:
          'https://cdn.shopify.com/s/files/1/0271/8158/0388/files/Budweiser_botella-33-cl_480x480.jpg?v=1621272814',
      },
      {
        _id: '2',
        name: 'Miller',
        description: 'Rica como la empa',
        imageURL:
          'https://acdn.mitiendanube.com/stores/001/211/660/products/corona-7101-9a2faa7ea9b4adc38d16196380770669-480-0.png',
      },
      {
        _id: '3',
        name: 'Miller',
        description: 'Rica como la empa',
        imageURL:
          'https://acdn.mitiendanube.com/stores/001/211/660/products/corona-7101-9a2faa7ea9b4adc38d16196380770669-480-0.png',
      },
      {
        _id: '4',
        name: 'Miller',
        description: 'Rica como la empa',
        imageURL:
          'https://acdn.mitiendanube.com/stores/001/211/660/products/corona-7101-9a2faa7ea9b4adc38d16196380770669-480-0.png',
      },
      {
        _id: '5',
        name: 'Miller',
        description: 'Rica como la empa',
        imageURL:
          'https://acdn.mitiendanube.com/stores/001/211/660/products/corona-7101-9a2faa7ea9b4adc38d16196380770669-480-0.png',
      },
    ],
  },
  {
    id: 5,
    name: 'Pizzas',
    products: [
      {
        _id: '1',
        name: 'Pizza a la napo',
        description: 'Rica como la empa',
        imageURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlbbflSDAjeSX-zC9ssbSqgJvMv07ZZoiAQ&s',
      },
      {
        _id: '2',
        name: 'Pizza a la napo',
        description: 'Rica como la empa',
        imageURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlbbflSDAjeSX-zC9ssbSqgJvMv07ZZoiAQ&s',
      },
    ],
  },
];

const ConfigPage = () => {
  const [cat, setCat] = useState(initialState);
  const [selectedCategory, setSelectedCategory] = useState('Cerveza');
  const [isOpen, setIsOpen] = useState<boolean>(false); // Tipar el estado correctamente
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  // useQuery para obtener las categorías
  const { data: categories = [], isLoading, isError } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

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
    <ProtectedRoute>
      <Header />
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-2xl mt-10 mb-10">Configuración</h1>
        <div className="w-[70%] min-w-[480px] h-auto border-solid border-[#D9D9D9] border-[1px] rounded-lg flex flex-col justify-center items-center mb-6 p-2">
          <div className="w-[100%] h-full pr-4 pl-4">
            <h2 className="mb-4 font-normal text-gray-700 mt-10">Categorías</h2>
            <Drop
              text={selectedCategory}
              toggleDropdown={toggleDropdown}
              isOpen={isOpen}
            >
              {categories.map((c:Category) => (
                <DropItem
                  resetProducts={() => {
                    setSelectedProducts([]);
                  }}
                  toggleDropdown={toggleDropdown}
                  key={c._id}
                  text={c.name}
                  selectCat={setSelectedCategory}
                />
              ))}
            </Drop>
            <h2 className="mt-4 font-normal text-gray-700">
              Imágenes seleccionadas
            </h2>
            <span className="mt-2 font-extralight text-[10px] text-gray-400 block mb-10">
              *Selecciona una categoría para visualizar las imágenes
            </span>
            <div className="w-full max-w-[950px] grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mx-auto my-auto">
              {cat
                .filter((c) => c.name === selectedCategory)
                .map((c) =>
                  c.products.map((p) => (
                    <div
                      onClick={(e: any) => selectedProduct(e)}
                      key={p._id}
                      data-key={p._id}
                      className={`max-w-[150px] w-full h-[380px] flex flex-col border-solid border-[2px] rounded-lg ${
                        selectedProducts.includes(p._id)
                          ? 'border-red-600'
                          : 'border-[#D9D9D9]'
                      }`}
                    >
                      <div className="w-full h-[75%]">
                        <img
                          className="w-full h-full"
                          src={p.imageURL}
                          alt={p.name}
                        />
                      </div>
                      <div className="w-full h-[25%] bg-slate-200 flex flex-col justify-center">
                        <h3 className="text-[16px] font-bold mb-2">
                          {p.name}
                        </h3>
                        <span className="text-[8px] text-[#000]">
                          {p.description}
                        </span>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
        {selectedProducts.length !== 0 ? (
          <div className="mx-auto my-auto p-6">
            <Button color="primary" size="small">
              Guardar
            </Button>
          </div>
        ) : null}
      </div>
    
    </ProtectedRoute>

  );
};

export default ConfigPage;
