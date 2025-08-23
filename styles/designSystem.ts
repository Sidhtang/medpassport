// Design system for MedPassport application
// This file contains design tokens, colors, and theme configuration

// Color palette - Vibrant medical theme
export const colors = {
  // Primary colors
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
  
  // Secondary colors - Vibrant teal
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
  
  // Accent colors - Warm purple for highlights
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
  
  // Success, warning, error, info
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Neutrals
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Background variations
  background: {
    light: '#ffffff',
    subtle: '#f9fafb',
    muted: '#f3f4f6',
    canvas: '#fcfdff',
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

// Spacing system (rem-based)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  'none': 'none',
  // Special medical-themed shadows with brand colors
  'primary-glow': '0 0 15px rgba(12, 179, 255, 0.5)',
  'accent-glow': '0 0 15px rgba(169, 12, 255, 0.5)',
};

// Border radius
export const borderRadius = {
  'none': '0',
  'sm': '0.125rem',
  'DEFAULT': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
};

// Animation timings
export const animation = {
  DEFAULT: '200ms',
  fast: '100ms',
  slow: '300ms',
  slower: '500ms',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

// Z-index scale
export const zIndices = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  drawer: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
};
