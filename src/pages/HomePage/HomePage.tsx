import { useEffect } from 'react';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchArticles, fetchMoreArticles } from '../../store/news/newsThunks';
import LoadingButton from '@mui/lab/LoadingButton';
import s from './HomePage.module.scss';
import { Spinner } from '../../components/Spinner/Spinner';

const HomePage = () => {
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
            <ul className={s.articlesList}>
              {articles.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </ul>
            <div className={s.loadMoreBtnContainer}>
              <LoadingButton
                className={s.loadMoreBtn}
                onClick={loadMoreArticles}
                loading={isLoading}
                loadingIndicator="Loading…"
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

export default HomePage;
