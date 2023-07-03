import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
                  <Typography gutterBottom>{'email'}</Typography>
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
