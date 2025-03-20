'use client';
import ConfigItems from '@/components/ConfigElements/ConfigItems';
import ProtectedRoute from '@/components/ProtectedRoute/protectedRoute';

const NewCategory = () => {
  return (
    <ProtectedRoute>
      <div className="h-[100vh] flex justify-center items-center">
        <ConfigItems show={false} />
      </div>
    </ProtectedRoute>
  );
};

export default NewCategory;
