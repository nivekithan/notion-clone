import React from "react";
import { Editable, ReactEditor } from "slate-react";
import { SlateEditor } from "./slateEditor";



export const onKeyDown = (e : React.KeyboardEvent<HTMLDivElement>, editor : ReactEditor) => {
    const state = calculateState(editor);

    switch (state) {
        case "normal":
            onNormal(e, editor);
            break
        case "number-list":
            onNumberList(e, editor )
            break
    }
}


const onNormal = (e : React.KeyboardEvent<HTMLDivElement> , editor : ReactEditor) => {

    switch (e.key){
        case "Tab":
            e.preventDefault();
            SlateEditor.depthIncrease(editor);
            break
    
    }

}

const onNumberList = (e : React.KeyboardEvent<HTMLDivElement>, editor : ReactEditor) => {
    switch (e.key) {
        case "Enter":
            e.preventDefault();
            SlateEditor.insertBreakNumber(editor)
            break
        case "Tab":
            e.preventDefault();
            SlateEditor.depthIncrease(editor);
            break
    }
}




type State = "normal" | "number-list"


const calculateState = (editor : ReactEditor) : State => {
    const {selection} = editor;

    if (!selection) return "normal"

    const [startNode, ] = SlateEditor.startElement(editor, selection);

    switch(startNode.type) {
        case "number-list":
            return "number-list"
            
        default:
            return "normal"
    }

}