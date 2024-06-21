import { Button, DialogActions, Grid, TextField } from '@mui/material';

export default function SignIn({ onCancel }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Maneja el envío del formulario aquí
        console.log('Formulario de inicio de sesión enviado');
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombres"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="lastname"
                            label="Apellidos"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Teléfono"
                            type="tel"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="dense"
                            id="identification"
                            label="Cedula"
                            type="tel"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="dense"
                            id="email"
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="dense"
                            id="password"
                            label="Contrasena"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            margin="dense"
                            id="rol"
                            label="rol"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                </Grid>
                <DialogActions>
                    {onCancel && (
                        <Button onClick={onCancel} color="primary">
                            Cancelar
                        </Button>
                    )}
                    <Button type="submit" color="primary">
                        Registrar
                    </Button>
                </DialogActions>
            </form>
        </>
    )
}
