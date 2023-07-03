import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function Review({ currData }: any) {
  console.log('REVIEW DATA')
  console.log(currData);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Training summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Data
          </Typography>
          <Typography gutterBottom>{currData.regularizationZipName}</Typography>
          <Typography gutterBottom>{currData.trainingZipName}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Details
          </Typography>
          <Grid container>
              <React.Fragment key='email'>
              <Grid item xs={4}>
                  <Typography gutterBottom>{'Prompt'}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom>{currData.prompt}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>{'Negative prompt'}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom>{currData.negativePrompt}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>{'Base model'}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom>{currData.baseModel}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Contact information
          </Typography>
          <Grid container>
              <React.Fragment key='email'>
                <Grid item xs={4}>
                  <Typography gutterBottom>{'Email'}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom>{currData.email}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
