import * as Yup from 'yup';

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Person } from '@/models/person';
import Validation from '@/utils/api/utilities/Validation';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';

interface EditPersonModalProps {
    open: boolean;
    handleClose: () => void;
    person: Person | null;
    handleSave: (person: Person, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => Promise<void>;
    formErrors2;
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('campo requerido*'),
    lastname: Yup.string().required('campo requerido*'),
    email: Yup.string().email('Ingrese un correo válido').required('campo requerido*'),
});
const useStyles = makeStyles(() => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem',
        fontWeight: 'bold' 
    },
}));
const EditPersonModal: React.FC<EditPersonModalProps> = ({ open, handleClose, person, handleSave, formErrors2 }) => {
    const [rolesOptions, setRolesOptions] = useState([]);
    const classes = useStyles();
    let token = Cookies.get('token_person');
    const [errorTimer, setErrorTimer] = useState(null);
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

    const { errors, validate, resetErrors } = Validation(validationSchema);

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
    }, []);

    useEffect(() => {
        if (person) {
            setFormData(person);
            setAlert({ message: '', severity: 'success', open: false });
            resetErrors()
        }
    }, [person, open]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        if (errorTimer) {
            clearTimeout(errorTimer);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await validate(formData);
        if (isValid) {
            await handleSave(formData, setAlert);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Persona</DialogTitle>
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
                                error={!!formErrors2.email} // Utilizar formErrors.ip para mostrar el error
                            />
                            {formErrors2.email && (
                                <div className={classes.errorText}>
                                    {formErrors2.email}
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
                    {alert.open && (
                        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                            {alert.message}
                        </Alert>
                    )}
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined' color='error'>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" variant='outlined'>
                            Registrar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default EditPersonModal;