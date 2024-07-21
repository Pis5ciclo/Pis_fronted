import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import SimulationAir1 from '@/content/SimulationChart/SimulationAir1';
import SimulationAir2 from '@/content/SimulationChart/SimulationAir2';
import SimulationWater from '@/content/SimulationChart/SimulationWater';
import api from '@/utils/api/api';

function AccountBalance() {
  const [sensorNames, setSensorNames] = useState([]);
  let token = Cookies.get('token_person');
  const [selectedSensor, setSelectedSensor] = useState();

  useEffect(() => {
    const fetchSensorNames = async () => {
      const names = await api.listSensorName(token);
      setSensorNames(names);
      if (names.length > 0) {
        setSelectedSensor(names[0].id);
      }
    };
    fetchSensorNames();
  }, []);
  const handleCheckboxChange = (event, sensorId) => {
    if (event.target.checked) {
      setSelectedSensor(sensorId);
    }
  };
  return (
    <Card>
      <Grid container spacing={15}>
        <Grid item xs={12} md={4}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Simulación de datos
            </Typography>
              <Box
                p={2}
                sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  '&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                  },
                }}
              >
                <Typography variant="h6"><b>Seleccionar Sensor</b></Typography>
                <FormControl component="fieldset">
                  {sensorNames.map((sensor, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Radio color='success' checked={selectedSensor === sensor.id} />}
                      label={sensor.name}
                      onChange={(event) => handleCheckboxChange(event, sensor.id)}
                    />
                  ))}
                </FormControl>
              </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} style={{ paddingLeft: '10px' }}>
          {selectedSensor === 1 && <SimulationAir1 />}
          {selectedSensor === 3 && <SimulationAir2 />}
          {selectedSensor === 2 && <SimulationWater />}
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
