import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { auth } from '../../utils/firebase';
import { useForm } from 'react-hook-form';
import { setAuthData } from '../../store/auth/authSlice';

const schema = yup.object({
  email: yup
    .string()
    .email('⚠ Invalid email')
    .required('⚠ This field is required'),
  password: yup.string().required('⚠ This field is required'),
});

interface IFormInputs {
  email: string;
  password: string;
}

const theme = createTheme();

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    try {
      const {user}: any = await createUserWithEmailAndPassword(auth, email, password);
      const userToken = user.accessToken;
      const userEmail = user.email
      dispatch(setAuthData({userToken, userEmail}))
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
    signUp(data.email, data.password);
    setLoading(false);
  };

  const token = useAppSelector(state => state.auth.token);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  {...register('email')}
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  {...register('password')}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
