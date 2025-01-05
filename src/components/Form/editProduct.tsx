'use client';
import Button from '@/ui/Buttons/ButtonText';
import { PatchProduct } from '@/utils/mutations';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import FileUpload from '../FileUpload/FileUpload';

interface Props {
  name: string;
  description: string;
  probability: number;
  imageUrl: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre es demasiado corto')
    .required('El nombre del producto es requerido'),
  description: Yup.string()
    .min(8, 'La descripción es demasiado corta')
    .required('La descripción de la categoría es requerida'),
  probability: Yup.number()
    .min(0, 'La probabilidad debe ser al menos 0')
    .required('La probabilidad es requerida'),
  imageUrl: Yup.string()
    .url('Debe ser una URL válida')
    .required('La imagen es requerida'),
});

const EditProduct = ({description,imageUrl,name,probability}:Props) => {
  const navigate = useRouter();
  const pathname = usePathname();

  const [file, setFile] = useState<string | null>(null); // Tipo ajustado a string o null
  const mutation = useMutation({
    mutationFn: (data:any)=>PatchProduct(data.product,data.id),
    onSuccess: async (data) => {
      navigate.push('/categories');
    }
  });

  const handlerAddProduct = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Formik
      initialValues={{
        name,
        description,
        probability,
        imageUrl,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Combinar los valores del formulario con la URL de la imagen
        const formData = {
          ...values,
          imageUrl: file,
        };
        // Aquí puedes enviar formData a tu backend o manejarlo según tus necesidades
        setTimeout(() => {
            const partsUrl = pathname.split('/')
          alert(JSON.stringify(formData, null, 2));
          const addProductJson = {
            name: values.name,
            description: values.description,
            probability: values.probability,
            imageURL: values.imageUrl,
            categoryId: `${pathname.split('/')[2]}`,
          };
          handlerAddProduct({product:addProductJson,id:partsUrl[partsUrl.length - 1]});
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="w-[98%]">
          <div className="w-full mb-5 mt-4 p-2">
            <label htmlFor="name" className={`block mb-2 text-sm font-medium`}>
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
                <span className="font-medium">¡Genial!</span>
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="w-full mb-5 p-2">
            <label
              htmlFor="description"
              className={`block mb-2 text-sm font-medium`}
            >
              Descripción
            </label>
            <Field
              as="textarea"
              rows="5"
              name="description"
              id="description"
              placeholder="Descripción"
              className={`block w-[100%]  p-2.5 text-sm border-2 rounded-lg focus:ring`}
            />
            <ErrorMessage
              name="description"
              component="p"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            />
            {!errors.description && touched.description && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">¡Bien!</span> La descripción es
                válida.
              </p>
            )}
          </div>

          {/* Probabilidad */}
          <div className="w-full mb-5 p-2">
            <label
              htmlFor="probability"
              className={`block mb-2 text-sm font-medium`}
            >
              Probabilidad
            </label>
            <Field
              type="number"
              name="probability"
              id="probability"
              placeholder="0"
              step="0.01"
              className={`block w-[100%] p-2.5 text-sm border-2 rounded-lg focus:ring`}
            />
            <ErrorMessage
              name="probability"
              component="p"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            />
          </div>

          {/* Componente de Subida de Archivo */}
          <div className="w-full mb-5 p-2">
            <label htmlFor="image" className={`block mb-2 text-sm font-medium`}>
              Imagen del Producto
            </label>
            <FileUpload
              setFile={(url: string | null) => {
                setFile(url);
                setFieldValue('imageUrl', url);
              }}
            />
            {errors.imageUrl && touched.imageUrl && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.imageUrl}
              </p>
            )}
            {!errors.imageUrl && file && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">¡Listo!</span> La imagen ha sido
                subida.
              </p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="w-4/12 mx-auto mb-6 mt-6">
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

export default EditProduct;
