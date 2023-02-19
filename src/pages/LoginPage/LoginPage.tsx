import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import backgroundImg from 'assets/login.jpg'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { auth } from 'utils/firebase';
import { setAuthData } from 'store/auth/authSlice';
import { useForm } from 'react-hook-form';
import { schema } from './schema';

interface IFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const [loading, setLoading] = useState(false);
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
      setError(`⚠ Your email or password is incorrect`);
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
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Typography
              component="p"
              sx={{ color: 'red', fontSize: 14, margin: '5px 0' }}
            >
              {errors.password?.message ? errors.password?.message : ' '}
            </Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography
              component="p"
              sx={{ color: 'red', fontSize: 14 }}
            >
              {error || ''}
            </Typography>
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
  );
}
