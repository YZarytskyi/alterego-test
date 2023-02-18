import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { auth } from 'utils/firebase';
import { setAuthData } from 'store/auth/authSlice';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-hook-form';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('⚠ Invalid email')
    .required('⚠ This field is required'),
  password: yup.string().required('⚠ This field is required'),
});

const theme = createTheme();

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogIn = async (email: string, password: string) => {
    try {
      const { user }: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToken = user.accessToken;
      const userEmail = user.email;
      dispatch(setAuthData({ userToken, userEmail }));
    } catch (error: any) {
      const errorMessage = error.message.slice(10);
      setError(`⚠ ${errorMessage}`);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });
  const onSubmit = (data: IFormInputs) => {
    setError('');
    setLoading(true);
    handleLogIn(data.email, data.password);
    setLoading(false);
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                id="email"
                {...register('email')}
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                id="password"
                {...register('password')}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
