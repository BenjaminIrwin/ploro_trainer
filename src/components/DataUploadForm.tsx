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

export default function DataUploadForm({onSubmit, currData}: DataUploadFormProps & { currData: any }): JSX.Element {
  const [trainingImages, setTrainingImages] = React.useState('');
  const [regularizationImages, setRegularizationImages] = React.useState('');
  
  const handleTrainingImageUpload = (url: string) => {
    setTrainingImages(url);
  };

  const handleRegularizationImageUpload = (url: string) => {
    setRegularizationImages(url);
  };

  React.useEffect(() => {
    const formData = {
      trainingImages,
      regularizationImages
    };
    onSubmit(formData);
  }, [trainingImages, regularizationImages]);

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
          <DropZone onUpload={handleTrainingImageUpload} alreadyUploadedFilename={currData.trainingImages}/>
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle1" mb={2}>
            Regularization Images:
          </Typography>
          <DropZone onUpload={handleRegularizationImageUpload} alreadyUploadedFilename={currData.trainingImages}/>
        </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
