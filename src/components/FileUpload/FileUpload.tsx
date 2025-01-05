import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface FileUploadProps {
  setFile: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setError(null); // Limpia errores anteriores
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    // Sube automáticamente el archivo
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      setUploading(true);
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const cloudinaryUrl = response.data.url as string;
      setFile(cloudinaryUrl);
      alert("Imagen subida exitosamente");
    } catch (error: any) {
      console.error("Error al subir la imagen:", error.response?.data || error.message);
      setError("Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="file-upload">
      <div
        className={`relative flex justify-center items-center upload-area ... ${
          dragging ? "bg-blue-200" : ""
        } bg-slate-500 h-52`}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {preview ? (
          <button
            className="remove-button absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            onClick={handleRemoveImage}
          >
            Eliminar imagen
          </button>
        ) : (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
            <p className="text-center">
              Arrastra y suelta una imagen aquí o haz clic para seleccionarla.
            </p>
          </>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploading && (
        <p className="text-blue-500 mt-2">Subiendo imagen...</p>
      )}
    </div>
  );
};

export default FileUpload;
