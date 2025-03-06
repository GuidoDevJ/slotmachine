import { useState } from 'react';

const UseUploadingState = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return {
    uploading,
    setUploading,
    error,
    setError,
  };
};

export default UseUploadingState;
