import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const Header = () => {
  const token = useAppSelector(state => state.auth.token);

  return (
    <header className={s.header}>
      <NavLink to="/" className={s.logo}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Canal_News_logo.svg/2560px-Canal_News_logo.svg.png"
          alt="brand logo"
          width={60}
          height={60}
        />
      </NavLink>

      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${s.link} ${isActive ? s.linkActive : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) => `${s.link} ${isActive ? s.linkActive : ''}`}
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
          <NavLink to="/login" className={s.loginLink}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export { Header };
