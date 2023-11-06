/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        default: {
          100: 'hsl(240 5% 96%)',
          200: 'hsl(240 6% 90%)',
          300: 'hsl(240 5% 84%)',
          400: 'hsl(240 5% 65%)',
          500: 'hsl(240 4% 46%)',
          600: 'hsl(240 5% 34%)',
          700: 'hsl(240 5% 26%)',
          800: 'hsl(240 4% 16%)',
          900: 'hsl(240 6% 10%)'
        },
        primary: {
          50: 'var(--primary-color-50)',
          100: 'var(--primary-color-100)',
          200: 'var(--primary-color-200)',
          300: 'var(--primary-color-300)',
          400: 'var(--primary-color-400)',
          500: 'var(--primary-color-500)',
          600: 'var(--primary-color-600)',
          700: 'var(--primary-color-700)',
          800: 'var(--primary-color-800)',
          900: 'var(--primary-color-900)',
          950: 'var(--primary-color-950)'
        }
      }
    }
  },
  plugins: []
}
