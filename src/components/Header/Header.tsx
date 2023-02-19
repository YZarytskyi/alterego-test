import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import Button from '@mui/material/Button/Button';
import logo from 'assets/logo.png';
import s from './Header.module.scss';

const Header = () => {
  const token = useAppSelector(state => state.auth.token);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to="/" className={s.logoLink}>
          <img src={logo} alt="brand logo" width={30} height={30} />
          <span>News</span>
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
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ''}`
                }
              >
                News
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={s.rightSide}>
          {token ? (
            <NavLink to="/profile">Profile</NavLink>
          ) : (
            <Button fullWidth variant="contained">
              <NavLink to="/login">Login</NavLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
