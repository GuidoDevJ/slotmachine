import axios from 'axios';
import { useRef, useState } from 'react';

const FileUpload = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Imagen seleccionada
  const [preview, setPreview] = useState(null); // Vista previa de la imagen
  const [uploading, setUploading] = useState(false); // Estado de carga
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = ""; // Resetea el input file
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona una imagen antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const token = localStorage.getItem('token');

    try {
      setUploading(true);
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const cloudinaryUrl = response.data.url;
      setFile(cloudinaryUrl); // Establece la URL en el estado externo
      alert('Imagen subida exitosamente');
      handleRemoveImage(); // Limpia la imagen seleccionada tras subirla
    } catch (error) {
      console.error('Error al subir la imagen:', error.response?.data || error.message);
      alert('Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <div
        className="upload-area rounded border border-dashed border-gray-300 p-4 flex flex-col items-center"
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {preview ? (
          <>
            <button
              className="remove-button bg-red-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleRemoveImage}
            >
              Eliminar imagen
            </button>
          </>
        ) : (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="upload-button bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => inputRef.current?.click()}
            >
              Seleccionar imagen
            </button>
          </>
        )}
      </div>
      {selectedFile && (
        <button
          className="submit-button bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      )}
    </div>
  );
};

export default FileUpload;
