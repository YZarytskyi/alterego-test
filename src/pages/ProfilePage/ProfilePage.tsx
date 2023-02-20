import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { Navigate } from 'react-router-dom';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { logout } from 'store/auth/authSlice';
import { signOut } from 'firebase/auth';
import user from 'assets/user.png';
import { classes } from './ProfilePageStyle';
import { auth } from 'utils/firebase';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { token, email } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const onClickLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <div className="container">
        <Card sx={classes.card}>
          <CardMedia
            sx={classes.media}
            component="img"
            src={user}
            alt="Profile picture"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              sx={classes.title}
            >
              {email}
            </Typography>
            <LoadingButton
              onClick={onClickLogout}
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="outlined"
              sx={{ width: '100%', mt: 4 }}
            >
              Log out
            </LoadingButton>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;
