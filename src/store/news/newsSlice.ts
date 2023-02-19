import { Article } from 'types/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArticles, fetchMoreArticles } from './newsThunks';

interface InitialState {
  articles: Article[];
  total: number;
  page: number;
  isLoading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  articles: [],
  total: 0,
  page: 0,
  isLoading: false,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    incrementPage: state => {
      state.page = state.page + 1;
    },
    setFirstPage: state => {
      state.page = 0;
      state.articles = state.articles.slice(0, 10);
    },
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
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
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
        state.isLoading = false;
      })
      .addCase(fetchMoreArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMoreArticles.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  },
});

export const { incrementPage, setFirstPage, deleteArticle } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
