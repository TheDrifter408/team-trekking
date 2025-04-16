import { FontProvider } from '@/lib/context/font-context';
import { ThemeProvider } from '@/lib/context/theme-context.tsx';
import { Provider } from 'react-redux';
import { store } from '@/stores';
import AppRoutes from '@/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageHeaderContextProvider } from '@/lib/context/page-header-context.tsx';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FontProvider>
          <PageHeaderContextProvider>
            <Router>
              <AppRoutes />
            </Router>
          </PageHeaderContextProvider>
        </FontProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
