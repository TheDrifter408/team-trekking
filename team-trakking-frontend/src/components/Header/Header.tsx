import { useState } from 'react';
import { LogOut, Bell, ChevronDown, Search } from 'lucide-react';
import { useThemeStore } from '@store/zustand';
import { ThemeToggle, Button } from '@/components/index';
import { Text } from '@library/components';
import { AppIcons } from '@/assets/icons/Icons.tsx';
import { useAuth } from '@hooks/useAuth.tsx';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { setTheme, currentTheme } = useThemeStore();
  const { handleLogout } = useAuth();

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Example of toggling between themes
    setTheme(newTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between  bg-bg-primary px-4 shadow-sm">
      {/* Logo & App Name */}
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
          {/* Added SVG icon */}
          <AppIcons />
        </div>
        {/* App name now hidden on smaller screens with md:flex class */}
        <Text className="hidden font-semibold text-text-primary md:flex">
          Team Trakking
        </Text>
      </div>

      {/* Search Bar - Responsive */}
      <div className="relative flex hidden w-1/3 max-w-sm items-center md:flex">
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search tasks, projects..."
          className="w-full rounded-lg border bg-white py-1 pl-9 pr-3 text-sm text-text-default "
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            size={'sm'}
            variant={'outline'}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg bg-bg-inverted justify-center  h-auto w-auto text-gray-600 hover:bg-gray-100"
          >
            <Bell className={'h-3 w-3'} />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-red-500"></span>
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg bg-bg-inverted shadow-lg">
              <div className="p-3 text-sm text-text-muted">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <Button
            size={'sm'}
            variant={'outline'}
            rightIcons={[
              {
                icon: (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                ),
              },
            ]}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className=" flex w-auto items-center rounded-lg bg-bg-secondary  hover:bg-gray-700"
          >
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Avatar"
              className="h-5 w-5 rounded-5"
            />
          </Button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-bg-inverted shadow-lg dark:border-gray-700">
              <div className="py-2">
                {/* Custom Theme Toggle */}
                <div
                  onClick={handleThemeToggle}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm text-text-inverted hover:bg-tertiary hover:text-text-primary"
                >
                  <span>Toggle Theme</span>
                  <ThemeToggle toggleDarkMode={handleThemeToggle} />
                </div>

                {/* Custom Logout Button */}
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm text-text-inverted hover:bg-tertiary hover:text-text-primary"
                >
                  <span className={'text-red-600'}>Logout</span>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className={
                      'rounded-5 bg-bg-primary-light text-text-primary'
                    }
                  >
                    <LogOut className={'h-4 w-4'} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
