module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
    
        "mywhite": "#F8F9FA",
        "mygrey-600": "#AEB9CC",
        "mygrey-400": "#B7C2D5",
        "myblack-600" : "#565C63",
        "myblack-400" : "#7B838E",
        "myblue-400": "#304FD0"
      },
      margin: {
        "10%" : "10%",
        "20%" : "20%",
        "30%" : "30%",
        "40%" : "40%"
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"]
    }
  },
  plugins: [],
};
