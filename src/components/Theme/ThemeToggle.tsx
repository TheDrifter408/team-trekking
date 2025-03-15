import { useThemeStore } from '@/store/zustand/index';
import { useApplyTheme } from '@/hooks/useTheme';
import { ThemeType } from '@/types/theme.ts';

const themes = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Forest', value: 'forest' },
  { label: 'Sunset', value: 'sunset' },
];

export function ThemeToggle({ isAuthenticated }: { isAuthenticated: boolean }) {
  useApplyTheme();
  const { currentTheme, setTheme } = useThemeStore();
  const availableThemes = isAuthenticated ? themes : themes.slice(0, 2);

  return (
    <select
      value={currentTheme}
      onChange={(e) => setTheme(e.target.value as ThemeType)}
      className="bg-bg-tertiary rounded-lg py-2 pl-4 pr-10 text-text-primary shadow-sm"
    >
      {availableThemes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.label}
        </option>
      ))}
    </select>
  );
}
