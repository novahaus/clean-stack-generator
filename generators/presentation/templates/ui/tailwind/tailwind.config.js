// tailwind.config.js
module.exports = {
  purge: [
    './source/presentation/pages/**/*.{js,ts,jsx,tsx}',
    './source/presentation/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
