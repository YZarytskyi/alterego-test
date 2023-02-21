import { newsApi } from 'api/newsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsApiResponse } from 'types/types';

interface FetchArticlesParams {
  query: string;
  signal: AbortSignal;
}

export const fetchArticles = createAsyncThunk<NewsApiResponse, FetchArticlesParams>(
  'articles/fetchAll',
  async ({query, signal}, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles(0, query, signal);
    } catch (error) {
      if (signal.aborted) {
        return rejectWithValue('aborted')
      }
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({message: 'Some error occurred'});
    }
  }
);

interface FetchMoreArticlesParams {
  page: number;
  query: string;
}

export const fetchMoreArticles = createAsyncThunk<NewsApiResponse, FetchMoreArticlesParams>(
  'moreArticles/fetch',
  async ({ page, query }, { rejectWithValue }) => {
    try {
      return await newsApi.getArticles(page, query);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
      return rejectWithValue({message: 'Some error occurred'});
    }
  }
);
