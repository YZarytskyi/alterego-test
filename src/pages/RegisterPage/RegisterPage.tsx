import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import backgroundImg from 'assets/register.jpg';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { auth } from '../../utils/firebase';
import { useForm } from 'react-hook-form';
import { setAuthData } from '../../store/auth/authSlice';
import { schema } from '../LoginPage/schema';

interface IFormInputs {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const signUp = async (email: string, password: string) => {
    try {
      const { user }: any = await createUserWithEmailAndPassword(
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
    signUp(data.email, data.password);
    setLoading(false);
  };

  const token = useAppSelector(state => state.auth.token);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 110px)' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 10,
            mx: 20,
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
            sx={{ mt: 1 }}
          >
            <TextField
              id="email"
              {...register('email')}
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
            />
            <Typography
              component="p"
              sx={{ color: 'red', fontSize: 14, margin: '5px 0' }}
            >
              {errors.email?.message ? errors.email?.message : ' '}
            </Typography>

            <TextField
              id="password"
              {...register('password')}
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
            />
            <Typography
              component="p"
              sx={{ color: 'red', fontSize: 14, margin: '5px 0' }}
            >
              {errors.password?.message ? errors.password?.message : ' '}
            </Typography>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary"/>}
              label="I want to receive marketing promotions via email."
            />
            <Typography
              component="p"
              sx={{ color: 'red', fontSize: 14, margin: '2px 0' }}
            >
              {error || ''}
            </Typography>
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
      </Grid>
    </Grid>
  );
}
