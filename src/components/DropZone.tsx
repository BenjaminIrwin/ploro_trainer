import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onUpload: (url: string, name: string) => void;
}

const BUCKET_URL = `https://lightsketch-bucket.s3.amazonaws.com`

const DropZone = ({onUpload, alreadyUploadedFilename, sessionId}: DropZoneProps & { alreadyUploadedFilename: string } & {sessionId: string}): JSX.Element => {
  const [dropZoneText, setDropZoneText] = useState(alreadyUploadedFilename || 'Drag and drop a zip file here, or click to select a zip file to upload.');

  const onDrop = useCallback((acceptedFiles: any[]) => {

    if (acceptedFiles.length === 0) {
      console.log('No files were uploaded');
      // Alert user
      alert('No files were uploaded')
      return;
    }

    if (acceptedFiles.length > 1) {
      console.log('More than one file was uploaded');
      // Alert user
      alert('More than one file was uploaded. Make sure you upload only one zip file for each of the training and regularization images.')
      return;
    }

    // Reject files that are not zip files
    if (acceptedFiles[0].type !== 'application/zip') {
      console.log('File is not a zip file');
      // Alert user
      alert('Upload only zip files.')
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
        setDropZoneText('Uploading...');
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
            onUpload(url, file.name);
            const shortenedFileName = file.name.length > 10 ? file.name.substring(0, 10) + '....zip' : file.name;
            setDropZoneText(`Uploaded ${shortenedFileName}`);
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
          <div style={{ textAlign: 'center' }}>Drop your zip file here</div>
        ) : (
          <div style={{ textAlign: 'center', cursor: 'pointer' }}>
            {dropZoneText}
          </div>
        )}
        <input {...getInputProps()} />
      </Box>
    </Box>
  );
};

export default DropZone;