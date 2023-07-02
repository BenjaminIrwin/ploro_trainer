import React, { useEffect, useState } from 'react';
import { Box, Button, Input, TextField, Typography } from '@mui/material';
import DropZone from '../components/DropZone';

const TrainingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [baseModel, setBaseModel] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    console.log('Param change!');
    // Enable/disable the button based on field values
    setIsButtonDisabled(!(prompt && negativePrompt && baseModel && email));
  }, [prompt, negativePrompt, baseModel, email]);

  const handlePromptChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrompt(e.target.value);
  };

  const handleNegativePromptChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNegativePrompt(e.target.value);
  };

  const handleBaseModelChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setBaseModel(e.target.value);
  };

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleTrainButtonClick = () => {
    // Handle the train button click event here
    console.log('Train button clicked!');
    setIsTraining(true);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="center">
        <Box mb={4} flex={1}>
          <Typography variant="subtitle1" mb={2}>
            Training Images:
          </Typography>
          <DropZone /> {/* Replace the comment placeholder with the DropZone component */}
          {/* Add your drag and drop functionality for training images here */}
        </Box>

        <Box mb={4} flex={1}>
          <Typography variant="subtitle1" mb={2}>
            Regularization Images:
          </Typography>
          <DropZone /> {/* Replace the comment placeholder with the DropZone component */}
          {/* Add your drag and drop functionality for regularization images here */}
        </Box>
        <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Prompt:
        </Typography>
        <TextField value={prompt} onChange={handlePromptChange} multiline maxRows={4} variant="outlined"/>
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Negative Prompt:
        </Typography>
        <TextField value={negativePrompt} onChange={handleNegativePromptChange} multiline maxRows={4} variant="outlined"/>
      </Box>
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Prompt:
        </Typography>
        <TextField value={prompt} onChange={handlePromptChange} multiline maxRows={4} variant="outlined"/>
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Negative Prompt:
        </Typography>
        <TextField value={negativePrompt} onChange={handleNegativePromptChange} multiline maxRows={4} variant="outlined"/>
      </Box>
      

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Base Model:
        </Typography>
        <TextField value={baseModel} onChange={handleBaseModelChange} />
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" mb={2}>
          Email:
        </Typography>
        <TextField value={email} onChange={handleEmailChange} />
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          color="primary"
          onClick={handleTrainButtonClick}
          disabled={isButtonDisabled}
        >
          Train
        </Button>
      </Box>
    </Box>
  );
};

export default TrainingPage;