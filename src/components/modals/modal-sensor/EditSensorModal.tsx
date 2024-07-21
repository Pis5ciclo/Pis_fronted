import * as Yup from 'yup';

import { Button, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertMessage from '@/utils/api/utilities/Alert';
import Cookies from 'js-cookie';
import MapUbication from '@/components/Map/MapUbication';
import { Sensor } from '@/models/sensor';
import Validation from '@/utils/api/utilities/Validation';
import api from '@/utils/api/api';
import { makeStyles } from '@mui/styles';

interface EditSensorModalProps {
    open: boolean;
    handleClose: () => void;
    sensor: Sensor | null;
    handleSave: (sensor: Sensor, setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>) => Promise<void>;
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
const useStyles = makeStyles(() => ({
    errorText: {
        color: 'red',
        fontSize: '0.7rem',
        marginLeft: '0.30rem',
        fontWeight: 'bold'
    },
}));
const EditSensorModal: React.FC<EditSensorModalProps> = ({ open, handleClose, sensor, handleSave }) => {
    const [typesOptions, setTypesOptions] = useState([]);
    const classes = useStyles();
    let token = Cookies.get('token_person');
    const [formData, setFormData] = useState<Sensor>({
        external_id: '',
        name: '',
        type_sensor: '',
        latitude: 0,
        longitude: 0,
        ip: '',
        status: '',
    });
    const [formErrors, setFormErrors] = useState<Sensor>({
        external_id: '',
        name: '',
        type_sensor: '',
        latitude: 0,
        longitude: 0,
        ip: '',
        status: '',
    });

    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error'; open: boolean }>({
        message: '',
        severity: 'success',
        open: false,
    });

    const { errors, validate, resetErrors } = Validation(schema);

    useEffect(() => {
        const fetchSensors = async () => {
            try {
                const response = await api.types(token);
                setTypesOptions(response);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchSensors();
    }, []);


    useEffect(() => {
        if (sensor) {
            setFormData(sensor);
            setAlert({ message: '', severity: 'success', open: false });
            resetErrors()
        }
    }, [sensor, open]);


    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = await validate(formData);
        if (isValid) {
            await handleSave(formData, setAlert);
        }

    };
    const setCoordinates = React.useCallback(({ lat, lng }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lng.toFixed(6)),
        }));
    }, [setFormData]);
    return (
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
                                error={!!errors.name}
                            />
                            {errors.name && (
                                <div className={classes.errorText}>
                                    {errors.name}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" >
                                <InputLabel id="type-label">Tipo</InputLabel>
                                <Select
                                    labelId="type-label"
                                    name="type_sensor"
                                    value={formData.type_sensor || ''}
                                    onChange={(event) => handleChange(event as React.ChangeEvent<{ name?: string; value: unknown }>)}
                                    error={!!formErrors.type_sensor}
                                >
                                        <MenuItem value = {"AGUA"} >Agua</MenuItem>
                                        <MenuItem value = {"AIRE"} >Aire</MenuItem>
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
                                error={!!errors.ip}
                            />
                            {errors.ip && (
                                <div className={classes.errorText}>
                                    {errors.ip}
                                </div>
                            )}


                        </Grid>
                    </Grid>
                    <AlertMessage alert={alert} />
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: 'red', border: '1px solid red' }}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" sx={{ border: '1px solid blue' }}>
                            Modificar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditSensorModal;
