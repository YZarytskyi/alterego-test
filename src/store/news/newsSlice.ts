import { Article } from 'types/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticles,
  fetchMoreArticles,
} from './newsThunks';

interface InitialState {
  articles: Article[];
  total: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: null | string;
}

const initialState: InitialState = {
  articles: [],
  total: 0,
  isLoading: false,
  isLoadingMore: false,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    deleteArticle: (state, action) => {
      state.articles = state.articles.filter(
        article => article._id !== action.payload
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload?.response?.docs?.map(article => ({
          ...article,
          _id: article._id.slice(15),
        }));
        state.total = action.payload?.response.meta?.hits;
        state.isLoading = false;
      })
      .addCase(fetchArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        if (action.payload === 'aborted') {
          return
        }
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
    builder
      .addCase(fetchMoreArticles.fulfilled, (state, action) => {
        state.articles = [
          ...state.articles,
          ...action.payload?.response?.docs?.map(article => ({
            ...article,
            _id: article._id.slice(15),
          })),
        ];
        state.total = action.payload?.response.meta?.hits;
        state.isLoadingMore = false;
      })
      .addCase(fetchMoreArticles.pending, state => {
        state.isLoadingMore = true;
      })
      .addCase(fetchMoreArticles.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
        state.isLoadingMore = false;
      });
  },
});

export const { deleteArticle } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
