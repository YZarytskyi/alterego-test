import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button/Button';
import ArrowRightAltOutlined from '@mui/icons-material/ArrowRightAltOutlined';
import Grid from '@mui/material/Grid';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchArticles, fetchMoreArticles } from 'store/news/newsThunks';
import { setFirstPage } from '../../store/news/newsSlice';
import { Spinner } from 'components/Spinner/Spinner';
import s from './NewsPage.module.scss';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector(state => state.news);

  useEffect(() => {
    if (!articles.length) {
      dispatch(fetchArticles());
    }

    return () => {
      dispatch(setFirstPage());
    };
  }, []);

  const loadMoreArticles = () => {
    dispatch(fetchMoreArticles());
  };

  if (error) {
    return (
      <div className={s.errorContainer}>
        <p className={s.error}>{`⚠ Something went wrong: ${error}`}</p>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => window.location?.reload()}
        >
          Reload Page
        </Button>
      </div>
    );
  }

  return (
    <section>
      <div className='container'>
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
                loadingPosition="end"
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
