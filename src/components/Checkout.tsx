import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DataUploadForm from './DataUploadForm';
import TrainingDetailsForm from './TrainingDetailsForm';
import Review from './Review';
import { CircularProgress } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Data upload', 'Training details', 'Review'];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [submittedData, setSubmittedData] = React.useState({}); // State variable to store submitted data
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDataChange = (data: {}) => {
    // Check if all fields of data are filled
    if(!Object.values(data).every((el) => el !== '')) {
      console.log('Not all fields are filled')
      setIsButtonDisabled(true);
      return;
    } else {
      setIsButtonDisabled(false);
    }
    console.log('Added data: ', data);
    // Store the submitted data in state
    setSubmittedData((prevData) => ({
      ...prevData,
      ...data
    }));
  };

  React.useEffect(() => {
    console.log('Submitted data: ', submittedData);
  }, [submittedData]);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DataUploadForm currData={submittedData} onSubmit={handleDataChange}/>;
      case 1:
        return <TrainingDetailsForm currData={submittedData} onSubmit={handleDataChange}/>;
      case 2:
        console.log('Submitted data: ', submittedData)
        return <Review currData={submittedData}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Train Dreambooth
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            // Spinner
            <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />              
              <Typography variant="h5" gutterBottom>
                Training underway...
              </Typography>
              </Box>
              <Typography variant="subtitle1">
                Your training is underway. You will receive an email when it is complete.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  disabled= {activeStep === steps.length - 1 ? false : isButtonDisabled}
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Train' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}