import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  token: string;
  email: string;
  error: null | string;
}

const initialState: InitialState = {
  token: '',
  email: '',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload
    },
  },
});

export const { setAuthToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
