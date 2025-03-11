import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Home,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Trees,
  Sunset,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { logout } from '@/store/slices/authSlice';
import { setTheme } from '@/store/slices/themeSlice';
import type { RootState } from '@/store/index';
import type { ThemeType } from '@/store/slices/themeSlice';

// Types
interface SidebarProps {
  isCollapsed: boolean;
}

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

interface ThemeOption {
  type: ThemeType;
  icon: React.ReactNode;
  label: string;
}

// Component
export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  // Hooks
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.current);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation items
  const navItems: NavItem[] = [
    { path: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Workspaces' },
    { path: '/profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
    { path: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];

  // Theme options
  const themes: ThemeOption[] = [
    { type: 'light', icon: <Sun className="h-5 w-5 text-text" />, label: 'Light' },
    { type: 'dark', icon: <Moon className="h-5 w-5 text-text" />, label: 'Dark' },
    { type: 'forest', icon: <Trees className="h-5 w-5 text-text" />, label: 'Forest' },
    { type: 'sunset', icon: <Sunset className="h-5 w-5 text-text" />, label: 'Sunset' },
  ];

  // Get current theme data
  const currentThemeData = themes.find(theme => theme.type === currentTheme);

  // Handle outside clicks for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Event handlers
  const handleLogout = (): void => {
    dispatch(logout());
  };

  const toggleThemeDropdown = (): void => {
    setIsThemeDropdownOpen(prev => !prev);
  };

  const selectTheme = (themeType: ThemeType): void => {
    dispatch(setTheme(themeType));
    setIsThemeDropdownOpen(false);
  };

  // Render methods
  const renderNavItems = (): React.ReactNode => {
    return navItems.map(({ path, icon, label }) => (
      <li key={path}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg transition-colors no-underline ${
              isActive ? 'bg-primary text-white' : 'hover:bg-primary/10'
            }`
          }
        >
          {icon}
          <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>{label}</span>
        </NavLink>
      </li>
    ));
  };

  const renderThemeOptions = (): React.ReactNode => {
    return themes.map(({ type, icon, label }) => (
      <button
        key={type}
        onClick={() => selectTheme(type)}
        className={`w-full text-text flex items-center p-2 hover:bg-primary/10 transition-colors ${
          currentTheme === type ? 'bg-primary/20' : ''
        }`}
      >
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </button>
    ));
  };

  return (
    <div className="justify-between bg-surface p-4 flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <h1 className={`text-2xl font-bold text-primary ${isCollapsed ? 'hidden' : 'block'}`}>
          App Logo
        </h1>
        {isCollapsed && <Home className="h-8 w-8 text-primary" />}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2 p-1">{renderNavItems()}</ul>
      </nav>

      {/* Footer with Theme & Logout */}
      <div className="mt-auto">
        {/* Theme dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={toggleThemeDropdown}
            className="w-full text-text flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-expanded={isThemeDropdownOpen}
            aria-haspopup="true"
            aria-label="Theme selection"
          >
            <div className="flex items-center">
              {currentThemeData?.icon}
              {!isCollapsed && <span className="ml-3">Theme</span>}
            </div>
            {!isCollapsed &&
              (isThemeDropdownOpen ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              ))}
          </button>

          {/* Dropdown menu */}
          {isThemeDropdownOpen && (
            <div
              className={`absolute ${isCollapsed ? 'left-full ml-2' : 'left-0 right-0'} bottom-full mb-1 bg-surface rounded-lg shadow-lg border border-border z-10 py-1`}
              role="menu"
              aria-orientation="vertical"
            >
              {renderThemeOptions()}
            </div>
          )}
        </div>

        {/* Logout button */}
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

    </div>
  );
};
