import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { type } from 'os';

interface DropZoneProps {
  onUpload: (url: string) => void;
}



const DropZone = ({onUpload, alreadyUploadedFilename}: DropZoneProps & { alreadyUploadedFilename: string }): JSX.Element => {
  const [uploadedFileName, setUploadedFileName] = useState(alreadyUploadedFilename || '');

  const onDrop = useCallback((acceptedFiles: any[]) => {
    console.log('ACCEPTED FILES: ', acceptedFiles)

    // Only accept one file
    if (acceptedFiles.length > 1) {
      console.log('Only one file can be uploaded at a time')
      return;
    }

    // Reject files that are not zip files
    if (acceptedFiles[0].type !== 'application/zip') {
      console.log('Only zip files can be uploaded')
      return;
    }


    const file = acceptedFiles[0];

    // Reject files that are not zip files
    if (file.type !== 'application/zip') {
      console.log('Only zip files can be uploaded');
      return;
    }

    const reader = new FileReader();

    reader.onabort = () => console.log('File reading was aborted');
    reader.onerror = () => console.log('File reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };

    reader.readAsArrayBuffer(file);

    // Set the uploaded file name
    setUploadedFileName(file.name);

    onUpload('test');
    
  }, [])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  return (
    <Box
      mb={4}
      border="4px dashed"
      borderRadius="5px"
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
          <div style={{ textAlign: 'center' }}>
            {uploadedFileName ? uploadedFileName : 'Drag and drop files here, or click to select files'}
          </div>
        )}
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
};

export default DropZone;