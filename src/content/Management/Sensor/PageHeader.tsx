import { Button, Dialog, DialogActions, DialogContent, Grid, TextField, Typography } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AlertMessage from '@/utils/api/utilities/Alert';
import Cookies from 'js-cookie';
import MapUbication from '@/components/Map/MapUbication';
import api from '@/utils/api/api';
import { useState } from 'react';

interface AlertState {
    message: string;
    severity: 'success' | 'error';
    open: boolean;
}

function PageHeader({ onAddSensor }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState<AlertState>({ message: '', severity: 'success', open: false });
    let token = Cookies.get('token');
    const handleOpen = () => setOpen(true);

    const initialState = {
        external_id: '',
        name: '',
        type_sensor: '',
        latitude: 0,
        longitude: 0,
        ip: 0,
        status: ''
    };
    const handleClose = () => {
        setOpen(false);
        setFormData(initialState);
        setAlert({ message: '', severity: 'success', open: false });
    };
    const [formData, setFormData] = useState(initialState);
    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await api.saveSensor(formData, token);
        setAlert({ message: 'Sensor registrado exitosamente', severity: 'success', open: true });
        onAddSensor()
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
    const setCoordinates = ({ lat, lng }) => {
        setFormData(prevState => ({
            ...prevState,
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lng.toFixed(6))
        }));
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Administración de sensores
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
                                        name='name'
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="type_sensor"
                                        name='type_sensor'
                                        label="Tipo Sensor"
                                        type="tel"
                                        fullWidth
                                        value={formData.type_sensor}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="latitude"
                                        name='latitude'
                                        label="Latitud"
                                        type="tel"
                                        fullWidth
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        disabled
                                        InputProps={{
                                            style: { fontWeight: 'bold', color: 'black' }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="longitude"
                                        name='longitude'
                                        label="Longitud"
                                        type="tel"
                                        fullWidth
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        disabled
                                        InputProps={{
                                            style: { fontWeight: 'bold', color: 'black' }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        id="ip"
                                        label="Ip"
                                        type="tel"
                                        name='ip'
                                        fullWidth
                                        value={formData.ip}
                                        onChange={handleChange}
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
