import { ThemeProvider } from '@/lib/context/theme-context.tsx';
import { Provider } from 'react-redux';
import configureAppStore from '@/stores/store.ts';
import AppRoutes from '@/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageHeaderContextProvider } from '@/lib/context/page-header-context.tsx';
import { Toaster } from './components/ui/sonner';

/// <reference types="vite-plugin-svgr/client" />

function App() {
  const store = configureAppStore();
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <PageHeaderContextProvider>
          <Router>
            <AppRoutes />
          </Router>
        </PageHeaderContextProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
