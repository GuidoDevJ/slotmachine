'use client';
import Header from '@/components/Header/Header';
import Button from '@/ui/Buttons/ButtonText';
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
];

const GameCurrent = () => {
  const [cat, setCat] = useState(initialState);

  return (
    <>
      <Header />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[70%] min-w-[480px] h-[200px] border-solid border-[#D9D9D9] border-[1px] rounded-lg flex flex-col justify-center items-center mt-6 mb-6">
          <div className="w-[100%] h-full pr-4 pl-4">
            <h2 className="mb-4 font-normal text-gray-700 mt-10 ml-20">Intervalo de Ganadores</h2>
            <input
              className="w-[200px] h-[40px] flex items-center rounded p-2 border-[2px] border-solid border-red-500  outline-none ml-20"
              type="input"
            >
            </input>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[70%] min-w-[480px] md:h-[580px] border-solid border-[#D9D9D9] border-[1px] rounded-lg flex flex-col justify-center items-center mb-6">
          <div className="w-[100%] h-full pr-4 pl-4">
            <h2 className="mb-4 font-normal text-gray-700 mt-10 ml-20">Categorías</h2>

            <button
              className="w-[200px] h-[40px] ml-20 flex items-center rounded p-2 border-[2px] border-solid border-red-500 "
              type="button"
              id="dropdownMenuButton1"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              {'selectedCategory'}
            </button>
            <h2 className="mt-4 font-normal text-gray-700 ml-20">Imágenes</h2>
            <div className="w-full max-w-[950px]  grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mx-auto my-auto">
              {cat.map((c) =>
                c.products.map((p) => (
                  <div
                    key={p._id}
                    data-key={p._id}
                    className={`max-w-[150px] w-full h-[380px] flex flex-col border-solid border-[2px] rounded-lg 
                          : 'border-[#D9D9D9]'
                      `}
                  >
                    <div className="w-full h-[75%]">
                      <img
                        className="w-full h-full"
                        src={p.imageURL}
                        alt={p.name}
                      />
                    </div>
                    <div className="w-full h-[25%] bg-slate-200 flex flex-col justify-center">
                      <h3 className="text-[16px] font-bold mb-2">{p.name}</h3>
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
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[70%] min-w-[480px] md:h-[580px] border-solid border-[#D9D9D9] border-[1px] rounded-lg flex flex-col justify-center items-center mb-6">
          <div className="w-[100%] h-full pr-4 pl-4">
            <h2 className="mb-4 font-normal text-gray-700 mt-10 ml-20">Categorías</h2>

            <button
              className="w-[200px] h-[40px] flex items-center rounded p-2 border-[2px] border-solid border-red-500 ml-20"
              type="button"
              id="dropdownMenuButton1"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              {'Cervezas'}
            </button>
            <h2 className="mt-4 font-normal text-gray-700 ml-20">Imágenes</h2>
            <div className="w-full max-w-[950px]  grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mx-auto my-auto">
              {cat.map((c) =>
                c.products.map((p) => (
                  <div
                    key={p._id}
                    data-key={p._id}
                    className={`max-w-[150px] w-full h-[380px] flex flex-col border-solid border-[2px] rounded-lg 
                           'border-[#D9D9D9]'
                      `}
                  >
                    <div className="w-full h-[75%]">
                      <img
                        className="w-full h-full"
                        src={p.imageURL}
                        alt={p.name}
                      />
                    </div>
                    <div className="w-full h-[25%] bg-slate-200 flex flex-col justify-center">
                      <h3 className="text-[16px] font-bold mb-2">{p.name}</h3>
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
      </div>
      <div className="w-[250px] mx-auto my-auto p-6">
            <Button color="primary" size="small" large='small'>
              + Agregar Categoria
            </Button>
      </div>
    </>
  );
};

export default GameCurrent;
