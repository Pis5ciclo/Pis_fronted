import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertMessage from '@/utils/api/utilities/Alert';
import { Person } from '@/models/person';
import Validation from '@/utils/api/utilities/Validation';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';

interface AddPersonModalProps {
    open: boolean;
    handleClose: () => void;
    handleSavePerson: (person: Person, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => Promise<void>;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('campo requerido*'),
    lastname: Yup.string().required('campo requerido*'),
    email: Yup.string()
        .required('campo requerido*')
        .matches(/.*@.*\..*/, 'Ingrese un correo electrónico válido'),

    password: Yup.string().required('campo requerido*'),
    rol: Yup.string().required('Seleccione un rol')
});

const useStyles = makeStyles(theme => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem'
    },
    formErrorText: {
        color: 'red',
        fontSize: '0.9rem',
        marginTop: '1rem'
    }
}));

const AddPersonModal: React.FC<AddPersonModalProps> = ({ open, handleClose, handleSavePerson }) => {
    const [rolesOptions, setRolesOptions] = useState([]);
    const classes = useStyles();
    const [formData, setFormData] = useState<Person>({
        external_id: '',
        name: '',
        lastname: '',
        rol: '',
        email: '',
        status: '',
        password: ''
    });

    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'; open: boolean }>({
        message: '',
        severity: 'success',
        open: false,
    });

    const [formError, setFormError] = useState<string>('');

    const { errors, validate, resetErrors } = Validation(validationSchema);

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
        setAlert({ message: '', severity: 'success', open: false });
        setFormError('');
        resetErrors();
    }, [open]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await validate(formData);
        if (isValid) {
            setFormError('');
            await handleSavePerson(formData, setAlert);
        } else {
            setFormError('Por favor, complete todos los campos.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Registrar Persona</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="name"
                                label="Nombres"
                                type="text"
                                fullWidth
                                value={formData?.name || ''}
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
                                autoFocus
                                margin="dense"
                                name="lastname"
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
                                name="email"
                                label="Correo electrónico"
                                type="text"
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
                                name="password"
                                label="Contraseña"
                                type="password"
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
                        </Grid>
                    </Grid>
                    {formError && (
                        <Typography className={classes.formErrorText}>
                            {formError}
                        </Typography>
                    )}
                    <AlertMessage alert={alert} />
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: 'red', border: '1px solid red' }}>
                            Cancelar
                        </Button>
                        <Button type='submit' color="success">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPersonModal;
