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
    setAuthData(state, action) {
      console.log(action.payload)
      state.token = action.payload.userToken;
      state.email = action.payload.userEmail;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const authReducer = authSlice.reducer;
