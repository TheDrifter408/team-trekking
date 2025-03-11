export type ThemeType = 'light' | 'dark' | 'forest' | 'sunset';

export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}
