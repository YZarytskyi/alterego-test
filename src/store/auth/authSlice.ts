import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  token: string;
  email: string;
}

const initialState: InitialState = {
  token: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.userToken;
      state.email = action.payload.userEmail;
    },
    logout(state) {
      state.token = '';
      state.email = '';
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
