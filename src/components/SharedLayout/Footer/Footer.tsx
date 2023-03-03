import { useTranslation } from 'react-i18next';
import s from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={s.footer}>
      <p className={s.copyright}>&copy; {t('footer.copyright')}</p>
    </footer>
  );
};

export { Footer };
