import { MoonIcon, SunIcon } from '@/assets/icons/Icons.tsx';
import { Button } from '@/components';
import { ThemeToggleProps } from '@/types/Props.ts';
import { useStore } from '@store/zustand';

export const ThemeToggle = ({ toggleDarkMode }: ThemeToggleProps) => {
  const { currentTheme } = useStore();
  const darkMode = currentTheme === 'light';

  return (
    <>
      <Button
        variant={'ghost'}
        size={'sm'}
        onClick={toggleDarkMode}
        className={` rounded-5 h-4 w-4 hover:scale-105 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-bg-secondary text-text-inverted'}`}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
};
