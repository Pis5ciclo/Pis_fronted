import {
    Box,
    Card,
    Grid,
    Typography,
} from '@mui/material';

import RecentOrders from '@/content/Management/Transactions/RecentOrders'

function SimulationPrognostic(){
    return (
      <Card style={{margin: '10px', maxWidth:'80%'}}>
        <Grid spacing={0} container>
          <Grid item xs={12} md={6}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h4"
              >
                PRONOSTICO
              </Typography>
              <RecentOrders/>
            </Box>
          </Grid>
        </Grid>
      </Card>
    );
  }
  
  export default SimulationPrognostic;
  