import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';

import AlertMessage from '@/utils/api/utilities/Alert';
import { Sensor } from '@/models/sensor';

interface DesactivateSensorModalProps {
    open: boolean;
    handleClose: () => void;
    sensor: Sensor | null;
    handleDesactivate: (sensor: Sensor) => void;
    alert: { message: string; severity: 'success' | 'error'; open: boolean };
    setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>;
}

const DesactivateSensorModal: React.FC<DesactivateSensorModalProps> = ({ open, handleClose, sensor: sensor, handleDesactivate, alert, setAlert }) => {
    useEffect(() => {
        if (open) {
            setAlert({ message: '', severity: 'success', open: false });
        }
    }, [open, setAlert]);
    if (!sensor) return null;
    const handleConfirm = () => {
        handleDesactivate(sensor);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cambiar Estado</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que quieres {sensor.status === 'activo' ? 'desactivar' : 'activar'} la cuenta de {sensor.name}?
                </DialogContentText>
                <AlertMessage alert={alert} />
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='error'>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant='outlined'>
                        {sensor.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

    );
};

export default DesactivateSensorModal;
