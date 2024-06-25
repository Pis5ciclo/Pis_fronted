import { useEffect } from 'react';

import { Card } from '@mui/material';
import ContentTableSensor from './ContentTableSensor';
import { Sensor } from '@/models/sensor';
import api from '@/utils/api/api';

interface TableSensorProps {
  sensor: Sensor[];
  setSensor: React.Dispatch<React.SetStateAction<Sensor[]>>;
}

const TableSensor: React.FC<TableSensorProps> =({sensor, setSensor}) =>{

  useEffect(() => {
    const fetchSensors = async () => {
      const sensors = await api.listSensor();
      setSensor(sensors);
      console.log(sensors);
    };

    fetchSensors();
  }, []);
  return (
    <Card>
      <ContentTableSensor sensor={sensor}/>
    </Card>
  );
}

export default TableSensor;
