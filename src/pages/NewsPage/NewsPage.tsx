import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowRightAltOutlined from '@mui/icons-material/ArrowRightAltOutlined';
import Grid from '@mui/material/Grid';
import ArticleCard from 'components/ArticleCard/ArticleCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { fetchArticles, fetchMoreArticles } from 'store/news/newsThunks';
import { NewsPageSkeleton } from './NewsPageSkeleton';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from 'hooks/useDebounce';
import ErrorPage from '../ErrorPage/ErrorPage';
import ScrollToTopBtn from 'components/ScrollToTopBtn/ScrollToTopBtn';
import { Typography } from '@mui/material';
import s from './NewsPage.module.scss';

const PER_PAGE: 10 = 10;

const NewsPage = () => {
  const dispatch = useAppDispatch();
  const { articles, total, offset, isLoading, isLoadingMore, error } =
    useAppSelector(state => state.news);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(() => {
    const searchQuery = searchParams.get('query');
    return searchQuery || '';
  });
  const [page, setPage] = useState<number>(0);

  const abortConRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce<string>(query, 250);
  const { t } = useTranslation();

  useEffect(() => {
    abortConRef.current = new AbortController();
    dispatch(
      fetchArticles({
        query: debouncedQuery,
        signal: abortConRef.current.signal,
      })
    );
    return () => {
      abortConRef?.current?.abort();
    };
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
    const target = e.target.value;
    setQuery(target);
    setPage(0);
    if (target) {
      searchParams.set('query', query.trim());
      setSearchParams(searchParams);
      return;
    }
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  const hasMoreArticles = total - (offset + PER_PAGE) > 0;

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <section>
      <ScrollToTopBtn />
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
              {!articles.length && (
                <Typography variant="h6" sx={{ margin: '0 auto', mt: 4 }}>
                  Articles not found
                </Typography>
              )}
              
              {articles?.map(article => (
                <ArticleCard article={article} key={article._id} />
              ))}
            </Grid>

            {hasMoreArticles && (
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
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsPage;
