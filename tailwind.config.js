const colors = require('tailwindcss/colors');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        secondary: colors.slate,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
