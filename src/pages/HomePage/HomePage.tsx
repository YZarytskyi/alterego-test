import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <section>
      <Link to="/news" className={s.link}>News</Link>
    </section>
  );
};

export default HomePage;
