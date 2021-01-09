import { Editor, Element, Node,  Transforms } from "slate";
import {ReactEditor} from "slate-react"
import {CustomEditor} from "../customEditor";
export const withMath = (editor : ReactEditor) => {

    const {isInline, isVoid, normalizeNode} = editor

    editor.isVoid = (e) => {
        if (e.type === "inline-math" || e.type === "block-math") {
            return true
        } else {
            return isVoid(e)
        }
    }

    editor.isInline = (e) => {
        return e.type === "inline-math" ? true : isInline(e)
    }


    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        if (Element.isElement(node) && node.type === "inline-math" && Editor.isEditor(Node.parent(editor, path)) ) {
            Transforms.wrapNodes(editor, {type : "normal", children : []}, {
                at : path
            })
            return
        }

        if (Element.isElement(node) && node.type === "inline-math" && CustomEditor.isLast(editor, path)) {
        console.log("I am here")

            const newPath = [...path]

            const lastPath = newPath.pop() as number;
            newPath.push(lastPath + 1)
        

            Transforms.insertNodes(editor, {text : " "}, {at : newPath })
            return
        }

        normalizeNode(entry)
    }
    

    return editor
}