import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@/types/theme';

interface ThemeState {
  current: ThemeType;
}

const savedTheme = localStorage.getItem('theme') as ThemeType || 'light';

const initialState: ThemeState = {
  current: savedTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.current = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;