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
        sans: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'ink': 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'muted-ink': 'var(--muted)',
        'bg': 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'line': 'var(--line)',
        'accent': 'var(--accent)',
        'lime': 'var(--lime)',
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config
