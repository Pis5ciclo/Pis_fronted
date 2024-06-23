import {
  Grid,
  Typography,
} from '@mui/material';

import ContentTableSimulation from '@/content/Management/simulation/TableSimulation';

function InfoSensores() {
  return (
    <>
      
        <Typography variant="h3">Sensores</Typography>
      
      <Grid container spacing={6}>
        <ContentTableSimulation/>
      </Grid>
    </>
  );
}

export default InfoSensores;
