import * as Yup from 'yup';

import { Button, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AlertMessage from '@/utils/api/utilities/Alert';
import Cookies from 'js-cookie';
import MapUbication from '@/components/Map/MapUbication';
import api from '@/utils/api/api';
import { useRouter } from 'next/router';

interface AlertState {
    message: string;
    severity: 'success' | 'error';
    open: boolean;
}

interface FormValues {
    external_id: string;
    name: string;
    type_sensor: string;
    latitude: number;
    longitude: number;
    ip: string;
    status: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Campo requerido*'),
    type_sensor: Yup.string().required('Campo requerido*'),
    ip: Yup.string()
        .required('Campo requerido*')
        .matches(
            /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
            'Debe ser una dirección IPv4 válida'
        ),
    latitude: Yup.number().required('Campo requerido*'),
    longitude: Yup.number().required('Campo requerido*'),
});

const initialFormData: FormValues = {
    external_id: '',
    name: '',
    type_sensor: '',
    latitude: 0,
    longitude: 0,
    ip: '',
    status: '',
};


function PageHeader({ onAddSensor, userName }) {
    const [open, setOpen] = useState(false);
    const [typesOptions, setTypesOptions] = useState([]);
    const [alert, setAlert] = useState<AlertState>({ message: '', severity: 'success', open: false });
    const [formData, setFormData] = useState<FormValues>(initialFormData);
    const [formErrors, setFormErrors] = useState<FormValues>({
        external_id: '',
        name: '',
        type_sensor: '',
        latitude: 0,
        longitude: 0,
        ip: '',
        status: '',
    });
    const router = useRouter();

    let token = Cookies.get('token');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setFormData(initialFormData);
        setFormErrors({
            external_id: '',
            name: '',
            type_sensor: '',
            latitude: 0,
            longitude: 0,
            ip: '',
            status: '',
        });
        setAlert({ message: '', severity: 'success', open: false });
    };

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await api.types(token);
                setTypesOptions(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchTypes();
    }, [token]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await schema.validate(formData, { abortEarly: false });
            const response = await api.saveSensor(formData, token);
            setAlert({ message: 'Sensor registrado exitosamente', severity: 'success', open: true });
            onAddSensor();
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            if (error.message === 'La IP ya está registrada') {
                setFormErrors(prevState => ({
                    ...prevState,
                    ip: 'La IP ya está registrada',
                }));
            } else if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                setFormErrors(errors as FormValues);
            } else {
                router.push('/status/500');
                setAlert({ message: 'Error del servidor', severity: 'error', open: true });
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value,
        }));
    };

    const setCoordinates = React.useCallback(({ lat, lng }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lng.toFixed(6)),
        }));
    }, [setFormData]);

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Administración de sensores
                </Typography>
                <Typography variant="subtitle2">
                    {userName}, estas son tus opciones
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleOpen}
                >
                    Registrar Sensor
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <MapUbication setCoordinates={setCoordinates} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Nombre"
                                        type="text"
                                        name="name"
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={!!formErrors.name}
                                        helperText={formErrors.name && (
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                style={{
                                                    color: 'red',
                                                    fontSize: '0.7rem',
                                                    marginLeft: '0.30rem',
                                                    marginTop: '0.0rem',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                {formErrors.name}
                                            </Typography>
                                        )
                                        }

                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel id="type-label">Tipo</InputLabel>
                                        <Select
                                            labelId="type-label"
                                            name="type_sensor"
                                            value={formData.type_sensor}
                                            onChange={(event) => handleChange(event as React.ChangeEvent<{ name?: string; value: unknown }>)}
                                            error={!!formErrors.type_sensor}
                                        >
                                            {typesOptions.map((option, index) => (
                                                <MenuItem key={index} value={option.name}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formErrors.type_sensor && (
                                            <Typography variant="caption" color="error" style={{
                                                color: 'red',
                                                fontSize: '0.7rem',
                                                marginLeft: '0.30rem',
                                                marginTop: '0.0rem',
                                                textTransform: 'none',
                                            }}>
                                                {formErrors.type_sensor}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="latitude"
                                        name="latitude"
                                        label="Latitud"
                                        type="text"
                                        fullWidth
                                        value={formData.latitude}
                                        onChange={(event) => handleChange(event)}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="longitude"
                                        name="longitude"
                                        label="Longitud"
                                        type="text"
                                        fullWidth
                                        value={formData.longitude}
                                        onChange={(event) => handleChange(event)}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="ip"
                                        label="Ip"
                                        type="text"
                                        name="ip"
                                        fullWidth
                                        value={formData.ip}
                                        onChange={handleChange}
                                        error={!!formErrors.ip}
                                        helperText={formErrors.ip && (
                                            <Typography
                                                variant="caption"
                                                color="error"
                                                style={{
                                                    color: 'red',
                                                    fontSize: '0.7rem',
                                                    marginLeft: '0.30rem',
                                                    marginTop: '0.0rem',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                {formErrors.ip}
                                            </Typography>
                                        )
                                        }
                                    />
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