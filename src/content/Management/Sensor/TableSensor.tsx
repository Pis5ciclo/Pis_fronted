import { Card } from '@mui/material';
import ContentTableSensor from './ContentTableSensor';
import Cookies from 'js-cookie';
import { Sensor } from '@/models/sensor';
import api from '@/utils/api/api';
import { useEffect } from 'react';
interface TableSensorProps {
  sensor: Sensor[];
  setSensor: React.Dispatch<React.SetStateAction<Sensor[]>>;
}

const TableSensor: React.FC<TableSensorProps> = ({ sensor, setSensor }) => {
  let token = Cookies.get('token_person');
  useEffect(() => {
    const fetchSensors = async () => {
      const sensors = await api.listSensor(token);
      setSensor(sensors);
      console.log(sensors);
    };

    fetchSensors();
  }, [setSensor]);
  return (
    <Card>
      <ContentTableSensor sensor={sensor} setSensor ={setSensor}/>
    </Card>
  );
}

export default TableSensor;