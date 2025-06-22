import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/service/rtkQueries/authQuery.ts';
import { globalApi } from '@/service/rtkQueries/glabalQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiErrorMiddleware } from '@/stores/apiErrorMiddleware.ts';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [globalApi.reducerPath]: globalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        globalApi.middleware,
        apiErrorMiddleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });

  setupListeners(store.dispatch);
  return store;
};

export default configureAppStore;
