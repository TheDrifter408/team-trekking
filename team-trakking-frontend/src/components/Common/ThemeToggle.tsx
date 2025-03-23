import { MoonIcon, SunIcon } from '@/assets/icons/Icons.tsx';
import { Button } from '@/components';
import { ThemeToggleProps } from '@/types/Props.ts';
import { useStore } from '@store/zustand';

export const ThemeToggle = ({ toggleDarkMode }: ThemeToggleProps) => {
  const { currentTheme } = useStore();
  const darkMode = currentTheme === 'dark';

  return (
    <>
      <Button
        variant={'ghost'}
        size={'sm'}
        onClick={toggleDarkMode}
        className={`rounded-5 hover:scale-105 ${darkMode ? 'bg-bg-primary-light text-yellow-300' : 'bg-gray-100 text-text-inverted'}`}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
};
