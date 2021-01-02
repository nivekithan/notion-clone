import { useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";

export const editor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [slateValue, setSlateValue] = useState<Node[]>([]);
    

    return (
        <Slate value={slateValue} editor={editor} onChange={(n) => setSlateValue(n)}>
            <Editable />
        </Slate>
    )
}


