'use client';
import CreateUserForm from '@/components/Form/createUser';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';
import { MainSpinner } from '@/ui/Loaders';
import { Status } from '@/ui/PopUp/newCategory';
import NewUser from '@/ui/PopUp/newUser';
import { useState } from 'react';

const AddUserPage = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <ProtectedRoute>
      {showSpinner ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <MainSpinner />
        </div>
      ) : (
        <>
          {showPopUp && (
            <div className="absolute top-16 right-0">
              <NewUser
                key="ASDAS"
                title="Usuario nuevo"
                description="Nuevo usuario añadido"
              />
            </div>
          )}
          {showError && (
            <div className="absolute top-16 right-0">
              <NewUser
                key="ASDASA" 
                title={"Error"}
                description={errorMessage}
                status={Status.REJECTED}
              />
            </div>
          )}
          <h1 className="text-center text-2xl mt-10 font-bold">Agregar Usuario</h1>

          <div className="w-full h-full flex flex-col justify-center items-center">
            <CreateUserForm
              setShowSpinner={setShowSpinner}
              setShowPopUp={setShowPopUp}
              setShowError={setShowError}
              setErrorMessage={setErrorMessage}
            />
          </div>
        </>
      )}
    </ProtectedRoute>
  );
};

export default AddUserPage;
