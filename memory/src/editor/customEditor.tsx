import {Editor, Path, Node} from "slate";
import {ReactEditor} from "slate-react";

export const CustomEditor = {
    ...Editor,

    isFirst(editor : ReactEditor, path : Path) {
        
        const parent =  Node.parent(editor, path);
        const [_, firstChildPath] = Node.first(editor, ReactEditor.findPath(editor, parent))
 
        if (path === firstChildPath) return true
 
        return false
    },

    isLast (editor : ReactEditor, path : Path) {

        const parent = Node.parent(editor, path);

        const [_, lastChildPath] = Node.last(editor, ReactEditor.findPath(editor, parent))
        console.log("I am inside isLast")
        
        if (path === lastChildPath) return true

        return false
    }
}