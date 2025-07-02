import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/service/rtkQueries/authQuery.ts';
import { workspaceApi } from '@/service/rtkQueries/workspaceQuery.ts';
import { spaceApi } from '@/service/rtkQueries/spaceQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiErrorMiddleware } from '@/stores/apiErrorMiddleware.ts';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { folderApi } from '@/service/rtkQueries/folderQuery';
import { taskApi } from '@/service/rtkQueries/taskQuery.ts';
import { listApi } from '@/service/rtkQueries/listQuery';

const persistConfig = {
  key: 'api-persistor',
  storage,
  whitelist: [workspaceApi.reducerPath],
};

const rootReducer = {
  [authApi.reducerPath]: persistReducer(persistConfig, authApi.reducer),
  [spaceApi.reducerPath]: persistReducer(persistConfig, spaceApi.reducer),
  [workspaceApi.reducerPath]: persistReducer(
    persistConfig,
    workspaceApi.reducer
  ),
  [folderApi.reducerPath]: persistReducer(persistConfig, folderApi.reducer),
  [taskApi.reducerPath]: persistReducer(persistConfig, taskApi.reducer),
  [listApi.reducerPath]: persistReducer(persistConfig, listApi.reducer),
};

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // required for redux-persist
      }).concat([
        authApi.middleware,
        workspaceApi.middleware,
        spaceApi.middleware,
        folderApi.middleware,
        taskApi.middleware,
        listApi.middleware,
        apiErrorMiddleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });

  setupListeners(store.dispatch);

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureAppStore;
