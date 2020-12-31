module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      "black" : {
        primary : "rgb(55, 60, 63)",
        secondary : "rgb(71, 76, 80)"
      },
      "white" : {
        "100" : "rgba(255, 255, 255, 0.6)",
        "200" : "rgba(255, 255, 255, 0.9)",

      }
    },
    maxWidth : {
      "260" : "260px"
    }
    ,extend: {
      spacing : {
       "14-px" : "14px",
       "2-px" : "2px",
       "260-px" : "260px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
