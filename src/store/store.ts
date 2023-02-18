import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { newsReducer } from './news/newsSlice';
import { authReducer } from './auth/authSlice'

const rootReducer = combineReducers({
  news: newsReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
