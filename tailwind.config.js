/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0a0e27',
          mid: '#16213e',
          light: '#1a1a2e',
        },
        accent: {
          cyan: '#00f5d4',
          green: '#4ade80',
          purple: '#9333ea',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['"Google Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'card': 'rgba(22, 33, 62, 0.6)',
        'card-hover': 'rgba(22, 33, 62, 0.8)',
      }
    },
  },
  plugins: [],
}
