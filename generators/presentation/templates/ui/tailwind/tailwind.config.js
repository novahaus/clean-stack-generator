// tailwind.config.js
module.exports = {
  purge: [
    './source/presentation/pages/**/*.{js,ts,jsx,tsx}',
    './source/presentation/components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
