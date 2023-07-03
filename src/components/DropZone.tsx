import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onUpload: (url: string, name: string) => void;
}

const BUCKET_URL = `https://lightsketch-bucket.s3.amazonaws.com`

const DropZone = ({onUpload, alreadyUploadedFilename, sessionId}: DropZoneProps & { alreadyUploadedFilename: string } & {sessionId: string}): JSX.Element => {
  const [uploadedFileName, setUploadedFileName] = useState(alreadyUploadedFilename || '');

  const onDrop = useCallback((acceptedFiles: any[]) => {

    if (acceptedFiles.length === 0) {
      console.log('No files were uploaded');
      return;
    }

    if (acceptedFiles.length > 1) {
      console.log('More than one file was uploaded');
      return;
    }

    // Reject files that are not zip files
    if (acceptedFiles[0].type !== 'application/zip') {
      console.log('File is not a zip file');
      return;
    }

    const file = acceptedFiles[0];

    fetch("/api/s3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file.name,
        type: file.type,
        sessionId: sessionId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.url;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Origin": "*",
          },
          body: file,
        })
          .then((response) => {
            const url = `${BUCKET_URL}/${sessionId}/${file.name}`
            // Set the uploaded file name
            setUploadedFileName(file.name);
            onUpload(url, file.name);
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
      })
      .catch((error) => {
        // Handle any errors
      });

    // // Create a new FormData object
    // const formData = new FormData();

    // // Use fileReader to read the file
    // const fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(file);
    // fileReader.onload = () => {
    //   const arrayBuffer = fileReader.result;
    //   if (arrayBuffer === null) {
    //     console.log('Error reading file');
    //     return;
    //   }
    // }

    // 

    // // Append the file to the FormData object
    // formData.append('file', file);

    // // Make a call to the /upload endpoint
    // fetch('api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log('Success:', result.url);
    //     // Set the uploaded file name
    //     setUploadedFileName(file.name);
    //     onUpload(result.url, file.name);
    //   })
    
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