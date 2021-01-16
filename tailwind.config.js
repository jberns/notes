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
        "00": "0",
        "01": "5%",
        "02": "7%",
        "04": "9%",
        "06": "11%",
        "08": "12%",
        "12": "14%",
        "16": "15%",
        "25": "16%",
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
