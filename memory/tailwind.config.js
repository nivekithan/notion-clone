module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: {
        sidebar: {
          normal: "rgb(55, 60, 63)",
          onHover: "rgb(71, 76, 80)",
        },
        main: {
          normal: "rgb(47,52,55)",
        },
      },
      white: {
        "100": "rgba(255, 255, 255, 0.6)",
        "200": "rgba(255, 255, 255, 0.9)",
        white: "rgb(255,255,255)",
      },
      blue: {
        primary: "rgb(46, 170, 220)",
        secondary: "rgb(6,156,205)",
      },
    },
    boxShadow: {
      button:
        "rgba(15, 15, 15, 0.2) 0px 0px 0px 1px inset, rgba(15, 15, 15, 0.1) 0px 1px 2px",
    },
    maxWidth: {
      "260": "260px",
    },

    borderRadius: {
      button: "28px",
      full: "9999px",
    },

    extend: {
      spacing: {
        "14-px": "14px",
        "2-px": "2px",
        "260-px": "260px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
