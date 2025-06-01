import { ThemeProvider } from '@/lib/context/theme-context.tsx';
import { Provider } from 'react-redux';
import configureAppStore from '@/stores/store.ts';
import AppRoutes from '@/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageHeaderContextProvider } from '@/lib/context/page-header-context.tsx';

function App() {
  const store = configureAppStore();
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
