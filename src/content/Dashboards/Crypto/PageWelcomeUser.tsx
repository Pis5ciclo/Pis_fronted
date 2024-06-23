import { Avatar, Grid, Typography } from '@mui/material';

import React from 'react';
import { useTheme } from '@mui/material/styles';

function PageWelcomeUser({ userName }) {  
  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: '/static/images/avatars/1.jpg'
  // };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
      <Avatar sx={{ mr: 2, bgcolor: 'blue', width: 40, height: 40, fontSize: '1.5rem' }}> A</Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido {userName}!
        </Typography>
        <Typography variant="subtitle2">
          Gracias por hacer uso de nuestro programa!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageWelcomeUser;
