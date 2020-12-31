module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      "grey" : {
        primary : "#f7f6f3"
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
