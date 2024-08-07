import * as React from 'react';
import * as yup from 'yup';

import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from '@/utils/api/api';
import { renderMessage } from '@/utils/api/utilities/formErrors';
import { useRouter } from 'next/router';

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
      'La contraseña debe contener al menos un carácter especial',
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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const checkAuthToken = () => {
      const token = Cookies.get('token_person');
      const storedUser = Cookies.get('user');
      if (token && storedUser) {
        router.push('/dashboard');
      }
    }
    checkAuthToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.login(formData);
      const { token, user, role } = response;

      Cookies.set('token_person', token);
      Cookies.set('user', user);

      if (role === 'Administrador') {
        router.push(`/dashboard?name=${user}`);
      } else {
        router.push(`/?name=${user}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        router.push('/status/500');
        setLoginError('Error desconocido. Por favor, inténtelo de nuevo.');
      }
    }
  };

  const handleChange = (event) => {
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
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/image/logo-unl.png" />
        <title>Iniciar Sesión</title>
      </Head>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/image/login.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ width: 80, height: 80 }}>
              <img
                src="/image/logo-unl.png"
                alt="Tu imagen"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Avatar>
            <Typography component="h1" variant="h3" fontFamily="Helvetica">
              INICIO DE SESIÓN
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="search"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
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
                    )
                  }}
                />
                <div className="">
                  {renderMessage({
                    errors,
                    fieldName: 'password'
                  })}
                </div>
                {loginError && (
                  <div
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {loginError}
                  </div>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isPasswordValid}
                  style={{
                    opacity: isPasswordValid ? 1 : 0.7,
                    backgroundColor: '#007bff'
                  }}
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
