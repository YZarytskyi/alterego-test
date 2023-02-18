import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
        </ul>
      </nav>

      <div className={s.rightSide}>
        <NavLink to="/login">Login</NavLink>
        {/* <NavLink to="/profile">Profile</NavLink> */}
      </div>
    </header>
  );
};

export { Header };
