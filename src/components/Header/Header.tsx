import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@store/slices/authSlice.ts';
import { ThemeToggle } from '../Theme/ThemeToggle.tsx';

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-end border-b bg-bg-primary px-4 shadow-sm">
      <div className="flex items-center space-x-4 w-full">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}