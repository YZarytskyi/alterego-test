import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button/Button';
import s from './ErrorPage.module.scss';

interface ErrorPageProps {
  error: Error;
}

const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className={s.errorContainer}>
      <p className={s.error}>{`⚠ ${t('errors.global')}: ${error.message}`}</p>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => window.location?.reload()}
      >
        {t('buttons.reload')}
      </Button>
    </div>
  );
};

export default ErrorPage;
