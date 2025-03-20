'use client'
import Button from '@/ui/Buttons/ButtonText';
import { AddCategory } from '@/utils/mutations';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import FileUpload from '../FileUpload/FileUpload';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre es demasiado corto')
    .required('El nombre del producto es requerido'),
  imageUrl: Yup.string().url('Debe ser una URL válida').required('La imagen es requerida'),
});
interface Props {
  setShowPopUp?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCategoryForm = ({setShowPopUp}:Props) => {
  const navigate = useRouter();
  const [file, setFile] = useState<string | null>(null); // Tipo ajustado a string o null
  const mutation = useMutation({
    mutationFn: AddCategory,
    onSuccess: async (data) => {
      setShowPopUp?.(true)
      setTimeout(()=>{
        setShowPopUp?.(false)
        navigate.push('/categories');
      },2000)
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  const handlerAddCategory =(data:any)=>{
    mutation.mutate(data)
  }

  return (
    <Formik
      initialValues={{ name: '', imageUrl: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Combinar los valores del formulario con la URL de la imagen
        const formData = {
          ...values,
          imageUrl: file,
        };
        // Aquí puedes enviar formData a tu backend o manejarlo según tus necesidades
        setTimeout(() => {
          alert(JSON.stringify(formData, null, 2));
          const addItem = {
            name: values.name,
            imageURL: values.imageUrl,
          }
          handlerAddCategory(addItem)
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="w-[98%]">
          <div className="w-full mb-5 mt-4 p-2">
            <label
              htmlFor="name"
              className={`block mb-2 text-sm font-medium`}
            >
              Nombre
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Nombre del producto"
              className={`block w-[100%] p-2.5 text-sm border-2 rounded-lg focus:ring`}
            />
            <ErrorMessage
              name="name"
              component="p"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            />
            {!errors.name && touched.name && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">¡Genial!</span> El nombre está disponible.
              </p>
            )}
          </div>


          {/* Componente de Subida de Archivo */}
          <div className="w-full mb-5 p-2">
            <label
              htmlFor="image"
              className={`block mb-2 text-sm font-medium`}
            >
              Imagen del Producto
            </label>
            <FileUpload setFile={(url: string | null) => {
              setFile(url);
              setFieldValue('imageUrl', url);
            }} />
            {errors.imageUrl && touched.imageUrl && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.imageUrl}
              </p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className='w-4/12 mx-auto mb-6 mt-6'>
            <Button
              disabled={isSubmitting || !file} // Deshabilitar si está enviando o no hay archivo
              size="medium"
              large="small"
              type="submit"
              color="primary"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddCategoryForm;
