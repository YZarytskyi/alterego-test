import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchArticles, fetchMoreArticles } from 'store/news/newsThunks';
import { Spinner } from 'components/Spinner/Spinner';
import ArrowRightAltOutlined from '@mui/icons-material/ArrowRightAltOutlined';
import Grid from '@mui/material/Grid';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading } = useAppSelector(state => state.news);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles());
    }
  }, []);

  const loadMoreArticles = () => {
    dispatch(fetchMoreArticles());
  };

  return (
    <section>
      <div className={s.container}>
        <h1 className={s.title}>News</h1>
        {!articles.length ? (
          <Spinner />
        ) : (
          <>
            <Grid container spacing={3}>
              {articles.map(article => (
                <Grid item xs={12} sm={6} md={4} key={article._id}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
            <div className={s.loadMoreBtnContainer}>
              <LoadingButton
                className={s.loadMoreBtn}
                onClick={loadMoreArticles}
                loading={isLoading}
                endIcon={<ArrowRightAltOutlined />}
                loadingPosition='end'
                variant="outlined"
              >
                Load more
              </LoadingButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsPage;
