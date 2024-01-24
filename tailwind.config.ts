import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      nunito: ['var(--font-nunito)', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'green-100': '#50B2C0',
        'green-200': '#255D6A',
        'green-300': '#0A313C',
        'purple-100': '#8381D9',
        'purple-200': '#2A2879',
        'gray-100': '#F8F9FC',
        'gray-200': '#E6E8F2',
        'gray-300': '#D1D6E4',
        'gray-400': '#8D95AF',
        'gray-500': '#303F73',
        'gray-600': '#252D4A',
        'gray-700': '#181C2A',
        'gray-800': '#0E1116',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'logo-section-bg': 'url(/images/logo-section-bg.png)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
