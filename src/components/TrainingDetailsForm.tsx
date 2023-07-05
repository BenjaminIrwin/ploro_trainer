import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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

  console.log('LOADING TRAINING DETAILS FORM')

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Check if currData is null or if currData has the field prompt
  const [prompt, setPrompt] = useState(currData === null || !('prompt' in currData) ? '' : currData.prompt);
  const [negativePrompt, setNegativePrompt] = useState(currData === null || !('negativePrompt' in currData) ? '' : currData.negativePrompt);
  const [baseModel, setBaseModel] = useState(currData === null || !('baseModel' in currData) ? '' : currData.baseModel);
  const [email, setEmail] = useState(currData === null || !('email' in currData) ? '' : currData.email);
  const [validEmail, setValidEmail] = useState(validateEmail(email) ? email : '');
  const [models, setModels] = useState(['test', 'test']);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("api/models", {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setModels(data.models);
      })
      .catch(error => console.log('error', error));
  }, []); // Empty dependency array, runs once on component mount
  
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleNegativePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNegativePrompt(event.target.value);
  };

  const handleBaseModelChange = (event: SelectChangeEvent<any>) => {
    setBaseModel(event.target.value);
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

  useEffect(() => {
    console.log('DATA HAS CHANGED')

    const formData = {
      prompt,
      negativePrompt,
      baseModel,
      email: validEmail
    };
    onSubmit(formData);
  }, [prompt, negativePrompt, baseModel, validEmail]);

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
      <FormControl variant="standard" fullWidth required>
        <InputLabel id="demo-simple-select-standard-label">Base Model</InputLabel>
        <Select
            label="Base Model"
            value={baseModel}
            onChange={handleBaseModelChange}
            variant="standard"
          >
        {/* Populate select with models  */}
        {models.map((model) => (
          <MenuItem value={model}>{model}</MenuItem>
        ))}
        </Select>
      </FormControl>
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
