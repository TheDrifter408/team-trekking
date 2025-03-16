import { MoonIcon, SunIcon } from '@/assets/icons/Icons.tsx';
import { IconButton } from '@/components';
import {ThemeToggleProps} from '@/types/Props.ts';
import { useThemeStore } from '@store/zustand';


export const ThemeToggle = ({toggleDarkMode}:ThemeToggleProps) => {
  const { currentTheme } = useThemeStore();
  const darkMode = currentTheme === 'dark';

  return (
    <>
      <IconButton
        onClick={toggleDarkMode}
        className={`rounded-5 ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-50 text-gray-700'}`}
        ariaLabel={'theme'}
      >
        {
          darkMode ? (
            <SunIcon/>
          ) : (
            <MoonIcon/>
          )
        }
      </IconButton>
    </>
  )
}
