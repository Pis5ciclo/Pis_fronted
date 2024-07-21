import {
  Box,
  Card,
  CardHeader,
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
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DesactivatePersonModal from '@/components/modals/modal-person/DesactivatePersonModal';
import EditPersonModal from '@/components/modals/modal-person/EditPersonModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { LockSharp } from '@mui/icons-material';
import { Person } from '@/models/person';
import Text from '@/components/Text';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';

interface ContentTablePersonProps {
  person: Person[];
  setPerson: React.Dispatch<React.SetStateAction<Person[]>>;
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
const ContentTablePerson: React.FC<ContentTablePersonProps> = ({ person, setPerson }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editPersonData, setEditPersonData] = useState<Person | null>(null);
  const [isDesactivateModalOpen, setDesactivateModalOpen] = useState(false);
  const [desactivatePersonData, setDesactivatePersonData] = useState<Person | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, person.length - page * rowsPerPage);

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
            return { ...p, status: desactivatePersonData.status === 'activo' ? 'desactivado' : 'activo' };
          }
          return p;
        });
        setPerson(updatedPersons);
        setAlert({ message: 'Estado actualizado correctamente', severity: 'success', open: true });
        setTimeout(() => {
          setDesactivateModalOpen(false);
        }, 1000);
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
      await api.updateUser(updatedPerson, updatedPerson.external_id, token);
      setPerson((prevPerson) =>
        prevPerson.map((p) => (p.external_id === updatedPerson.external_id ? updatedPerson : p))
      );
      setAlert({ message: 'Usuario actualizado correctamente', severity: 'success', open: true });
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Error al modificar el usuario:', error.message);
      setAlert({ message: error.message, severity: 'error', open: true });
    }
  };

  //search Person
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filterPersons = () => {
      if (person.length > 0) {
        const filtered = person.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPersons(filtered);
      } else {
        setFilteredPersons([]);
      }
    };

    filterPersons();
  }, [searchQuery, person]);
  const theme = useTheme();

  return (
    <Card>
        <>
          <CardHeader
            action={
              <Box display="flex" alignItems="center" width={300}>
                <Text color="black">Busqueda</Text>
                <Box ml={1} flexGrow={1}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="outlined-search"
                      label="Filtrar"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </FormControl>
                </Box>
              </Box>
            }
            title="LISTADO DE PERSONAS"
          />
        </>
      <br />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {person.length > 0 ? (
              filteredPersons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
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
                      {order.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {order.status === 'activo' ? (
                        <span className={classes.activeText}>Activo</span>
                      ) : (
                        <span className={classes.inactiveText}>Inactivo</span>
                      )}
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