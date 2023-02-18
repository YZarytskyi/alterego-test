import { useAppSelector } from '../../hooks/redux-hooks';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const token = useAppSelector(state => state.auth.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>Profile</div>;
};

export default ProfilePage;
