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
      backgroundOpacity: {
        "dp00": "0",
        "dp01": "5%",
        "dp02": "7%",
        "dp04": "9%",
        "dp06": "11%",
        "dp08": "12%",
        "dp12": "14%",
        "dp16": "15%",
        "dp25": "16%",
        "none": "0"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
