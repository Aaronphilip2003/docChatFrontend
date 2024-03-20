import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Modal, Box, Typography } from '@mui/material';

// Modal style
const style = {
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

const FilesDisplay = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [selectedFile, setSelectedFile] = useState({}); // State to hold the clicked file's data

  useEffect(() => {
    axios.get('http://localhost:8001/api/files')
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

  // Group files into chunks of three
  const chunkedFiles = files.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <div>
      {chunkedFiles.map((chunk, chunkIndex) => (
        <Grid key={chunkIndex} container spacing={2}>
          {chunk.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} onClick={() => handleOpen(file)} style={{cursor: 'pointer'}}>
              <Box sx={{ border: '1px solid black', padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <Typography>{file.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="file-modal-title"
        aria-describedby="file-modal-description"
      >
        <Box sx={style}>
          <Typography id="file-modal-title" variant="h6" component="h2">
            {selectedFile.title}
          </Typography>
          <Typography id="file-modal-description" sx={{ mt: 2 }}>
            {selectedFile.text} {/* Displaying the file's content */}
            {console.log(selectedFile)}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FilesDisplay;
