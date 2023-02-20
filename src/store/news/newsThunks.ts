import { newsApi } from 'api/newsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsApiResponse } from 'types/types';

export const fetchArticles = createAsyncThunk<NewsApiResponse, string>(
  'articles/fetchAll',
  async (query, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles(0, query);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Some error occurred');
    }
  }
);

interface FetchParams {
  page: number;
  query: string;
}

export const fetchMoreArticles = createAsyncThunk<NewsApiResponse, FetchParams>(
  'moreArticles/fetch',
  async ({ page, query }, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles(page, query);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Some error occurred');
    }
  }
);
