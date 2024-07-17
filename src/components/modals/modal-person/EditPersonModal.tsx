import * as Yup from 'yup';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AlertMessage from '@/utils/api/utilities/Alert';
import { Person } from '@/models/person';
import Validation from '@/utils/api/utilities/Validation';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';

interface EditPersonModalProps {
    open: boolean;
    handleClose: () => void;
    person: Person | null;
    handleSave: (person: Person, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => Promise<void>;
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('campo requerido*'),
    lastname: Yup.string().required('campo requerido*'),
    phone: Yup.string().required('campo requerido*'),
    identification: Yup.string().required('campo requerido*'),
    email: Yup.string().email('Ingrese un correo válido').required('campo requerido*'),
});
const useStyles = makeStyles(theme => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem'
    },
}));
const EditPersonModal: React.FC<EditPersonModalProps> = ({ open, handleClose, person, handleSave }) => {
    const [rolesOptions, setRolesOptions] = useState([]);
    const classes = useStyles();
    const [formData, setFormData] = useState<Person>({
        external_id: '',
        name: '',
        lastname: '',
        phone: 0,
        identification: '',
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
                const response = await api.roles();
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
                                autoFocus
                                margin="dense"
                                name="phone"
                                label="Telefono"
                                type="number"
                                fullWidth
                                value={formData.phone || ''}
                                onChange={handleChange}
                                error={!!errors.phone}
                            />
                            {errors.phone && (
                                <div className={classes.errorText}>
                                    {errors.phone}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="identification"
                                label="Identificacion"
                                type="number"
                                fullWidth
                                value={formData.identification || ''}
                                onChange={handleChange}
                                error={!!errors.identification}
                            />
                            {errors.identification && (
                                <div className={classes.errorText}>
                                    {errors.identification}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="email"
                                label="Correo electronico"
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
                        <Button type='submit' color="primary"sx={{ border: '1px solid blue' }}>
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default EditPersonModal;
