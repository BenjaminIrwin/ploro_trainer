import React from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const DropZone = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    /* Add any desired configuration options for the drop zone here */
  });

  return (
    <Box
      mb={4}
      border="4px dashed"
      borderRadius="md"
      borderColor="gray.400"
      width="200px"
      height="200px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4} // Added padding
    >
      <Box mb={2} {...getRootProps()}>
        {isDragActive ? (
          <div style={{ textAlign: 'center' }}>Drop the files here</div>
        ) : (
          <div style={{ textAlign: 'center' }}>Drag and drop files here, or click to select files</div>
        )}
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
};

export default DropZone;