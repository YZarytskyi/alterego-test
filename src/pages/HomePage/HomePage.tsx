import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  const translateToEnglish = () => {
    i18n.changeLanguage('en');
  };

  const translateToUkrainian = () => {
    i18n.changeLanguage('ua');
  };

  return (
    <section>
      <div className={`container ${s.container}`}>
        <h1 className={s.title}>{t('home.title')}</h1>
        <p className={s.text}>{t('home.text')}</p>
        <p className={s.text}>{t('home.text2')}</p>
        <p className={s.changeLngText}>{t('home.changeLng')}</p>
        <div className={s.lngBtnContainer}>
          <Button
            variant="contained"
            sx={{ my: 2, backgroundColor: 'white', minWidth: 120 }}
            onClick={translateToEnglish}
          >
            <span>Engish</span>
          </Button>
          <Button
            variant="contained"
            sx={{ my: 2, backgroundColor: 'white', minWidth: 120 }}
            onClick={translateToUkrainian}
          >
            <span>Українська</span>
          </Button>
        </div>
        <Button variant="contained" sx={{ mt: 4, mb: 2, py: 1, minWidth: 120 }}>
          <Link to="/news">{t('buttons.toNews')}</Link>
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
