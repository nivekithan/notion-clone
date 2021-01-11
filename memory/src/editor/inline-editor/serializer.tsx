import { Text, Node } from "slate"
import TeX from "@matejmazur/react-katex"

type SerialiseInlineEditorProps = {
    node : Node
}


export const SerialiseInlineEditor = ({node} : SerialiseInlineEditorProps) => {
    if (Text.isText(node)) {
        return <span className="text-white-white" >{node.text}</span>
    }
    
    
    const children = node.children.map((n, i) => <SerialiseInlineEditor node={n} key={i} />)

    switch(node.type) {
        case "normal" :
            return <div>{children}</div>
        case "inline-math":
            return <TeX math={Node.string(node)} className="px-1 text-white-white" />
        default:
            return <div>{children}</div>
    }

    
}