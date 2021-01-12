import {ReactEditor} from "slate-react"


export const withQuestions = (editor : ReactEditor) => {
    const {isVoid }= editor;

    const QUESTION_VOID = ["mcq"]

    editor.isVoid = (node) => {
        return QUESTION_VOID.includes(node.type as string) ? true : isVoid(node)
    }

    return editor
}