import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import AppRoutes from '../src/routes/index';
import { useEffect } from 'react';
import { useStore } from '@store/zustand';

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
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
