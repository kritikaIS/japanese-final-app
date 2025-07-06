/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'palette-1': '#42647A', // dark blue-gray
        'palette-2': '#D3E1EA', // very light blue
        'palette-3': '#A6C0D2', // light blue
        'palette-4': '#7EA6C2', // medium blue
        'palette-5': '#395062', // dark blue
        'palette-6': '#26323B', // very dark blue
        'palette-cream': '#E5DCC3', // slightly darker cream for banners
      },
    },
  },
  darkMode: 'class', // set dark mode to class
  plugins: [],
};
