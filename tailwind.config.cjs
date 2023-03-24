/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        bg: '#121313',
        bord: '#192a2a',
        'bord-act': '#f0f0f0',
        main: '#f0f0f0',
        muted: 'rgb(147,154,154)',
        disabled: '#1c1d1d',
      },
    },
  },
  plugins: [],
};

module.exports = config;
