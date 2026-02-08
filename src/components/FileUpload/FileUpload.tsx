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
    <div className="file-upload w-full flex flex-col justify-center items-center relative">
      <UploadArea
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        handleFileChange={handleInputChange}
        preview={preview}
      />
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}
      {uploading && (
        <div className="flex items-center gap-2 mt-2 text-blue-500 text-sm">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Subiendo imagen...
          <div className="w-full bg-gray-200 rounded-full h-1.5 ml-2 max-w-[200px]">
            <div className="bg-blue-500 h-1.5 rounded-full animate-pulse w-2/3" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
