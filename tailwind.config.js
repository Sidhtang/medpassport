/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1a56db',
        'primary-dark': '#1e429f',
        'secondary': '#14b8a6',
        'secondary-dark': '#0d9488',
        'accent': '#8b5cf6',
        'accent-dark': '#7c3aed',
        'danger': '#ef4444',
        'success': '#22c55e',
        'warning': '#f59e0b',
      },
    },
  },
  plugins: [],
}
