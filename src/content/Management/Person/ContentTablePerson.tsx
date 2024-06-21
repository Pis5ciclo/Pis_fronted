import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

import BulkActions from './BulkActions';
import Cookies from 'js-cookie';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DesactivatePersonModal from '@/components/modals/modal-person/DesactivatePersonModal';
import EditPersonModal from '@/components/modals/modal-person/EditPersonModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Person } from '@/models/person';
import api from '@/utils/api/api';
import { useState } from 'react';

interface ContentTablePersonProps {
  person: Person[];
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
}

const ContentTablePerson: React.FC<ContentTablePersonProps> = ({ person, setPerson }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPersons, setSelectedSensors] = useState<string[]>([]);
  const selectedBulkActions = selectedPersons.length > 0;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editPersonData, setEditPersonData] = useState<Person | null>(null);
  const [isDesactivateModalOpen, setDesactivateModalOpen] = useState(false);
  const [desactivatePersonData, setDesactivatePersonData] = useState<Person | null>(null);

  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'; open: boolean }>({
    message: '',
    severity: 'success',
    open: false
  });
  let token = Cookies.get('token');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, person.length - page * rowsPerPage);

  const handleSelectSensor = (sensorName) => {
    setSelectedSensors((prevSelected) =>
      prevSelected.includes(sensorName)
        ? prevSelected.filter((name) => name !== sensorName)
        : [...prevSelected, sensorName]
    );
  };

  //Modal desactivateAccount
  const handleDesactivateClick = (selectedPerson: Person) => {
    setDesactivatePersonData(selectedPerson);
    setDesactivateModalOpen(true);
  };
  const handleDesactivate = async () => {
    try {
      const response = await api.desactivateAccount(desactivatePersonData?.external_id, token);
      if (response && response.data) {
        const updatedPersons = person.map((p) => {
          if (p.external_id === desactivatePersonData?.external_id) {
            return { ...p, status: desactivatePersonData.status === 'activo' ? 'desactivo' : 'activo' };
          }
          return p;
        });
        setPerson(updatedPersons);
        setAlert({ message: 'Estado actualizado correctamente', severity: 'success', open: true });
        setTimeout(() => {
          setDesactivateModalOpen(false);
        }, 2000);
      }
    } catch (error) {
      setAlert({ message: 'Error al actualizar el estado', severity: 'error', open: true });
    }
  };

  //Modal EditPerson
  const handleEditClick = (selectedPerson: Person) => {
    setEditPersonData(selectedPerson);
    setModalOpen(true);
  };
  const handleSave = async (updatedPerson: Person, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => {
    try {
      const response = await api.updateUser(updatedPerson, updatedPerson.external_id, token);
      setPerson((prevPerson) =>
        prevPerson.map((p) => (p.external_id === updatedPerson.external_id ? updatedPerson : p))
      );
      setAlert({ message: 'Usuario actualizado correctamente', severity: 'success', open: true });
      setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    } catch (error) {
      setAlert({ message: 'Error, Verifica la informacion por favor', severity: 'error', open: true });
    }
  };
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <>
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <TextField id="outlined-search" label="Search field" type="search" />
                </FormControl>
              </Box>
            }
            title="LISTADO DE PERSONAS"
          />
        </>
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Identificacion</TableCell>
              <TableCell>email</TableCell>
              <TableCell>estado</TableCell>
              <TableCell>rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {person.length > 0 ? (
              person.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                <TableRow hover key={index} style={{ backgroundColor: order.status === 'desactivo' ? '#FFEAE6' : 'inherit' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPersons.includes(order.name)}
                      onChange={() => handleSelectSensor(order.name)}
                    />
                  </TableCell>
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
                      {order.lastname}
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
                      {order.phone}
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
                      {order.identification}
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
                      {order.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"

                      gutterBottom
                      noWrap
                    // style={{ color: order.status === 'desactivo' ? 'red' : 'inherit' }}
                    >
                      {order.status}
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
                      {order.rol}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar Persona" arrow>
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
                    {order.rol !== 'Administrador' && (
                      <Tooltip title="Desactivar" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDesactivateClick(order)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <EditPersonModal
                    open={isModalOpen}
                    handleClose={() => setModalOpen(false)}
                    person={editPersonData}
                    handleSave={handleSave}
                  />
                  <DesactivatePersonModal
                    open={isDesactivateModalOpen}
                    handleClose={() => setDesactivateModalOpen(false)}
                    person={desactivatePersonData}
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
                    No hay personas registradas.
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
          count={person.length}
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

export default ContentTablePerson;
