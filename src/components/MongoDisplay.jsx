import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';

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
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State to control confirmation dialog visibility

  useEffect(() => {
    axios.get('https://docchatbackend.onrender.com/api/files')
    // axios.get('http://localhost:8001/api/files')
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

  const handleDelete = (fileId) => {
    // Set selected file before opening the confirmation dialog
    const fileToDelete = files.find(file => file._id === fileId);
    setSelectedFile(fileToDelete);
    setConfirmationOpen(true); // Open confirmation dialog
  };
  

  const confirmDelete = () => {
    // Close confirmation dialog
    setConfirmationOpen(false);
    console.log(selectedFile._id)

    // Perform delete operation
    axios.delete(`http://localhost:8001/api/files/${selectedFile._id}`) // Using localhost:8001
      .then(response => {
        // Remove the deleted file from the state
        setFiles(prevFiles => prevFiles.filter(file => file._id !== selectedFile._id));
      })
      .catch(error => {
        console.error('Error deleting file:', error);
        // Handle error deleting file
      });
  };

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
          </Typography>
        </Box>
      </Modal>
      <div>
        <Typography variant="h5" sx={{ marginBottom: '10px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          Files in Database
        </Typography>
        <div style={scrollableBoxStyle}>
          {files.map((file, index) => (
            <div key={index} style={{ marginBottom: '10px', border: '1px solid black', padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography onClick={() => handleOpen(file)} style={{ cursor: 'pointer' }}>{file.title}</Typography>
                <Button variant="outlined" color="error" onClick={() => handleDelete(file._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{selectedFile.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilesDisplay;
