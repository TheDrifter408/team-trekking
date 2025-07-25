import tailwindCssAnimate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';

// Use destructuring with fallback to ensure fontFamily is defined
const { fontFamily = { sans: ['apple-system', 'sans-serif'] } } =
  defaultTheme || {};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'slide-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        'slide-up': {
          from: { height: 'var(--radix-collapsible-content-height)'},
          to: { height: '0' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      fontSize: {
        xs: '0.625rem', // 10px
        sm: '0.75rem', // 12px
        base: '0.875rem', // 14px
        lg: '1rem', // 16px
        xl: '1.125rem', // 18px
        '2xl': '1.25rem', // 20px
        '3xl': '1.5rem', // 24px
        '4xl': '2rem', // 30px
        '5xl': '2.25rem', // 36px
        '6xl': '3rem', // 48px
        '7xl': '3.75rem', // 60px
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        theme: {
          DEFAULT: 'var(--theme-main-color)',
          dark: 'var(--theme-primary-dark)',
          main: 'var(--theme-main-color)',
          'secondary-dark': 'var(--theme-secondary-dark)',
          'main-dark': 'var(--theme-main-color-dark)',
          'main-light': 'var(--theme-main-color-light)',
          'content-primary': 'var(--theme-content-primary)',
          'background-subtle': 'var(--theme-background-subtle)',
        },
        content: {
          tertiary: 'var(--content-tertiary)',
          success: 'var(--content-success)',
          default: 'var(--content-default)',
          warning: 'var(--content-warning)',
          danger: 'var(--content-danger)',
          normal: 'var(--content-normal)',
          secondary: 'var(--content-secondary)',
          progress: 'var(--content-progress)',
          'onboarding-secondary': 'var(--content-onboarding-secondary)',
        },
        "workspace-popover": 'var(--workspace-popover-background)',
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'roboto',
        '"Helvetica Neue"',
        'helvetica',
        'arial',
        'sans-serif',
      ],
    },
  },
  plugins: [tailwindCssAnimate],
};
