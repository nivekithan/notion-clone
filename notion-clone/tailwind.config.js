module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
      colors: {
        black: {
          sidebar: "rgb(55, 60, 63)",
          content: "rgb(47, 52, 55)",
        },
        white: {
          1: "rgba(255, 255, 255, 0.9)",
        },
      },
      spacing: {
        sidebar: "16.25rem",
        screen: "100vh",
        cent10: "10%",
        cent20: "20%",
        cent100 : "100%",
        1 : "0.25rem",
        4 : "1rem",
        6 : "1.5rem",
        8 : "2rem",
        px1 : "1px",
    
      },
      maxWidth: {
        sidebar: "16.25rem",
      },
      fontSize : {
        normal : ["1rem", "1.5rem"],
        heading1 : ["1.825rem", "2.5rem"],
        heading2 : ["1.5rem", "1.875rem"],
        heading3 : ["1.25rem", "1.625rem"]
      },
      gap : {
        4 : "1.5rem"
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };