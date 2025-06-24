import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/service/rtkQueries/authQuery.ts';
import { globalApi } from '@/service/rtkQueries/globalQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiErrorMiddleware } from '@/stores/apiErrorMiddleware.ts';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistConfig = {
  key: 'api-persistor',
  storage,
  whitelist: [globalApi.reducerPath],
};

const rootReducer = {
  [authApi.reducerPath]: persistReducer(persistConfig, authApi.reducer),
  [globalApi.reducerPath]: persistReducer(persistConfig, globalApi.reducer),
};

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // required for redux-persist
      }).concat([authApi.middleware, globalApi.middleware, apiErrorMiddleware]),
    devTools: process.env.NODE_ENV === 'development',
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureAppStore;
