import { useEffect, useRef, useState } from 'react';
import UseUploadingState from './UploadingState';

interface UseFileUploadReturn {
  preview: string | null;
  uploading: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveImage: () => void;
}

export const useFileUpload = (
  setFile: (url: string) => void,
  imgUrl?: string
): UseFileUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(imgUrl || null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setError, setUploading, error, uploading } = UseUploadingState();
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setFile(file as any);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {};

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return {
    preview,
    uploading,
    error,
    inputRef,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveImage,
  };
};
