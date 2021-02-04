import { Node } from "slate";
import { ReactEditor } from "slate-react";


export const useSelectedFragment = (editor : ReactEditor) => {
    const {selection} = editor;

    if (!selection) return;

    const fragment = Node.fragment(editor, selection);
    return fragment;

}