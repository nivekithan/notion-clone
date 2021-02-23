import { DropResult } from "react-beautiful-dnd";
import { Path } from "slate";
import { ReactEditor } from "slate-react";
import { findPathByDevtoolsId } from "./findPathById";


export const  giveSrcAndDest = (editor : ReactEditor, res : DropResult) : [Path, Path] | void => {
    const {source : src, destination : dest} = res;

    if (!dest) return


    const srcPath : Path = [...(src.droppableId === "editor" ? [] : findPathByDevtoolsId(editor, src.droppableId.replace("_droppable", "") )), src.index];
    const destPath : Path = [...(dest.droppableId === "editor" ? [] : findPathByDevtoolsId(editor, dest.droppableId.replace("_droppable", "") )), dest.index]

    return [srcPath, destPath]
}

