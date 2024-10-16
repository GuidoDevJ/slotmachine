import React, { useRef, useState } from "react";

interface FileWithPreview extends File {
  preview: string;
}

const InputImage: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [fileDragging, setFileDragging] = useState<number | null>(null);
  const [fileDropping, setFileDropping] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const humanFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][i]
    );
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleDrop = () => {
    if (fileDragging !== null && fileDropping !== null && fileDragging !== fileDropping) {
      const updatedFiles = [...files];
      const draggedFile = updatedFiles.splice(fileDragging, 1)[0];
      updatedFiles.splice(fileDropping, 0, draggedFile);
      setFiles(updatedFiles);
    }
    setFileDropping(null);
    setFileDragging(null);
  };

  const handleFileDragEnter = (index: number) => {
    setFileDropping(index);
  };

  const handleFileDragStart = (index: number) => {
    setFileDragging(index);
  };

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <div className="bg-white p-7 rounded w-9/12 mx-auto">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
        <div
          className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            onChange={handleFileAdd}
          />
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              className="w-6 h-6 mr-1 text-current-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="m-0">Drag your files here or click in this area.</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
            {files.map((file, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none ${
                  fileDragging === index ? "border-blue-600" : ""
                }`}
                style={{ paddingTop: "100%" }}
                draggable
                onDragStart={() => handleFileDragStart(index)}
                onDragEnd={() => setFileDragging(null)}
                onDragEnter={() => handleFileDragEnter(index)}
              >
                <button
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                  onClick={() => removeFile(index)}
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                {file.type.startsWith("image/") ? (
                  <img
                    className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                    src={file.preview}
                    alt={file.name}
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    className="absolute inset-0 object-cover w-full h-full border-4 border-white preview"
                    controls
                  >
                    <source src={file.preview} type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute w-12 h-12 text-gray-400 top-1/2 transform -translate-y-1/2">
                    {/* Add fallback SVG for other file types */}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                  <span className="w-full font-bold text-gray-900 truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-900">
                    {humanFileSize(file.size)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputImage;
