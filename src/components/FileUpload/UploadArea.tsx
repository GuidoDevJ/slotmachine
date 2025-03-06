import { DragEvent, useRef } from 'react';

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

  return (
    <div className="w-full h-96 flex justify-center items-center relative bg-slate-700">
      {preview && (
        <div
          onClick={() => inputRef.current?.click()}
          className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded cursor-pointer z-10"
        >
          Editar imagen
        </div>
      )}
      <div
        className={`relative w-full h-full flex justify-center items-center upload-area bg-slate-500`}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Input oculto para seleccionar otra imagen */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {!preview && (
          <p className="text-white">
            Arrastra una imagen o haz clic para subir
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
