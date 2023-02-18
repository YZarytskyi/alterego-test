import { IconButton } from '@mui/material';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteArticle } from '../../store/news/newsSlice';
import { Article } from '../../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './ArticleCard.module.scss';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const onClickDeleteArticle = () => {
    dispatch(deleteArticle(article._id));
  };

  return (
    <li className={s.card}>
      <a
        href={article.web_url}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          className={s.image}
          src={`https://static01.nyt.com/${article.multimedia[0]?.url}`}
          alt={article.headline.main}
        />
        <p>{article.headline.main}</p>
      </a>
      <IconButton aria-label="delete" onClick={onClickDeleteArticle}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default ArticleCard;
