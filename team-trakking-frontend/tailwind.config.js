/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'bg-inverted': 'rgb(var(--color-bg-inverted) / <alpha-value>)',
        'text-inverted': 'rgb(var(--color-text-inverted) / <alpha-value>)',
        'text-default': 'rgb(var(--color-text-default) / <alpha-value>)',
        'border-primary': 'rgb(var(--color-border-primary) / <alpha-value>)',
        'border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)',
        'bg-primary-light':
          'rgb(var(--color-bg-primary-light) / <alpha-value>)',
        'text-light': 'rgb(var(--color-text-light) / <alpha-value>)',
        'header-primary': 'rgb(var(--color-primary-header) / <alpha-value>)',
        'header-secondary':
          'rgb(var(--color-secondary-header) / <alpha-value>)',
        'button-hover': 'rgb(var(--color-button-hover) / <alpha-value>)',
        'button-hover-secondary':
          'rgb(var(--color-button-hover-secondary) / <alpha-value>)',
        'text-hover': 'rgb(var(--color-text-hover) / <alpha-value>)',
        'accent-header': 'rgb(var(--color-accent-header) / <alpha-value>)',
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
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
};
