import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void:   '#0a0a0a',
        ink:    '#111111',
        smoke:  '#1a1a1a',
        ash:    '#2a2a2a',
        mist:   '#8a8a8a',
        chalk:  '#e8e8e8',
        violet: {
          DEFAULT: '#14b8a6',
          light: '#2dd4bf',
          dark: '#0d9488',
        },
        indigo: {
          DEFAULT: '#0d9488',
        },
        gold: '#f59e0b',
        glow: '#2dd4bf',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'hero-xl': ['clamp(3.5rem, 10vw, 9rem)',  { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'hero-lg': ['clamp(2.5rem, 7vw, 6rem)',   { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 4rem)',      { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'label':   ['0.75rem',                     { lineHeight: '1',    letterSpacing: '0.15em'  }],
      },
      backgroundImage: {
        'gradient-void':   'radial-gradient(ellipse 80% 50% at 50% -20%, #0a2e2a 0%, #0a0a0a 70%)',
        'gradient-violet': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-gold':   'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow':   'spin 20s linear infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
