import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './app/**/*.{vue,ts,js}',
    './components/**/*.{vue,ts,js}',
    './layouts/**/*.{vue,ts,js}',
    './pages/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#18181B',
        'on-primary': '#FFFFFF',
        secondary: '#27272A',
        accent: '#F8FAFC',
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        destructive: '#EF4444',
        ring: '#18181B',

        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        'elevated-secondary': 'var(--color-elevated-secondary)',
        'on-elevated': 'var(--color-on-elevated)',
        subtle: 'var(--color-text-subtle)',
        'muted-text': 'var(--color-text-muted)',
        inverse: 'var(--color-inverse)',
        'on-inverse': 'var(--color-on-inverse)',

        brand: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      boxShadow: {
        'bento': '0 4px 24px -4px rgba(0,0,0,0.5)',
        'bento-hover': '0 12px 32px -4px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
        'glow': '0 0 30px rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-gradient': 'var(--glass-gradient)',
      }
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config
