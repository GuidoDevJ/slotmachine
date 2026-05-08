import Delete from '@/../public/images/botton_borrar.svg';
import Edit from '@/../public/images/botton_edit.svg';
import { useProductCategory } from '@/stores/product';
import { deleteProduct } from '@/utils/requests';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

interface ProductCard {
  description: string;
  imageUrl: string;
  name: string;
  probability: number;
  hiddenPopUp: (boolean: boolean) => any;
  id: string;
  setSelectProduct: (id: string) => any;
  goToEditForm: (id: string) => any;
}

const getProbabilityColor = (probability: number): string => {
  if (probability >= 70) return 'bg-green-500';
  if (probability >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const ProductsCard = ({
  description,
  imageUrl,
  name,
  probability,
  hiddenPopUp,
  id,
  setSelectProduct,
  goToEditForm,
}: ProductCard) => {
  const productSelected = {
    _id: id,
    name,
    imageUrl,
    description,
    probability,
  };
  const mutation = useMutation({
    mutationFn: deleteProduct,
  });
  const setProduct = useProductCategory((state) => state.setProductCategory);

  const deleteAction = (e: any) => {
    hiddenPopUp(false);
    setSelectProduct(id);
  };

  const handlerGoToEdit = () => {
    setProduct(productSelected);
    goToEditForm(id);
  };

  return (
    <div className="relative group w-full h-[280px] rounded-xl bg-[#fff] shadow-sm hover:shadow-md transition-shadow">
      <div className="group-hover:hidden w-full h-full flex flex-col rounded-xl border-[#ddd] border-solid border-[2px]">
        <div className="w-full h-[60%] relative flex justify-center items-center overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="w-10px group-hover:scale-110 transition-transform duration-300"
          />
          {/* Probability badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${getProbabilityColor(probability)}`} />
            <span className="text-[10px] font-bold text-gray-700">{probability}%</span>
          </div>
        </div>
        <div className="flex flex-col h-[40%] justify-evenly">
          <p className="h-[40%] text-[#1D1B20] text-[16px] bg-[#fff] font-bold ml-2 flex justify-start items-center">
            {name}
          </p>
          <span className="h-[20%] text-[#49454F] text-[12px] bg-[#fff] ml-2 flex justify-start items-center line-clamp-2">
            {description}
          </span>
        </div>
      </div>
      <div className="hidden group-hover:flex items-center justify-evenly rounded-xl bg-red-600 w-full h-full p-4">
        <button
          onClick={handlerGoToEdit}
          className="hover:scale-110 transition-transform"
          aria-label={`Editar ${name}`}
        >
          <Image
            src={Edit}
            width={50}
            height={50}
            alt="Editar producto"
          />
        </button>
        <button
          onClick={(e) => deleteAction(e)}
          className="hover:scale-110 transition-transform"
          aria-label={`Eliminar ${name}`}
        >
          <Image
            src={Delete}
            width={50}
            height={50}
            alt="Eliminar producto"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
