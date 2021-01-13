module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          primary: "#121212",
        },
      },
      opacity: {
        "h-emp": "87%",
        "l-emp": "50%",
        disabled: "38%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
