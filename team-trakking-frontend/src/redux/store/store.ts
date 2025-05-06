import { configureStore } from '@reduxjs/toolkit';
import { tmtApi } from '@/redux/query/rtk-query';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryErrorMiddleware } from '@/redux/store/rtk-query-error-middleware';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [tmtApi.reducerPath]: tmtApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        tmtApi.middleware,
        rtkQueryErrorMiddleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });

  setupListeners(store.dispatch);
  return store;
};

export default configureAppStore;
