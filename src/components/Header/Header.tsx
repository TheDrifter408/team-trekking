import { useState } from 'react';
import { LogOut, Bell, ChevronDown, Search } from "lucide-react";
import { useThemeStore } from '@store/zustand';
import { IconButton, ThemeToggle } from '@/components/index';
import {AppIcons} from '@/assets/icons/Icons.tsx';
import { useAuth } from '@hooks/useAuth.tsx';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setTheme, currentTheme } = useThemeStore();
  const {handleLogout} = useAuth();

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Example of toggling between themes
    setTheme(newTheme);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-500 bg-bg-primary px-4 shadow-sm">
      {/* Logo & App Name */}
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
          {/* Added SVG icon */}
          <AppIcons />
        </div>
        {/* App name now hidden on smaller screens with md:flex class */}
        <span className="hidden text-lg font-semibold text-text-primary md:flex">
          Team Trakking
        </span>
      </div>

      {/* Search Bar - Responsive */}
      <div className="relative flex hidden w-1/3 max-w-sm items-center md:flex">
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search tasks, projects..."
          className="w-full rounded-lg border bg-white py-1.5 pl-9 pr-3 text-sm text-text-default "
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-bg-inverted relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="bg-bg-inverted absolute right-0 mt-2 w-64 rounded-lg shadow-lg">
              <div className="p-3 text-sm text-text-muted">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 rounded-lg bg-bg-secondary p-2 hover:bg-gray-700"
          >
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>

          {showProfileMenu && (
            <div className="bg-bg-inverted absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 shadow-lg dark:border-gray-700">
              <div className="py-2">
                {/* Custom Theme Toggle */}
                <div
                  onClick={handleThemeToggle}
                  className="text-text-inverted flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm hover:bg-bg-secondary hover:text-text-primary"
                >
                  <span>Toggle Theme</span>
                  <ThemeToggle
                    toggleDarkMode={handleThemeToggle}
                  />
                </div>

                {/* Custom Logout Button */}
                <div
                  onClick={handleLogout}
                  className="text-text-inverted flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm hover:bg-bg-secondary hover:text-text-primary"
                >
                  <span className={'text-red-600'}>Logout</span>
                  <IconButton>
                    <LogOut className={'h-4 w-4'} />
                  </IconButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}