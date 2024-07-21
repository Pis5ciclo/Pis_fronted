import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import ContentTableSimulation from './ContentTableSimulation';
import Cookies from 'js-cookie';
import { SensorData } from '@/models/datasensor';
import api from '@/utils/api/api';
function TableSimulation() {
  const [datasensor, setDataSensor] = useState<SensorData[]>([]);
  let token = Cookies.get('token_person');
  useEffect(() => {
    const fetchData = async () => {
        const dates = await api.listDataSensor(token);
        setDataSensor(dates);
        console.log(dates);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <ContentTableSimulation datasensor={datasensor} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default TableSimulation;

