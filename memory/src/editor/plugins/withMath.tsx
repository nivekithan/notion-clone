import { Editor, Element, Node, Transforms } from "slate";



export const withMath = (editor : Editor) => {

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

        normalizeNode(entry)
    }
    

    return editor
}