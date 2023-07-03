import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DropZone from './DropZone';


interface DataUploadFormData {
  trainingImages: String;
  regularizationImages: String;
}

interface DataUploadFormProps {
  onSubmit: (formData: DataUploadFormData) => void;
}

export default function DataUploadForm({onSubmit, currData, sessionId}: DataUploadFormProps & { currData: any } & { sessionId: string }): JSX.Element {
  const [trainingImages, setTrainingImages] = React.useState(currData === null || !('trainingImages' in currData) ? '' : currData.trainingImages);
  const [trainingZipName, setTrainingZipName] = React.useState(currData === null || !('trainingZipName' in currData) ? '' : currData.trainingZipName);
  const [regularizationImages, setRegularizationImages] = React.useState(currData === null || !('regularizationImages' in currData) ? '' : currData.regularizationImages);
  const [regularizationZipName, setRegularizationZipName] = React.useState(currData === null || !('regularizationZipName' in currData) ? '' : currData.regularizationZipName);
  
  const handleTrainingImageUpload = (url: string, name: string) => {
    setTrainingImages(url);
    setTrainingZipName(name);
  };

  const handleRegularizationImageUpload = (url: string, name: string) => {
    setRegularizationImages(url);
    setRegularizationZipName(name);
  };

  React.useEffect(() => {
    const formData = {
      trainingImages,
      trainingZipName,
      regularizationImages,
      regularizationZipName
    };
    onSubmit(formData);
  }, [trainingImages, trainingZipName, regularizationImages, regularizationZipName]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Box mb={4}>
          <Typography variant="subtitle1" mb={2}>
            Training Images:
          </Typography>
          <DropZone onUpload={handleTrainingImageUpload} alreadyUploadedFilename={currData.trainingZipName} sessionId={sessionId}/>
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" mb={2}>
            Regularization Images:
          </Typography>
          <DropZone onUpload={handleRegularizationImageUpload} alreadyUploadedFilename={currData.regularizationZipName} sessionId={sessionId}/>
        </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
