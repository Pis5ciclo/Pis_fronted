import { Button, Dialog, DialogActions, Alert, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Cookies from 'js-cookie';
import api from '@/utils/api/api';
import Validation from '@/utils/api/utilities/Validation';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';

interface AlertState {
    message: string;
    severity: 'success' | 'error';
    open: boolean;
}

const useStyles = makeStyles(theme => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem'
    },
}));

function PageHeader({ onAddPerson }) {
    const [rolesOptions, setRolesOptions] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState<AlertState>({ message: '', severity: 'success', open: false });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isRolSelected, setIsRolSelected] = useState(false);
    const [errorTimer, setErrorTimer] = useState(null);
    let token = Cookies.get('token');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData(initialState);
        setAlert({ message: '', severity: 'success', open: false });
        setIsFormValid(false);
        setIsRolSelected(false);
        resetErrors();
    };

    const initialState = {
        external_id: '',
        name: '',
        lastname: '',
        rol: '',
        email: '',
        status: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('campo requerido*'),
        lastname: Yup.string().required('campo requerido*'),
        email: Yup.string()
            .required('campo requerido*')
            .matches(/.*@.*\..*/, 'Ingrese un correo electrónico válido'),
        rol: Yup.string().required('Seleccione un rol'),
        password: Yup
            .string()
            .test(
                'uppercase',
                'La contraseña debe contener al menos una letra mayúscula',
                (value) => {
                    if (!value) return true;
                    return /[A-Z]/.test(value);
                }
            )
            .test(
                'lowercase',
                'La contraseña debe contener al menos una letra minúscula',
                (value) => {
                    if (!value) return true;
                    return /[a-z]/.test(value);
                }
            )
            .test(
                'number',
                'La contraseña debe contener al menos un número',
                (value) => {
                    if (!value) return true;
                    return /\d/.test(value);
                }
            )
            .test(
                'special character',
                'La contraseña debe contener al menos un carácter especial',
                (value) => {
                    if (!value) return true;
                    return /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/.test(value);
                }
            )
            .test(
                'min length',
                'La contraseña debe tener al menos 8 caracteres',
                (value) => {
                    if (!value) return true;
                    return value.length >= 8;
                }
            )

    });

    const { errors, validate, resetErrors } = Validation(validationSchema);
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

    useEffect(() => {
        const isValid = Object.keys(errors).length === 0 &&
            formData.name !== '' &&
            formData.lastname !== '' &&
            formData.email !== '' &&
            formData.password !== '' &&
            formData.rol !== '';
        setIsFormValid(isValid);
    }, [formData, errors]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validate(formData);
        if (isValid) {
            try {
                const response = await api.saveUser(formData, token);
                console.log('Usuario guardado:', response);
                setAlert({ message: 'Usuario registrado exitosamente', severity: 'success', open: true });
                onAddPerson();
                setTimeout(() => {
                    handleClose();
                }, 1000);
            } catch (error) {
                console.error('Error al guardar el usuario:', error.message);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'rol' && value !== '') {
            setIsRolSelected(true);
        } else if (name === 'rol' && value === '') {
            setIsRolSelected(false);
        }

        if (errorTimer) {
            clearTimeout(errorTimer);
        }
    };

    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Administración de usuarios
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
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        error={!!errors.name}
                                    />
                                    {errors.name && (
                                        <div className={classes.errorText}>
                                            {errors.name}
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
                                        error={!!errors.lastname}
                                    />
                                    {errors.lastname && (
                                        <div className={classes.errorText}>
                                            {errors.lastname}
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Correo Electrónico"
                                        type="text"
                                        name='email'
                                        fullWidth
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                    />
                                    {errors.email && (
                                        <div className={classes.errorText}>
                                            {errors.email}
                                        </div>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="password"
                                        label="Contraseña"
                                        type="password"
                                        name='password'
                                        fullWidth
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                    />
                                    {errors.password && (
                                        <div className={classes.errorText}>
                                            {errors.password}
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
                                    </FormControl>
                                    {errors.rol && (
                                        <div className={classes.errorText}>
                                            {errors.rol}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                            {alert.open && (
                                <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                                    {alert.message}
                                </Alert>
                            )}
                            <DialogActions>
                                <Button onClick={handleClose} sx={{ color: 'red', border: '1px solid red' }}>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary" sx={{ border: '1px solid blue' }} disabled={!isFormValid || !isRolSelected}>
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