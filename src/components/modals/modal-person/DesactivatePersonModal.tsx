import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';

import AlertMessage from '@/utils/api/utilities/Alert';
import { Person } from '@/models/person';

interface DesactivatePersonModalProps {
    open: boolean;
    handleClose: () => void;
    person: Person | null;
    handleDesactivate: (person: Person) => void;
    alert: { message: string; severity: 'success' | 'error'; open: boolean };
    setAlert: React.Dispatch<React.SetStateAction<{ message: string; severity: 'success' | 'error'; open: boolean }>>; // Define setAlert aquí
}

const DesactivatePersonModal: React.FC<DesactivatePersonModalProps> = ({ open, handleClose, person, handleDesactivate, alert, setAlert }) => {
    useEffect(() => {
        if (open) {
            setAlert({ message: '', severity: 'success', open: false });
        }
    }, [open, setAlert]);
    if (!person) return null;
    const handleConfirm = () => {
        handleDesactivate(person);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Desactivar Cuenta</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que quieres {person.status === 'activo' ? 'desactivar' : 'activar'} la cuenta de {person.name} {person.lastname}?
                </DialogContentText>
                <AlertMessage alert={alert} />
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'red', border: '1px solid red' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" sx={{ border: '1px solid blue' }}>
                        {person.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog >
    );
};

export default DesactivatePersonModal;
