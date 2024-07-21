import * as Yup from 'yup';

import { Alert, Button, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Cookies from 'js-cookie';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';


interface AlertState {
    message: string;
    severity: 'success' | 'error';
    open: boolean;
}
interface FormValues {
    name: string;
    rol: string;
    email: string;
    password: string;
    lastname: string;
}
const useStyles = makeStyles(() => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem',
        marginTop: '0.0rem',
    },
}));
function PageHeader({ onAddPerson, userName }) {
    const classes = useStyles();
    const [rolesOptions, setRolesOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState<AlertState>({ message: '', severity: 'success', open: false });
    let token = Cookies.get('token_person');
    const [formData, setFormData] = useState<FormValues>({
        name: '',
        rol: '',
        email: '',
        password: '',
        lastname: ''
    });
    const [formErrors, setFormErrors] = useState<FormValues>({
        name: '',
        rol: '',
        email: '',
        password: '',
        lastname: ''
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: '',
            rol: '',
            email: '',
            password: '',
            lastname: ''
        });
        setFormErrors({
            name: '',
            rol: '',
            email: '',
            password: '',
            lastname: ''
        });
        setAlert({ message: '', severity: 'success', open: false });
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.roles(token);
                setRolesOptions(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, [token]);
    const schema = Yup.object().shape({
        name: Yup.string().required('Campo requerido*'),
        lastname: Yup.string().required('Campo requerido*'),
        rol: Yup.string().required('Campo requerido*'),
        email: Yup.string().email('Email inválido').required('Campo requerido*'),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo requerido*')
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await schema.validate(formData, { abortEarly: false });

            const response = await api.saveUser(formData, token);
            console.log('Usuario guardado:', response);
            setAlert({ message: 'Usuario registrado exitosamente', severity: 'success', open: true });
            onAddPerson();
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (error) {
            console.error('Error al guardar el usuario:', error);

            if (error.message === 'El correo electrónico ya está registrado') {
                setFormErrors(prevState => ({
                    ...prevState,
                    email: 'El correo electrónico ya está registrado',
                }));
            } else if (error.name === 'ValidationError') {
                const validationErrors: FormValues = {
                    name: '',
                    rol: '',
                    email: '',
                    password: '',
                    lastname: ''
                };
                error.inner.forEach(err => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });
                setFormErrors(validationErrors);
            } else {
                console.error('Error desconocido al guardar el usuario:', error.message);
            }
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (formErrors[name]) {
            setFormErrors(prevState => ({
                ...prevState,
                [name]: '',
            }));
        }
    };
    const user = {
        name: userName,
        avatar: '/static/images/avatars/1.jpg'
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Administración de usuarios
                </Typography>
                <Typography variant="subtitle2">
                    {userName}, estos son tus opciones
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
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                    />
                                    {formErrors.name && (
                                        <div className={classes.errorText}>
                                            {formErrors.name}
                                        </div>
                                    )}

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="lastname"
                                        name='lastname'
                                        label="Apellidos"
                                        type="text"
                                        fullWidth
                                        value={formData.lastname || ''}
                                        onChange={handleChange}
                                    />
                                    {formErrors.lastname && (
                                        <div className={classes.errorText}>
                                            {formErrors.lastname}
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Correo Electrónico"
                                        type="email"
                                        name='email'
                                        fullWidth
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                    />
                                    {formErrors.email && (
                                        <div className={classes.errorText}>
                                            {formErrors.email}
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="password"
                                        label="Contraseña"
                                        type='password'
                                        name='password'
                                        fullWidth
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                    {formErrors.password && (
                                        <div className={classes.errorText}>
                                            {formErrors.password}
                                        </div>
                                    )}
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
                                        {formErrors.rol && (
                                            <div className={classes.errorText}>
                                                {formErrors.rol}
                                            </div>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {alert.open && (
                                <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                                    {alert.message}
                                </Alert>
                            )}
                            <DialogActions>
                                <Button onClick={handleClose} color='error' variant='outlined'>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary" variant='outlined'>
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
export default PageHeader