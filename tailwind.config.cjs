/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    extend: {
      animation: {
        'spin-ease': 'spin .9s ease-in-out infinite',
      },
      fontFamily: { poppins: 'Poppins' },
      colors: {
        bg: 'hsla(180, 3%, 7%, 1)',
        'bg-white': 'hsla(0, 0%, 99%, 1)',
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
