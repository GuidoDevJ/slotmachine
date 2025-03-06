import axios from 'axios';

interface UploadResponse {
  url: string;
}

export const uploadFile = async (
  file: File,
  setFile: (url: string) => void,
  setUploading: (uploading: boolean) => void,
  setError: (error: string | null) => void
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');

  try {
    setUploading(true);

    const response = await axios.post<UploadResponse>('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error al subir la imagen:',
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || 'Error al subir la imagen.');
    } else {
      console.error('Error desconocido:', error);
      setError('Error inesperado al subir la imagen.');
    }
  } finally {
    setUploading(false);
  }
};
