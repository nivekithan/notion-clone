import { Text, Node } from "slate"
import TeX from "@matejmazur/react-katex"

export const serialiseInlineEditor = (node : Node) => {
    if (Text.isText(node)) {
        return <span className="text-white-white" >{node.text}</span>
    }
    
    
    const children = node.children.map(n => serialiseInlineEditor(n))

    switch(node.type) {
        case "normal" :
            return <div>{children}</div>
        case "inline-math":
            return <TeX math={Node.string(node)} className="text-white-white" />
        default:
            return <div>{children}</div>
    }

    
}