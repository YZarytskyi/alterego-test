import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.copyright}>
        &copy; 2023 News. All Rights Reserved.
      </p>
    </footer>
  );
};

export { Footer };
