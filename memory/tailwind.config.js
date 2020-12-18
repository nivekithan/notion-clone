module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    fontFamily: {
      "serif": ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        mywhite: "#F8F9FA",
        "mygrey-600": "#AEB9CC",
        "mygrey-400": "#B7C2D5",
        "myblack-600": "#565C63",
        "myblack-400": "#7B838E",
        "myblue-400": "#304FD0",
        "myred" : "#EC245B",
      },
      margin: {
        "9%" : "9%",
        "10%": "10%",
        "20%": "20%",
        "25%" : "25%",
        "30%": "30%",
        "40%": "40%",
        "50%" : "50%",
      },
      spacing: {
        s: "8px",
        l: "16px",
        xl: "24px",
        xxl: "36px",
        xxxl: "48px",
        box340: "340px",
        box292: "292px",
        box201: "201px",
        box94: "94px",
        "120px" : "120px",
      },
      fontSize: {
        "10" :"0.625rem" 
      },
      letterSpacing: {
        submit: "10px"
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
    },
  },
  plugins: [],
};
