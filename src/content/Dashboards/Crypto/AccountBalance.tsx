import {
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import SimulationAir1 from '@/content/SimulationChart/SimulationAir1';
import SimulationAir2 from '@/content/SimulationChart/SimulationAir2';
import SimulationWater from '@/content/SimulationChart/SimulationWater';
import api from '@/utils/api/api';

function AccountBalance() {
  const [sensorNames, setSensorNames] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(1);

  useEffect(() => {
    const fetchSensorNames = async () => {
      const names = await api.listSensorName();
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
    } else {
      setSelectedSensor(0);
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
              Account Balance
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
                      control={<Checkbox color='success' checked={selectedSensor === sensor.id} />}
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
          {selectedSensor === 2 && <SimulationAir2 />}
          {selectedSensor === 3 && <SimulationWater />}
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
