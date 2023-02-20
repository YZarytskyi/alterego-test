import { IconButton } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from 'hooks/redux-hooks';
import { deleteArticle } from 'store/news/newsSlice';
import { Article } from 'types/types';
import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';
import { handleImageError } from 'utils/imageErrorHandler';
import { classes } from './ArticleCardStyles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const onClickDeleteArticle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteArticle(article._id));
  };

  const title =
    article.headline?.main?.length > 60
      ? `${article.headline?.main?.slice(0, 60)}...`
      : article.headline?.main;

  return (
    <Card sx={classes.root}>
      <Link
        href={article.web_url}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <CardMedia
          component="img"
          src={`https://static01.nyt.com/${article.multimedia[0]?.url}`}
          loading='lazy'
          sx={classes.media}
          alt={title}
          onError={handleImageError}
        />
        <CardContent>
          <Typography variant="body1" component="p" sx={classes.title}>
            {title}
          </Typography>
          <IconButton
            aria-label="delete"
            sx={classes.deleteBtn}
            onClick={onClickDeleteArticle}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ArticleCard;
