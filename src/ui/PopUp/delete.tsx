'use client';
import DeleteIcon from '@/../public/images/Delete_Icon.svg';
import { deleteProduct } from '@/utils/requests';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

interface Props  {
  notif?: () => any;
  setHidden: (bol: boolean) => any;
  productId: string;
}

const DeletePopUp = ({
  productId,
  notif,
  setHidden,
}:Props) => {

  // Set up the mutation
  const mutation = useMutation({
    mutationFn: (itemId: string) => deleteProduct(itemId),
    onSuccess: () => {
      setHidden(true)
      // Invalidate and refetch the items query to keep the UI in sync
      // queryClient.invalidateQueries(['items']);
    },
  });

  // Handle delete
  const handleDelete = (itemId: string) => {
    mutation.mutate(itemId);
  };
  const closePopUp = () => {
    setHidden(true);
  };

  return (
    <div
      className={`w-[400px] h-[250px] bg-[#fef7ff] rounded-2xl flex flex-col justify-evenly items-center`}
    >
      <Image src={DeleteIcon} alt="Delete Icon" height={50} width={50} />
      <h2 className="text-3xl font-medium">Eliminar</h2>
      <p className="text-[#000] text-lg">¿Deseas eliminar este producto?</p>
      <div className="flex justify-center gap-4">
        <button
          className="text-black px-4 py-2 rounded-xl font-semibold"
          onClick={closePopUp}
        >
          En otro momento
        </button>
        <button
          className="bg-[#ff0000] text-white px-6 py-2 font-semibold rounded-2xl"
          onClick={()=>handleDelete(productId)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
