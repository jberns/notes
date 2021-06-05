module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "./layouts/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#121212",
          dp00: "#121212",
          dp01: "#1E1E1E",
          dp02: "#232323",
          dp03: "#252525",
          dp04: "#272727",
          dp06: "#2C2C2C",
          dp08: "#2E2E2E",
          dp12: "#333333",
          dp16: "#363636",
          dp25: "#383838",
        },
      },
      opacity: {
        "h-emp": "87%",
        "l-emp": "50%",
        disabled: "38%",
      },
      backgroundOpacity: {
        dp00: "0",
        dp01: "5%",
        dp02: "7%",
        dp04: "9%",
        dp06: "11%",
        dp08: "12%",
        dp12: "14%",
        dp16: "15%",
        dp25: "16%",
        none: "0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
