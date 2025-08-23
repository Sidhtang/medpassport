/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '500': '#1A94E5', // Main blue color
          '600': '#1585D0', // Darker blue for hover states
          '700': '#0D5F94', // Darker blue for active states
          '800': '#0A4A73', // Very dark blue for sidebar
          '900': '#06304D', // Very dark blue for sidebar gradient
        },
        'neutral': {
          '50': '#F7FAFC', // Background color
          '100': '#E8EDF2', // Light gray for buttons
          '200': '#D1DEE8', // Border color
        },
        'text': {
          'dark': '#0D171C', // Main text color
          'muted': '#4F7A96', // Secondary text color
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'primary-glow': '0 0 10px rgba(26, 148, 229, 0.4)',
      },
    },
  },
  plugins: [],
}
