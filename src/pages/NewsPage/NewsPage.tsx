import { ChangeEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowRightAltOutlined from '@mui/icons-material/ArrowRightAltOutlined';
import Grid from '@mui/material/Grid';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchArticles, fetchMoreArticles } from 'store/news/newsThunks';
import useDebounce from '../../hooks/useDebounce';
import ErrorPage from '../ErrorPage/ErrorPage';
import s from './NewsPage.module.scss';
import { NewsPageSkeleton } from './NewsPageSkeleton';

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, isLoadingMore, error } = useAppSelector(
    state => state.news
  );
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const debouncedQuery = useDebounce<string>(query, 250);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchArticles(debouncedQuery));
  }, [debouncedQuery]);

  useEffect(() => {
    if (page) {
      dispatch(fetchMoreArticles({ page, query }));
    }
  }, [page]);

  const incrementPage = () => {
    setPage(prev => prev + 1);
  };

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <section>
      <div className={`container ${s.container}`}>
        <h1 className={s.title}>News</h1>
        <Input
          onChange={onChangeInput}
          value={query}
          startAdornment={<SearchIcon />}
          sx={{
            px: 1,
            mt: 1,
            mb: 4,
            gap: 1,
            width: 290,
          }}
          placeholder="Search news..."
        />
        {isLoading ? (
          <NewsPageSkeleton />
        ) : (
          <>
            <Grid container spacing={3}>
              {articles?.map(article => (
                <Grid item xs={12} sm={6} md={4} key={article._id}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
            <div className={s.loadMoreBtnContainer}>
              <LoadingButton
                className={s.loadMoreBtn}
                onClick={incrementPage}
                loading={isLoadingMore}
                endIcon={<ArrowRightAltOutlined />}
                loadingPosition="end"
                variant="outlined"
              >
                {t('buttons.loadMore')}
              </LoadingButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsPage;
