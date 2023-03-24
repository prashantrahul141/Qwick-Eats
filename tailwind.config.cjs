/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        bg: 'hsla(180, 3%, 7%, 1)',
        bord: 'hsla(180, 2%, 13%, 1)',
        'bord-act': 'hsla(0, 0%, 94%, 1)',
        main: 'hsla(0, 0%, 94%, 1)',
        muted: 'hsla(180, 3%, 59%, 1)',
        disabled: 'hsla(180, 2%, 11%, 1)',
      },
    },
  },
  plugins: [],
};

module.exports = config;
