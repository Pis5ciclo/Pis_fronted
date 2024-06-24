import {
    //Card,
    CardContent,
    //CardHeader,
    //Container,
    Divider,
    Button,
    Grid
} from '@mui/material';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import SidebarLayout from '@/layouts/SidebarLayout';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';

const rols = [
    {
        value: 'Admin',
        label: 'Admin'
    }
];

FormPerson.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

}

function FormPerson(props) {

    const { onClose, buttonClick, open } = props

    //const [currency, setCurrency] = useState('Admin');

    const handleClose = () => {
        onClose(buttonClick);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Registro de Persona</DialogTitle>
            <List sx={{ pt: 0 }}>
                <Grid item xs={12}>
                    <Divider />
                    <CardContent>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="filled-name-input"
                                    label="Nombre"
                                    type="name"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-lastname-input"
                                    label="Apellido"
                                    type="lastname"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-phone-input"
                                    label="Telefono"
                                    type="phone"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-identification-input"
                                    label="Identificación"
                                    type="identificaction"
                                    variant="filled"
                                />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    id="filled-name-input"
                                    label="Correo Electronico"
                                    type="name"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-password-input"
                                    label="Clave"
                                    type="name"
                                    variant="filled"
                                />
                                <TextField
                                    id="filled-password-input"
                                    label="Repetir Clave"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                />
                            </div>
                            <br />
                            <Button
                                sx={{ mt: { xs: 2, md: 0 } }}
                                variant="contained"
                            >
                                Registrar Persona
                            </Button>
                        </Box>
                    </CardContent>
                </Grid>
            </List>
        </Dialog>
    );
}

FormPerson.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default FormPerson;