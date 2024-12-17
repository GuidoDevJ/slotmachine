'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import Button from '@/ui/Buttons/ButtonText';
import { Login } from '@/utils/mutations';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface Props {
  setIsloading:(bolean:boolean)=>void
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'email is too short')
    .required('email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const LoginForm = ({setIsloading}:Props) => {
  const login = useAuthStore((state) => state.login); // Obtiene la función login de Zustand
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useRouter();
  const mutation = useMutation({
    mutationFn: Login,
    onSuccess: async (data) => {
      setIsloading(false)
      const { token } = data;
      login(token); 
      navigate.push('/config');
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  const handlerLogin = (values: any) => {
    mutation.mutate(values);
    setIsloading(true)
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handlerLogin(values);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-[300px] max-w-[600px]">
          <div className="w-full mb-5">
            <label
              htmlFor="email"
              className={`block mb-2 text-[14px] md:text-[20px] font-medium ${
                errors.email && touched.email
                  ? 'text-red-700 dark:text-red-500'
                  : 'text-[#ddd]-500'
              }`}
            >
              Your name
            </label>
            <Field
              type="text"
              name="email"
              id="email"
              placeholder="guido@xxx.com"
              className={`block h-[30px] md:h-[40px] w-full p-2.5 text-[16px] rounded-[4px] focus:ring ${
                errors.email && touched.email
                  ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500'
                  : 'bg-[#fff] border-[##E0E0E0] border-[1px] text-[#ddd]  dark:bg-gray-700 dark:border-green-500 dark:text-green-400 dark:placeholder-green-500'
              }`}
            />
            <ErrorMessage
              name="email"
              component="p"
              className="mt-2 text-[10px] text-red-600 dark:text-red-500"
            />
            {!errors.email && touched.email && (
              <p className="mt-2 text-[12px] text-green-600 dark:text-green-500">
                <span className="font-medium">Alright!</span> email available!
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className={`block mb-2 text-[14px] md:text-[20px] font-medium ${
                errors.password && touched.password
                  ? 'text-red-700 dark:text-red-500'
                  : 'text-[#ddd]-500'
              }`}
            >
              Password
            </label>
            <Field
              type="text"
              name="password"
              id="password"
              placeholder="*********"
              className={`block h-[30px] md:h-[40px] w-full p-2.5 text-[16px] rounded-[4px] focus:ring ${
                errors.password && touched.password
                  ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500'
                  : 'bg-[#fff] border-[##E0E0E0] border-[1px] text-[#ddd]  dark:bg-gray-700 dark:border-green-500 dark:text-green-400 dark:placeholder-green-500'
              }`}
            />
            <ErrorMessage
              name="password"
              component="p"
              className="mt-2 text-[10px] text-red-600 dark:text-red-500"
            />
            {!errors.password && touched.password && (
              <p className="mt-2 text-[10px] text-green-600 dark:text-green-500">
                <span className="font-medium">Alright!</span> password correct!
              </p>
            )}
          </div>

          <div className="w-full flex justify-center items-center">
            <Button color="primary" size="small" type='submit'>
              Ingresar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
