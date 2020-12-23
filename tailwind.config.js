module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "happy-dog": "url('./images/happy-dog.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
