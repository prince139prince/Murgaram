/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F6F7FB',
        accent: '#111111',
        dark: {
          DEFAULT: '#0F1115',
          light: '#1A1D23',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'neo': '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
        'neo-dark': '8px 8px 16px #0a0c10, -8px -8px 16px #14171c',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      maxWidth: {
        'mobile': '480px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};