import { Editor } from "slate";

export const MyEditor = {
    ...Editor,

    getClassForType(format : string) {

        switch(format) {
            case "heading-1": 
                return "heading-1"
            case "section":
                return "default-text"
            case "numbered-list":
                return "list-decimal list-inside"
            case "unordered-list":
                return "list-disc list-inside"
            case "list-item":
                return "default-text"
            case "block-math-focus":
                return [
                    "math-highlight",
                    "flex",
                    "justify-center",
                ].join(" ")
            case "inline-math-focus":
                return "math-highlight"
            case "bold":
                return "font-semibold"
            case "italic":
                return "italic"
            case "underline":
                return "underline"
            case "highlight":
                return "highlight"
            default:
                return " "
            }
        }
}