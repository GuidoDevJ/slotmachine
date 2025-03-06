/* eslint-disable @next/next/no-img-element */
import { useFileUpload } from '@/hook';
import React from 'react';
import UploadArea from './UploadArea';

interface FileUploadProps {
  setFile: (url: string) => void;
  imgUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, imgUrl }) => {
  const {
    preview,
    uploading,
    error,
    inputRef,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
  } = useFileUpload(setFile, imgUrl);
  return (
    <div className="file-upload w-full flex justify-center items-center relative">
      <UploadArea
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        handleFileChange={handleInputChange}
        preview={preview}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploading && <p className="text-blue-500 mt-2">Subiendo imagen...</p>}
    </div>
  );
  
};

export default FileUpload;
