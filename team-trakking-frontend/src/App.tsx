import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AppRoutes from '../src/routes/index';
import { useEffect } from 'react';
import { useStore } from '@store/zustand';
import { SidebarProvider } from '@/context/SidebarContext.tsx';

function App() {
  const { currentTheme } = useStore();
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      currentTheme || 'light'
    );
  }, [currentTheme]);

  return (
    <Provider store={store}>
      <Router>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </Router>
    </Provider>
  );
}

export default App;
