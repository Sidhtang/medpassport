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
          '50': '#EBF5FF',
          '100': '#E1EFFE',
          '200': '#C3DDFD',
          '300': '#A4CAFE',
          '400': '#76A9FA',
          '500': '#1A94E5', // Main blue color
          '600': '#1C64F2', // Darker blue for hover states
          '700': '#1A56DB', // Darker blue for active states
          '800': '#1E429F', // Very dark blue for sidebar
          '900': '#233876', // Very dark blue for sidebar gradient
        },
        'success': {
          '50': '#F0FDF4',
          '100': '#DCFCE7',
          '200': '#BBF7D0',
          '300': '#86EFAC',
          '400': '#4ADE80',
          '500': '#22C55E', // Main green color
          '600': '#16A34A', // Darker green for hover states
          '700': '#15803D', // Darker green for active states
          '800': '#166534',
          '900': '#14532D',
        },
        'neutral': {
          '50': '#F8FAFC', // Background color
          '100': '#F1F5F9', // Light gray for buttons
          '200': '#E2E8F0', // Border color
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A',
        },
        'text': {
          'dark': '#0F172A', // Main text color
          'muted': '#475569', // Secondary text color
          'light': '#94A3B8', // Tertiary text color
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
