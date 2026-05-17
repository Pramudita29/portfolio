/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
      },
    },
  },

  plugins: [],
};
