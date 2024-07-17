import { Button, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AlertMessage from '@/utils/api/utilities/Alert';
import Cookies from 'js-cookie';
import api from '@/utils/api/api';

interface AlertState {
    message: string;
    severity: 'success' | 'error';
    open: boolean;
}
function PageHeader({ onAddPerson }) {
    const [rolesOptions, setRolesOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState<AlertState>({ message: '', severity: 'success', open: false });
    let token = Cookies.get('token');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData(initialState);
        setAlert({ message: '', severity: 'success', open: false });
    };

    const initialState = {
        external_id: '',
        name: '',
        lastname: '',
        phone: 0,
        identification: '',
        rol: '',
        email: '',
        status: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.roles();
                setRolesOptions(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
            const response = await api.saveUser(formData, token);
            setAlert({ message: 'Usuario registrado exitosamente', severity: 'success', open: true });
            onAddPerson()
            setTimeout(() => {
                handleClose();
            }, 2000);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Administracion de usuarios
                </Typography>
                <Typography variant="subtitle2">
                    {user.name}, these are your recent transactions
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleOpen}
                >
                    Registrar usuario
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Nombres"
                                        type="text"
                                        name='name'
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="lastname"
                                        name='lastname'
                                        label="Apellidos"
                                        type="text"
                                        fullWidth
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="phone"
                                        name='phone'
                                        label="Teléfono"
                                        type="tel"
                                        fullWidth
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="identification"
                                        name='identification'
                                        label="Cedula"
                                        type="tel"
                                        fullWidth
                                        value={formData.identification}
                                        onChange={handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Correo Electrónico"
                                        type="email"
                                        name='email'
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="password"
                                        label="Contrasena"
                                        type="password"
                                        name='password'
                                        fullWidth
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel id="role-label">Rol</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            name="rol"
                                            value={formData.rol || ''}
                                            onChange={handleChange}
                                        >
                                            {rolesOptions.map((roleOption, index) => (
                                                <MenuItem key={index} value={roleOption.name}>
                                                    {roleOption.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <AlertMessage alert={alert} />
                            <DialogActions>
                                <Button onClick={handleClose} sx={{ color: 'red', border: '1px solid red' }}>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary" sx={{ border: '1px solid blue' }}>
                                    Registrar
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
