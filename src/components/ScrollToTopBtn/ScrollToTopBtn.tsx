import { useState, useEffect } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import s from './ScrollToTopBtn.module.scss';

const ScrollToTopBtn = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleShowBtn = () => {
      if (window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener('scroll', handleShowBtn);

    return () => window.removeEventListener('scroll', handleShowBtn);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ExpandLessIcon
      className={`${s.icon} ${showBtn ? s.iconShow : ''}`}
      onClick={goToTop}
    />
  );
};
export default ScrollToTopBtn;
