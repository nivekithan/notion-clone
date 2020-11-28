import {Editor} from "slate";


export const Leaf = ({ attributes, leaf, children, editor }) => {
    const leafUtility = [];
  
    if (leaf.bold) {
      leafUtility.push("font-semibold");
    }
  
    if (leaf.italic) {
      leafUtility.push("italic");
    }
  
    if (leaf.code) {
      if (leaf.highlight) {
        Editor.removeMark(editor, "highlight")
      }
      leafUtility.push("code")
    }
  
    if (leaf.underline) {
      leafUtility.push("underline")
    }
  
    if (leaf.highlight) {
      if (!leaf.code) {
          leafUtility.push("highlight")
      }
    }
    // prettier-ignore
    return (
    <span {...attributes} className={leafUtility.join(" ")}>{children}</span>
    );
  };
  