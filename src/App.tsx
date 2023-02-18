import React, { Suspense } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { Spinner } from './components/Spinner/Spinner';

const HomePage = React.lazy(() => import('pages/HomePage/HomePage'));
const NewsPage = React.lazy(() => import('pages/NewsPage/NewsPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage/ProfilePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = React.lazy(
  () => import('pages/RegisterPage/RegisterPage')
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
