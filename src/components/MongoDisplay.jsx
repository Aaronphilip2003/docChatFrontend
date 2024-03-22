import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Typography } from '@mui/material';

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const scrollableBoxStyle = {
  maxHeight: '300px',
  overflowY: 'auto',
  border: '1px solid #000',
  padding: '10px',
};

const FilesDisplay = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [selectedFile, setSelectedFile] = useState({}); // State to hold the clicked file's data

  useEffect(() => {
    axios.get('https://docchatbackend.onrender.com/api/files')
      .then(response => {
        setFiles(response.data); // Assuming response.data is an array of file objects
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the files:', error);
        setError('Failed to fetch files');
        setLoading(false);
      });
  }, []);

  const handleOpen = (file) => {
    setSelectedFile(file); // Set the clicked file as selected
    setOpen(true); // Show the modal
  };

  const handleClose = () => setOpen(false); // Hide the modal

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="file-modal-title"
        aria-describedby="file-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="file-modal-title" variant="h6" component="h2">
            {selectedFile.title}
          </Typography>
          <Typography id="file-modal-description" sx={{ mt: 2 }}>
            {selectedFile.text} {/* Displaying the file's content */}
            {console.log(selectedFile)}
          </Typography>
        </Box>
      </Modal>
      <div>
        <Typography variant="h5" sx={{ marginBottom: '10px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          Files in Database
        </Typography>
        <div style={scrollableBoxStyle}>
          {files.map((file, index) => (
            <div key={index} onClick={() => handleOpen(file)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              <Box sx={{ border: '1px solid black', padding: 2 }}>
                <Typography>{file.title}</Typography>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesDisplay;
