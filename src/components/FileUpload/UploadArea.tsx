import { DragEvent, useRef, useState } from 'react';

const UploadArea = ({
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileChange,
  preview,
}: {
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: () => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleDragOver(e);
  };

  const onDragLeave = () => {
    setIsDragging(false);
    handleDragLeave();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    handleDrop(e);
  };

  return (
    <div className="w-full h-96 flex justify-center items-center relative bg-slate-700 rounded-lg overflow-hidden">
      {preview && (
        <div
          onClick={() => inputRef.current?.click()}
          className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded cursor-pointer z-10 hover:opacity-90 transition-opacity text-sm"
          role="button"
          aria-label="Cambiar imagen"
        >
          Editar imagen
        </div>
      )}
      <div
        className={`relative w-full h-full flex justify-center items-center upload-area transition-all duration-300 cursor-pointer ${
          isDragging
            ? 'bg-slate-400 border-2 border-dashed border-white'
            : 'bg-slate-500'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="button"
        tabIndex={0}
        aria-label="Subir imagen - arrastra o haz clic"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Seleccionar archivo de imagen"
        />
        {!preview && (
          <div className="flex flex-col items-center gap-3 text-white">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-60"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-center">
              {isDragging ? 'Suelta la imagen aqui' : 'Arrastra una imagen o haz clic para subir'}
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP hasta 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
