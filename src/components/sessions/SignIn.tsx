import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from '@/utils/api/api';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    let token = Cookies.get('token');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        phone: '',
        identification: '',
        rol: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await api.saveUser(formData, token);
        console.log('Usuario guardado:', response);
        router.push(`/login`);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <Head>
                <title>Registro</title>
            </Head>

            <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh', padding: '20px' }}
            >
                <Grid item xs={12} md={8} lg={6}
                >
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '100%',
                            maxWidth: '600px',
                            margin: 'auto',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Grid item >
                            <Avatar sx={{ width: 80, height: 80, mb: 1, margin: 'auto' }}>
                                <img
                                    src="/image/logo-unl.png"
                                    alt="Tu imagen"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography component="h1" variant="h3" fontFamily="Helvetica">
                                REGISTRARSE
                            </Typography>
                        </Grid>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="name"
                                        label="Nombres"
                                        type="text"
                                        fullWidth
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="lastname"
                                        label="Apellidos"
                                        type="text"
                                        fullWidth
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="phone"
                                        label="Teléfono"
                                        type="text"
                                        fullWidth
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="identification"
                                        label="Identificación"
                                        type="text"
                                        fullWidth
                                        value={formData.identification}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="email"
                                        label="Correo electrónico"
                                        type="email"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        fullWidth
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" spacing={10} >
                                <Grid item>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 4, mb: 5 }}
                                    >
                                        Registrarse
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>

        </>
    );
}