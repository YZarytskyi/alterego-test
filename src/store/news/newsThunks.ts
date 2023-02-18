import { newsApi } from 'api/newsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsApiResponse } from 'types/types';
import { RootState } from '../store';
import { incrementPage } from './newsSlice';

export const fetchArticles = createAsyncThunk<NewsApiResponse>(
  'articles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
    console.log(error);
    return rejectWithValue(error);
  }
});
