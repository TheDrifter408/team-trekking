import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './services/auth';
import themeReducer from './slices/themeSlice'; // Keep theme reducer if needed
import { mainApi } from './services/main';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    theme: themeReducer, // Keep this if your theme still uses Redux
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware).concat(mainApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
