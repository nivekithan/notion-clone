import "../src/tailwind/output.css"
import 'katex/dist/katex.min.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds : {
    default : "notion",
    values : [
      {
        name : "notion",
        value : "rgb(47,52,55)"
      },
      {
        name : "white",
        value : "#fff"
      }
    ]
  }
}