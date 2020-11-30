

export const Leaf = ({ attributes, leaf, children}) => {
    const leafUtility = [];
  
    if (leaf.bold) {
      leafUtility.push("font-semibold");
    }
  
    if (leaf.italic) {
      leafUtility.push("italic");
    }
  
    if (leaf.underline) {
      leafUtility.push("underline")
    }
  
    if (leaf.highlight) {
          leafUtility.push("highlight")
 
    }
    // prettier-ignore
    return (
    <span {...attributes} className={leafUtility.join(" ")}>{children}</span>
    );
  };
  

  export const Element = ({attributes, element, children}) => {

        
    switch (element.type) {

      case "heading-1": 
        return (
          <h1 {...attributes} >{children}</h1>
        )
      case "heading-5":
        return (
          <h5 {...attributes} >{children}</h5>
        )
        case "numbered-list":
          return (
            <ol {...attributes}>{children}</ol>
          )
        case "unordered-list":
          return (
            <ul {...attributes}>{children}</ul>
          )
          case "block-quote":
            return (
              <blockquote {...attributes}>{children}</blockquote>
            )
            case "list-item":
              return (
                <li {...attributes} >{children}</li>
              )
          default:
            return <p {...attributes} >{children}</p>
    }

  }