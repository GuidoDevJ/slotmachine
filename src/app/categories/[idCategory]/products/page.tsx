'use client'
import Add from '@/../public/images/botton_add.svg';
import Delete from '@/../public/images/botton_borrar.svg';
import Edit from '@/../public/images/botton_edit.svg';
import Header from '@/components/Header/Header';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const ProductsCategories = () => {
  const router = useRouter()
  
const pathname = usePathname();
  const handleAddProduct = () => {
    router.push(`/categories/${pathname.split("/")[2]}/add`)
  }
  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-[80vw] h-full flex flex-col justify-between items-center">
          <h1 className="text-center mt-10">Categorias</h1>
          <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-4">
            {/* Producto 1 */}
            <div className="relative group w-full h-[260px]">
              {/* Componente A: Imagen del producto */}
              <div className="group-hover:hidden w-full h-full flex flex-col bg-gray-200">
                <div className="w-full h-[80%]">
                  <Image
                    src="https://jumboargentina.vtexassets.com/arquivos/ids/801634-800-600?v=638373335147600000&width=800&height=600&aspect=true"
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full h-[20%] bg-slate-400">f</div>
              </div>
              {/* Componente B: Iconos de editar y borrar */}
              <div className="hidden group-hover:flex items-center justify-evenly bg-red-600 w-full h-full p-4">
                <Image src={Edit} width={50} height={50} alt="icon-edit" />
                <Image src={Delete} width={50} height={50} alt="icon-delete" />
              </div>
            </div>

            {/* Producto 2 */}
            <div className="relative group w-full h-[260px]">
              <div className=" group-hover:hidden w-full h-full flex flex-col bg-gray-200">
                <div className="w-full h-[80%]">
                  <Image
                    src="https://jumboargentina.vtexassets.com/arquivos/ids/801634-800-600?v=638373335147600000&width=800&height=600&aspect=true"
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full h-[20%] bg-slate-400">f</div>
              </div>
              <div className="hidden group-hover:flex items-center justify-evenly bg-red-600 w-full h-full p-4">
                <Image src={Edit} width={50} height={50} alt="icon-edit" />
                <Image src={Delete} width={50} height={50} alt="icon-delete" />
              </div>
            </div>

            {/* Producto 3 */}
            <div className="relative group w-full h-[260px]">
              <div className=" group-hover:hidden w-full h-full flex flex-col bg-gray-200">
                <div className="w-full h-[80%]">
                  <Image
                    src="https://jumboargentina.vtexassets.com/arquivos/ids/801634-800-600?v=638373335147600000&width=800&height=600&aspect=true"
                    alt="product"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full h-[20%] bg-slate-400">f</div>
              </div>
              <div className="hidden group-hover:flex items-center justify-evenly bg-red-600 w-full h-full p-4">
                <Image src={Edit} width={50} height={50} alt="icon-edit" />
                <Image src={Delete} width={50} height={50} alt="icon-delete" />
              </div>
            </div>
          {/*Agregar producto nuevo */}
            <div className="relative group w-full h-[260px]">
              <div className="flex flex-col items-center justify-evenly bg-red-600 w-full h-full p-4">
                <h3 className='text-center'>Agregar un producto nuevo</h3>
                <Image src={Add} width={50} height={50} alt="icon-delete" onClick={handleAddProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCategories;
