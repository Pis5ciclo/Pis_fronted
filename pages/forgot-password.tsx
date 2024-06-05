import * as React from 'react';

import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from '@/utils/api/api';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    useEffect(() =>{
        const token = Cookies.get('token');
        if(token){
            router.push('/')
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        api.login(formData).then((token) => {
            Cookies.set('token_person', token.data.token)
            Cookies.set('user', token.data.user)
            router.push('/');
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }} // Establece la altura mínima para que el contenido esté centrado verticalmente en la pantalla
        >
            <Grid item xs={12} md={6}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                }}
            >
                <Avatar sx={{ width: 80, height: 80 }}>
                    <img src="/image/logo-unl.png" alt="Tu imagen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Avatar>
                <Typography component="h1" variant="h3" fontFamily="Helvetica">
                    REESTABLECER CONTRASENA
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Corre electronico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type='search'
                        value={formData.email}
                        onChange={handleChange}
                        /> 
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                </Box>
            </Grid>
        </Grid>
    );
}