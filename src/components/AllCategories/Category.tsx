import { useSelectedCategory } from '@/stores/categories';
import Image from 'next/image';
interface Category {
  goTo: (id: string) => void;
  _id: string;
  name: string;
  imageURL: string;
}
export const Category = ({ goTo, _id, imageURL, name }: Category) => {
  const setSelectedCategory = useSelectedCategory(
    (state) => state.setSelectedCategory
  );
  return (
    <div
      onClick={() => {
        setSelectedCategory({
          _id: _id,
          name: name,
          imageUrl: imageURL,
        });
        goTo(`categories/${_id}/products`);
      }}
      key={_id}
      className="w-full h-[180px] relative p-4 flex justify-center items-center"
    >
          {/* <div className="absolute inset-0 opacity-70 hover:opacity-0 transition-opacity duration-500"></div>
          <div className="relative z-10">
    <h2 className="text-white font-inter font-bold hover:text-2xl duration-500">{name}</h2>
    <Image src={imageURL} alt={name} width={200} height={200} /> */}
    <ImageWithOverlay imageUrl={imageURL} altText={name}/>
  </div>

  );
};

export default Category;





const ImageWithOverlay = ({ imageUrl, altText }:{imageUrl:string,altText:string}) => {
  return (
    <div className="relative w-full h-[180px] group hover:cursor-pointer">
      {/* Imagen - Estará debajo del fondo oscuro */}
      <Image
        src={imageUrl}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="object-cover z-0"
      />

      {/* Fondo oscuro - Este fondo estará encima de la imagen y se desvanecerá al hacer hover */}
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>

      {/* Texto centrado que cambia de tamaño al hacer hover */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-inter font-bold z-20 text-lg group-hover:text-xl transition-all duration-300">
        {altText}
      </div>
    </div>
  );
};


    

