import { NewsApiResponse, Article } from 'types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    incrementPage: (state) => {
      state.page = state.page + 1      
    },
    deleteArticle: (state, action) => {
      state.articles = state.articles.filter(article => article._id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<NewsApiResponse>) => {
          state.articles = action.payload?.response?.docs?.map(article => ({
            ...article,
            _id: article._id.slice(15),
          }));
          state.total = action.payload?.response.meta?.hits;
        }
      )
      .addCase(fetchArticles.rejected, (state, action: any) => {
        state.error = action.payload;
      });
    builder
      .addCase(
        fetchMoreArticles.fulfilled,
        (state, action: PayloadAction<NewsApiResponse>) => {
          state.articles = [
            ...state.articles,
            ...action.payload?.response?.docs?.map(article => ({
              ...article,
              _id: article._id.slice(15),
            })),
          ];
          state.total = action.payload?.response.meta?.hits;
          state.isLoading = false;
        }
      )
      .addCase(fetchMoreArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMoreArticles.rejected, (state, action: any) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {incrementPage, deleteArticle} = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
