import { newsApi } from 'api/newsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsApiResponse, ThunkError } from 'types/types';
import { RootState } from '../store';
import { incrementPage } from './newsSlice';

export const fetchArticles = createAsyncThunk<NewsApiResponse>(
  'articles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Some error occurred');
    }
  }
);

export const fetchMoreArticles = createAsyncThunk<
  NewsApiResponse,
  void,
  { state: RootState }
>('moreArticles/fetch', async (_, { rejectWithValue, getState, dispatch }) => {
  try {
    const {
      news: { page },
    } = getState();
    dispatch(incrementPage());
    return await newsApi.getArticles(page + 1);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Some error occurred');
  }
});
