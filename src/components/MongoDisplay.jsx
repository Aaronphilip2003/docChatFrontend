import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilesDisplay = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8001/api/files')
      .then(response => {
        setFiles(response.data); // Assuming response.data is an array of objects with a title property
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the files:', error);
        setError('Failed to fetch files');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">File Titles</h2>
      <ul className="list-disc space-y-2 px-6">
        {files.map((file, index) => (
          <li key={index} className="text-lg">{file.title}</li> // Displaying file.title
        ))}
      </ul>
    </div>
  );
};

export default FilesDisplay;
