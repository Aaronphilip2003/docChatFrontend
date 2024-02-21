import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUpload({ onFilesAdded }) {
  const [uploadStatus, setUploadStatus] = useState('idle');

  const onDrop = useCallback(acceptedFiles => {
    setUploadStatus('uploading');
    const file = acceptedFiles[0]; // Assuming single file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name); // Send file name as title
    console.log(file.name)

    axios.post('http://localhost:8001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response.data);
      setUploadStatus('success');
      onFilesAdded(acceptedFiles);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    });
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="flex flex-col justify-center items-center w-full h-64 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:border-blue-700 p-4">
      <input {...getInputProps()} />
      <div className="text-center">
        {
          isDragActive ?
            <p className="text-blue-500 text-lg">Drop the files here ...</p> :
            uploadStatus === 'success' ?
            <p className="text-green-500 text-lg">Files successfully uploaded!</p> :
            uploadStatus === 'uploading' ?
            <p className="text-blue-500 text-lg">Uploading...</p> :
            <p className="text-gray-600 text-lg">Drag 'n' drop some files here, or click to select files</p>
        }
        <p className="text-gray-500 text-xs">Supports PDF, DOCX, TXT files</p>
      </div>
    </div>
  );
}

export default FileUpload;
