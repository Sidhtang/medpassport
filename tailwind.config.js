/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Medical blue palette - calming and trustworthy
        'primary': {
          '50': '#EFF6FF',  // Very light blue background
          '100': '#DBEAFE', // Light blue
          '200': '#BFDBFE', // Light blue hover
          '300': '#93C5FD', // Blue accent
          '400': '#60A5FA', // Medium blue
          '500': '#3B82F6', // Main blue color
          '600': '#2563EB', // Darker blue for hover
          '700': '#1D4ED8', // Darker blue for active states
          '800': '#1E40AF', // Very dark blue
          '900': '#1E3A8A', // Very dark blue for text
        },
        // Healing green palette - for success states and health indicators
        'healing': {
          '50': '#ECFDF5', 
          '100': '#D1FAE5', 
          '200': '#A7F3D0', 
          '300': '#6EE7B7', 
          '400': '#34D399', 
          '500': '#10B981', // Main green
          '600': '#059669', // Dark green
          '700': '#047857', 
          '800': '#065F46', 
          '900': '#064E3B',
        },
        // Urgent/warning palette - for critical info
        'urgent': {
          '50': '#FEF2F2', 
          '100': '#FEE2E2', 
          '200': '#FECACA', 
          '300': '#FCA5A5', 
          '400': '#F87171', 
          '500': '#EF4444', // Main red
          '600': '#DC2626', 
          '700': '#B91C1C', 
          '800': '#991B1B', 
          '900': '#7F1D1D',
        },
        // Calm mint - a healthcare-specific accent color
        'mint': {
          '50': '#F0FDFA', 
          '100': '#CCFBF1', 
          '200': '#99F6E4', 
          '300': '#5EEAD4', 
          '400': '#2DD4BF', 
          '500': '#14B8A6', 
          '600': '#0D9488', 
          '700': '#0F766E', 
          '800': '#115E59', 
          '900': '#134E4A',
        },
        'neutral': {
          '50': '#FAFAFA', // Background color
          '100': '#F5F5F5', // Light gray for cards
          '200': '#E5E5E5', // Border color
          '300': '#D4D4D4',
          '400': '#A3A3A3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
        },
        'text': {
          'dark': '#1E3A8A', // Medical blue text
          'muted': '#525252', // Secondary text color
          'light': '#A3A3A3', // Tertiary text color
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'primary-glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        'healing-glow': '0 0 15px rgba(16, 185, 129, 0.5)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
