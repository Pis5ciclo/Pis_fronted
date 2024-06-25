import * as React from 'react';
import * as yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { renderMessage } from '@/utils/api/utilities/formErrors';
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
interface Errors {
    password?: string;
    email?: string;
}
const schema_email = yup.object().shape({
    email: yup
        .string()
        .email('Ingrese un correo electrónico válido')
        .required('El correo electrónico es obligatorio')
});

const schema = yup.object().shape({
    password: yup
        .string()
        .test(
            'uppercase',
            'La contraseña debe contener al menos una letra mayúscula',
            (value) => {
                if (!value) return true;
                return /[A-Z]/.test(value);
            }
        )
        .test(
            'lowercase',
            'La contraseña debe contener al menos una letra minúscula',
            (value) => {
                if (!value) return true;
                return /[a-z]/.test(value);
            }
        )
        .test(
            'number',
            'La contraseña debe contener al menos un número',
            (value) => {
                if (!value) return true;
                return /\d/.test(value);
            }
        )
        .test(
            'special character',
            'La contraseña debe contener al menos un carcter especial',
            (value) => {
                if (!value) return true;
                return /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]/.test(value);
            }
        )
        .test(
            'min length',
            'La contraseña debe tener al menos 8 caracteres',
            (value) => {
                if (!value) return true;
                return value.length >= 8;
            }
        )
});

export default function Login() {
    const router = useRouter();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let token = Cookies.get('token');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
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
        setLoginError('');
        if (name === 'password') {
            if (!value) {
                setIsPasswordValid(false);
                return;
            }
            schema
                .validate({ [name]: value })
                .then(() => {
                    setErrors({ ...errors, [name]: '' });
                    setIsPasswordValid(true);
                })
                .catch((error) => {
                    setErrors({ ...errors, [name]: error.errors[0] });
                    setIsPasswordValid(false);
                });
        }
        setLoginError('');
        if (name === 'email') {
            if (!value) {
                setIsEmailValid(false);
                return;
            }
            schema_email
                .validate({ [name]: value })
                .then(() => {
                    setErrors({ ...errors, [name]: '' });
                    setIsEmailValid(true);
                })
                .catch((error) => {
                    setErrors({ ...errors, [name]: error.errors[0] });
                    setIsEmailValid(false);
                });
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head>
                <link rel="icon" href="/image/logo-unl.png" />
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
                                <Grid item xs={12} md={6} textAlign={'left'}>
                                    <TextField
                                        margin="dense"
                                        name="email"
                                        label="Correo electrónico"
                                        type="email"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <div style={{ marginTop: '5px', margin:'normal'}}>
                                        {renderMessage({
                                            errors,
                                            fieldName: 'email',
                                        })}
                                    </div>
                                    <Grid item sx={{ mb: 5, marginLeft:2}} >
                                        {loginError && (
                                            <div style={{ color: 'red', marginTop: '5px', fontSize: '1rem'}}>
                                                {loginError}
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        margin="dense"
                                        name="password"
                                        label="Contraseña"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        value={formData.password}
                                        onChange={handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div style={{ marginTop: '5px' }}>
                                        {renderMessage({
                                            errors,
                                            fieldName: 'password',
                                        })}
                                    </div>
                                </Grid>
                                <Grid item sx={{ mb: 5, margin: 'auto' }} >
                                    {loginError && (
                                        <div style={{ color: 'red', marginTop: '5px', fontSize: '1rem', margin: 'normal' }}>
                                            {loginError}
                                        </div>
                                    )}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mb: 3 }}
                                        disabled={!isPasswordValid}
                                        style={{
                                            opacity: isPasswordValid ? 1 : 0.7,
                                            backgroundColor: '#007bff',
                                        }}
                                    >
                                        Registrase
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