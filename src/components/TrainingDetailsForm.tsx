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
  const [email, setEmail] = useState(currData === null || !('email' in currData) ? '' : currData.email);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNegativePrompt(event.target.value);
  };

  const handleBaseModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseModel(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      prompt,
      negativePrompt,
      baseModel,
      email
    };
    onSubmit(formData);
  };

  useEffect(() => {
    handleSubmit();
  }, [prompt, negativePrompt, baseModel, email]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Training details
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
          <TextField
            required
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
