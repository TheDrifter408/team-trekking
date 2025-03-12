import { useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@store/slices/themeSlice.ts';
import { ThemeType } from '@/types/theme.ts';
import { Text } from '@nabhan/view-module';

const themes: { label: string; value: ThemeType }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Forest', value: 'forest' },
  { label: 'Sunset', value: 'sunset' },
];

export function ThemeToggle() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="flex w-full flex-row items-center justify-between">
      {/* Left-aligned Title */}
      <div className="flex-start">
        <Text variant="h5" weight="bold" className="text-text-primary">
          Team Trakking
        </Text>
      </div>

      {/* Right-aligned Theme Selector */}
      <div className="relative w-auto">
        <select
          value={currentTheme}
          onChange={(e) => dispatch(setTheme(e.target.value as ThemeType))}
          className="bg-bg-tertiary appearance-none rounded-lg py-2 pl-4 pr-10 text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-black"
        >
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value} className="dark:text-white text-black">
              {theme.label}
            </option>
          ))}
        </select>
        {/* Menu Icon positioned at the right end */}
        <Menu className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-text-muted" />
      </div>
    </div>
  );
}
