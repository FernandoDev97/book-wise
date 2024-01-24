import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      nunito: ['var(--font-nunito)', 'sans-serif'],
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'logo-section-bg': 'url(/images/logo-section-bg.png)',
      },
    },
  },
  plugins: [],
}
export default config
