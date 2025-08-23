/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7ff',
          100: '#b8eaff',
          200: '#8ddcff',
          300: '#5eceff',
          400: '#36c1ff',
          500: '#0cb3ff', // Main primary color
          600: '#0090e6',
          700: '#006ebd',
          800: '#004c94',
          900: '#002a5c',
        },
        secondary: {
          50: '#e0fafa',
          100: '#b8f0f0',
          200: '#8de6e6',
          300: '#5edcdc',
          400: '#36d2d2',
          500: '#0cc8c8', // Main secondary color
          600: '#00a0a0',
          700: '#007878',
          800: '#005050',
          900: '#002828',
        },
        accent: {
          50: '#f5e0ff',
          100: '#e5b8ff',
          200: '#d68dff',
          300: '#c75eff',
          400: '#b836ff',
          500: '#a90cff', // Main accent color
          600: '#8600e6',
          700: '#6400bd',
          800: '#420094',
          900: '#21005c',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Montserrat"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'primary-glow': '0 0 15px rgba(12, 179, 255, 0.5)',
        'accent-glow': '0 0 15px rgba(169, 12, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
