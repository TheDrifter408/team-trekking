import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTheme } from './themeSlice';
import { AppDispatch } from '../index';

interface AuthState {
  user: {
    id: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: { id: string; email: string }; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('theme');
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(clearAuth());
  dispatch(setTheme('light')); // Reset theme to light on logout
};

export default authSlice.reducer;