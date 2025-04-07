'use client'
import { registerUser } from '@/utils/mutations';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico no válido')
    .required('El correo electrónico es requerido'),
  password: Yup.string()
    .min(3, 'Contraseña muy corta')
    .max(20, 'Contraseña muy larga')
    .required('La contraseña es requerida'),
});
type Props = {
  setShowSpinner: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateUserForm = ({setShowSpinner,setShowPopUp}:Props) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setShowSpinner(false);
      setShowPopUp(true)
      setTimeout(() => {
        router.push('/config'); // Redirecciona después de crear el usuario
        setShowPopUp(false)
      }, 1600);
    },
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setShowSpinner(true);
        mutation.mutate(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-full max-w-[480px] border-2 mt-20 p-4">
          {/* Email */}
          <div className="w-full mb-5 mt-4 p-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Correo electrónico
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="correo@ejemplo.com"
              className="block w-full p-2.5 text-sm border-2 rounded-lg focus:ring"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            />
            {!errors.email && touched.email && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">¡Perfecto!</span> El email es válido.
              </p>
            )}
          </div>

          {/* password */}
          <div className="w-full mb-5 p-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Contraseña
            </label>
            <Field
              type="text"
              name="password"
              id="password"
              placeholder="Conseña"
              className="block w-full p-2.5 text-sm border-2 rounded-lg focus:ring"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="mt-2 text-sm text-red-600 dark:text-red-500"
            />
            {!errors.password && touched.password && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                <span className="font-medium">¡Genial!</span> Contraseña vália.
              </p>
            )}
          </div>

          {/* Botón de Envío */}
          <div className="w-4/12 mx-auto mb-6 mt-6">
            <button
              className='bg-primary text-white font-bold rounded-[2px] w-full py-4 text-[16px] tracking-wides'
            >
              {isSubmitting ? 'Enviando...' : 'Crear usuario'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
