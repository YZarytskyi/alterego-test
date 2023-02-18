import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { Footer } from 'components/Footer/Footer';

const SharedLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export { SharedLayout };
