import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import Button from '@mui/material/Button/Button';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import logo from 'assets/logo.png';
import s from './Header.module.scss';
import { useState } from 'react';

const Header = () => {
  const token = useAppSelector(state => state.auth.token);
  const { t, i18n } = useTranslation();
  const [isLngMenuOpen, setIsLngMenuOpen] = useState(false);

  const openSubMenu = () => {
    setIsLngMenuOpen(prev => !prev);
  };

  const translateToEnglish = () => {
    i18n.changeLanguage('en');
    setIsLngMenuOpen(false);
  };

  const translateToUkrainian = () => {
    i18n.changeLanguage('ua');
    setIsLngMenuOpen(false);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to="/" className={s.logoLink}>
          <img src={logo} alt="brand logo" width={30} height={30} />
          <span>{t('nav.news')}</span>
        </NavLink>

        <nav>
          <ul className={s.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ''}`
                }
              >
                {t('nav.home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ''}`
                }
              >
                {t('nav.news')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={s.rightSide}>
          <Button variant="outlined" className={s.lngBtn} onClick={openSubMenu}>
            <TranslateIcon />
          </Button>
          <ul className={`${s.lngMenu} ${isLngMenuOpen ? s.lngMenuOpen : ''}`}>
            <li>
              <Button
                variant="text"
                fullWidth
                sx={{ px: 4, py: 1 }}
                onClick={translateToEnglish}
              >
                English
              </Button>
            </li>
            <li>
              <Button
                variant="text"
                fullWidth
                sx={{ py: 1 }}
                onClick={translateToUkrainian}
              >
                Українська
              </Button>
            </li>
          </ul>
          {token ? (
            <NavLink to="/profile">Profile</NavLink>
          ) : (
            <Button fullWidth sx={{ minWidth: 78 }} variant="contained">
              <NavLink to="/login">{t('auth.login')}</NavLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
