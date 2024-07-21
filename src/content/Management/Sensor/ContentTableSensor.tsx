import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import DesactivateSensorModal from '@/components/modals/modal-sensor/DesactivateSensorModal';
import EditSensorModal from '@/components/modals/modal-sensor/EditSensorModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { LockSharp } from '@mui/icons-material';
import { Sensor } from '@/models/sensor';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

interface ContentTableSensorProps {
  sensor: Sensor[];
  setSensor: React.Dispatch<React.SetStateAction<Sensor[]>>;
}
const useStyles = makeStyles({
  activeText: {
    backgroundColor: 'rgba(200, 230, 201, 0.5)',
    padding: '3px 8px',
    borderRadius: 15,
    display: 'inline-block',
    color: '#07A81B',
  },
  inactiveText: {
    backgroundColor: 'rgba(255, 205, 210, 0.5)',
    padding: '3px 8px',
    borderRadius: 15,
    display: 'inline-block',
    color: '#FF5E40',
  },
});

const ContentTableSensor: React.FC<ContentTableSensorProps> = ({ sensor, setSensor }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDesactivateModalOpen, setDesactivateModalOpen] = useState(false);
  const [desactivateSensorData, setDesactivateSensorData] = useState<Sensor | null>(null);
  const [editSensorData, setEditSensorData] = useState<Sensor | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    ip: '',
  });
  const router = useRouter();

  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'; open: boolean }>({
    message: '',
    severity: 'success',
    open: false
  });
  let token = Cookies.get('token_person');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sensor.length - page * rowsPerPage);

  const handleDesactivateClick = (selectedSensor: Sensor) => {
    setDesactivateSensorData(selectedSensor);
    setDesactivateModalOpen(true);
  };
  const handleDesactivate = async () => {
    try {
      const response = await api.desactivateSensor(desactivateSensorData?.external_id, token);
      if (response && response.data) {
        const updatedSensors = sensor.map((p) => {
          if (p.external_id === desactivateSensorData?.external_id) {
            return { ...p, status: desactivateSensorData.status === 'activo' ? 'desactivo' : 'activo' };
          }
          return p;
        });
        setSensor(updatedSensors);
        setAlert({ message: 'Estado actualizado correctamente', severity: 'success', open: true });
        setTimeout(() => {
          setDesactivateModalOpen(false);
        }, 1000);
      }
    } catch (error) {
      setAlert({ message: 'Error al actualizar el estado', severity: 'error', open: true });
    }
  };
  const [typesOptions, setTypesOptions] = useState<{ name: string }[]>([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await api.types(token); // Asegúrate de ajustar la llamada a tu API
        setTypesOptions(response);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    fetchTypes();
  }, []);
  //Modal EditSensor
  const handleEditClick = (selectedSensor: Sensor) => {
    setEditSensorData(selectedSensor);
    setModalOpen(true);
  };
  const handleSave = async (updatedSensor: Sensor, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => {
    setFormErrors({
      ip: '', 
    });
    try {
      await api.updateSensor(updatedSensor, updatedSensor.external_id, token);
      setSensor((prevSensor) =>
        prevSensor.map((p) => (p.external_id === updatedSensor.external_id ? updatedSensor : p))
      );
      setAlert({ message: 'Sensor actualizado correctamente', severity: 'success', open: true });
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Error al modificar el sensor:', error.response.data.error);
      if (error.response && error.response.data && error.response.data.error === 'La IP ya está registrada') {
        setFormErrors(prevState => ({
          ...prevState,
          ip: 'La IP ya está registrada',
        }));
        setTimeout(() => {
          setFormErrors(prevState => ({
            ...prevState,
            ip: '',
          }));
        }, 3000);
      } else {
        router.push('/status/500');
        setAlert({ message: 'Error del servidor', severity: 'error', open: true });
      }
    }
  };

  const theme = useTheme();

  return (
    <Card>

      <CardHeader
        title="SENSORES"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Latitud</TableCell>
              <TableCell>Longitud</TableCell>
              <TableCell>Dirección IP</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensor.length > 0 ? (
              sensor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.type_sensor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.latitude}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.longitude}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.ip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order.status === 'activo' ? (
                        <span className={classes.activeText}>Activo</span>
                      ) : (
                        <span className={classes.inactiveText}>Inactivo</span>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar Sensor" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleEditClick(order)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cambiar Estado" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDesactivateClick(order)}
                      >
                        <LockSharp fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <EditSensorModal
                    open={isModalOpen}
                    handleClose={() => setModalOpen(false)}
                    sensor={editSensorData}
                    handleSave={handleSave}
                    formErrors2={formErrors} // Pasar el estado de errores como propiedad
                  />
                  <DesactivateSensorModal
                    open={isDesactivateModalOpen}
                    handleClose={() => setDesactivateModalOpen(false)}
                    sensor={desactivateSensorData}
                    handleDesactivate={handleDesactivate}
                    alert={alert}
                    setAlert={setAlert}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    align="center"
                  >
                    No hay sensores disponibles.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 5 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={sensor.length}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={() => ''}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default ContentTableSensor;