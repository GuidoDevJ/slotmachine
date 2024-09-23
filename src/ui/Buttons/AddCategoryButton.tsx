'use client';

import Button from '@/ui/Buttons/ButtonText';
import { useRouter } from 'next/navigation';

const AddCategoryButton = () => {
  const router = useRouter();

  const handleAddCategory = () => {
    router.push('/categories/add');
  };

  return (
    <Button
      size="small"
      color="primary"
      large="large"
      onClick={handleAddCategory}
    >
      + Agregar Categoria
    </Button>
  );
};

export default AddCategoryButton;
