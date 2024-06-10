import { Avatar, Grid, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { UserContext } from './UserContext';
import React, { useContext } from 'react';

function PageWelcomeUser() {
  const { user } = useContext(UserContext);
  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: '/static/images/avatars/1.jpg'
  // };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user ? user.name : 'Invitado'}
          // src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {user ? user.name : ''}!
        </Typography>
        <Typography variant="subtitle2">
          Gracias por hacer uso de nuestro programa!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageWelcomeUser;
