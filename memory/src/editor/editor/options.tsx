import { MatchSorterInitiator } from "src/lib";

export const options: MatchSorterInitiator = [
  {
    value: {
      name: "heading",
      label: "Heading",
      onOptionClick: (e) => {
        e.preventDefault();
        console.log("heading");
      },
    },
    search: ["heading", "h1"],
  },
  {
    value: {
      name: "Inline Math",
      label: "Math",
      onOptionClick: (e) => {
        e.preventDefault();
        console.log("Math");
      },
    },
    search: ["Math", "inline-math", "inline"],
  },
  {
    value: {
      name: "Block Math",
      label: "Advanced Math",
      onOptionClick: (e) => {
        e.preventDefault();
        console.log("Block Math");
      },
    },
    search: ["Math", "block math", "katex"],
  },
];
