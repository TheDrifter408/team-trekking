import { configureStore } from '@reduxjs/toolkit';
import { tmtApi } from '@/service/rtkQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiErrorMiddleware } from '@/stores/apiErrorMiddleware.ts';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [tmtApi.reducerPath]: tmtApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        tmtApi.middleware,
        apiErrorMiddleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });

  setupListeners(store.dispatch);
  return store;
};

export default configureAppStore;
