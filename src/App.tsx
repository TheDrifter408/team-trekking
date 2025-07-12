import { ThemeProvider } from '@/lib/context/theme-context.tsx';
import { Provider } from 'react-redux';
import configureAppStore from '@/stores/store.ts';
import { PageHeaderContextProvider } from '@/lib/context/page-header-context.tsx';
import { Toaster } from '@/components/shadcn-ui/sonner';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from '@tanstack/react-router';
import { createRouter } from '@/router';

const router = createRouter();

function App() {
  const { store, persistor } = configureAppStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Toaster />
          <PageHeaderContextProvider>
            <RouterProvider router={router} />
          </PageHeaderContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
