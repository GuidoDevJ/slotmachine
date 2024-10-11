import Delete from '@/../public/images/botton_borrar.svg';
import Edit from '@/../public/images/botton_edit.svg';
import { useProductCategory } from '@/stores/product';
import { deleteProduct } from '@/utils/requests';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

interface ProductCard {
  description: string;
  imageUrl: string;
  name:string;
  probability:number;
  hiddenPopUp:(boolean:boolean)=>any,
  id:string,
  setSelectProduct:(id:string)=>any,
  goToEditForm:(id:string)=>any

}

const ProductsCard = ({ description, imageUrl ,name,probability,hiddenPopUp,id,setSelectProduct,goToEditForm}: ProductCard) => {
  const productSelected =  {
    _id: id,
    name,
    imageUrl,
    description,
    probability,
  }
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async (data) => {
      // navigate.push('/categories');
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });
  const setProduct = useProductCategory((state)=>state.setProductCategory)

  const deleteAction = (e: any) => {
    hiddenPopUp(false);
    setSelectProduct(id)
  };

  const handlerGoToEdit =()=>{
    setProduct(productSelected)
    goToEditForm(id)
  }

  return (
    <>
      <div className="relative group w-full h-[280px] rounded-xl">
        {/* Componente A: Imagen del producto */}
        <div className="group-hover:hidden w-full h-full flex flex-col bg-gray-200">
          <div className="w-full h-[80%]">
            <Image
              src={imageUrl}
              alt="product"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full h-[20%] bg-slate-400">{description}</div>
        </div>
        {/* Componente B: Iconos de editar y borrar */}
        <div className="hidden group-hover:flex items-center justify-evenly bg-red-600 w-full h-full p-4">
          <Image src={Edit} width={50} height={50} alt="icon-edit" onClick={handlerGoToEdit} className='hover:cursor-pointer'/>
          <Image
            src={Delete}
            width={50}
            height={50}
            alt="icon-delete"
            onClick={(e) => deleteAction(e)}
            className='hover:cursor-pointer'
          />
        </div>
      </div>
    </>

  );
};

export default ProductsCard;
