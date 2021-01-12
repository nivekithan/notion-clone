import { Element, Editor, } from "slate"
import { RenderElementProps } from "slate-react"


export type SlateElement <T> = Element & {
    data : T
}

export type SlateNode <T> = Editor | Text | SlateElement<T>

export type SlateRenderElementProps <T> = RenderElementProps & {
    element : SlateElement<T>
}

