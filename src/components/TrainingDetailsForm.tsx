import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

interface TrainingDetailsFormData {
  prompt: string;
  negativePrompt: string;
  baseModel: string;
  email: string;
}

interface TrainingDetailsFormProps {
  onSubmit: (formData: TrainingDetailsFormData) => void;
}

export default function TrainingDetailsForm({onSubmit, currData}: TrainingDetailsFormProps & { currData: any }): JSX.Element {
  // Check if currData is null or if currData has the field prompt
  const [prompt, setPrompt] = useState(currData === null || !('prompt' in currData) ? '' : currData.prompt);
  const [negativePrompt, setNegativePrompt] = useState(currData === null || !('negativePrompt' in currData) ? '' : currData.negativePrompt);
  const [baseModel, setBaseModel] = useState(currData === null || !('baseModel' in currData) ? '' : currData.baseModel);
  const [validBaseModel, setValidBaseModel] = useState('');
  const [email, setEmail] = useState(currData === null || !('email' in currData) ? '' : currData.email);
  const [validEmail, setValidEmail] = useState('');

  
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNegativePrompt(event.target.value);
  };

  const validateBaseModel = (baseModel: string) => {
    //^https:\/\/civitai\.com\/models\/\d+\/\w+$

    return String(baseModel)
      .toLowerCase()
      .match(
        /^https:\/\/civitai\.com\/models\/\d+\/[-\w]+$/
      );
  };

  const handleBaseModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseModel(event.target.value);
    // Check if baseModel is valid
    if (!validateBaseModel(event.target.value)) {
      console.log("Invalid baseModel");
      setValidBaseModel('');
    }
    else {
      setValidBaseModel(event.target.value);
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    // Check if email is valid
    if (!validateEmail(event.target.value)) {
      console.log("Invalid email");
      setValidEmail('');
    } else {
      setValidEmail(event.target.value);
    }
  };

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      prompt,
      negativePrompt,
      baseModel,
      email: validEmail
    };
    onSubmit(formData);
  };

  useEffect(() => {
    handleSubmit();
  }, [prompt, negativePrompt, validBaseModel, validEmail]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Training details
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
          <TextField
            required
            error={validEmail === '' && email !== ''}
            label="Your email address"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange} 
            multiline 
            maxRows={4}
          />
        </Grid>
      <Grid item xs={12} md={12}>
          <TextField
            required
            label="Base Model (CivitAI URL)"
            fullWidth
            error={validBaseModel === '' && baseModel !== ''}
            variant="standard"
            value={baseModel} 
            onChange={handleBaseModelChange}
            multiline 
            maxRows={4}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputProps={{
              style: {
                height: "90px",
              },
            }}
            required
            label="Prompt"
            fullWidth
            variant="standard"
            value={prompt} 
            onChange={handlePromptChange}
            multiline 
            maxRows={4}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            inputProps={{
              style: {
                height: "90px",
              },
            }}
            label="Negative Prompt"
            fullWidth
            required
            variant="standard"
            value={negativePrompt} 
            onChange={handleNegativePromptChange}
            multiline 
            maxRows={4}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
