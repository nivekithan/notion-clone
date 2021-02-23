import { nanoid } from "nanoid";
import { Editor, Element, Node, Text, Transforms } from "slate";
import { DevEditor } from "./node";

export function withJSX<T extends Editor>(editor: T): T {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      !DevEditor.isEditor(node) &&
      (!node.devtools_depth || node.devtools_depth !== path.length - 1)
    ) {
      Transforms.setNodes(
        editor,
        { devtools_depth: path.length - 1 },
        { at: path }
      );
    }

    if (!DevEditor.isEditor(node) && !node.devtools_id) {
      Transforms.setNodes(editor, { devtools_id: nanoid() }, { at: path });
    }

    if (
      (!DevEditor.isEditor(node) && !node.devtools_index) ||
      node.devtools_id !== path[path.length - 1]
    ) {
      Transforms.setNodes(editor, { devtools_index: path[path.length - 1] }, {at : path});
    }

    // // Checking  first node in whole editor has devtools_index 1

    // if (
    //   !DevEditor.isEditor(node) &&
    //   path.length === 1 &&
    //   path[0] === 0 &&
    //   !node.devtools_index
    // ) {
    //   Transforms.setNodes(editor, { devtools_index: 1 }, { at: path });
    // }

    // // Checking if the node is first child of a node and making sure that its not first node in whole editor
    // if (
    //   !DevEditor.isEditor(node) &&
    //   path[path.length - 1] === 0 &&
    //   path.length !== 1 &&
    //   // Checking if the devtools_index is plus one of the devtools_index of its parent

    //   Node.parent(editor, path).devtools_index !==
    //     (node.devtools_index as number) - 1
    // ) {
    //   console.group("First Child");
    //   console.log({ node });
    //   const { devtools_index } = Node.parent(editor, path);
    //   console.log({ devtools_index });
    //   Transforms.setNodes(
    //     editor,
    //     { devtools_index: (devtools_index as number) + 1 },
    //     { at: path }
    //   );
    //   console.log(Node.get(editor, path));
    //   console.groupEnd();
    // }

    // if (
    //   !DevEditor.isEditor(node) &&
    //   path[path.length - 1] !== 0 &&
    //   findLastIndex(
    //     Node.get(editor, [...path.slice(0, -1), path[path.length - 1] - 1])
    //   ) +
    //     1 !==
    //     node.devtools_index
    // ) {
    //   console.group("Other Child");
    //   console.log({node})
    //   console.log({
    //     lastIndex: findLastIndex(
    //       Node.get(editor, [...path.slice(0, -1), path[path.length - 1] - 1])
    //     ),
    //   });

    //   Transforms.setNodes(
    //     editor,
    //     {
    //       devtools_index:
    //         findLastIndex(
    //           Node.get(editor, [
    //             ...path.slice(0, -1),
    //             path[path.length - 1] - 1,
    //           ])
    //         ) + 1,
    //     },
    //     { at: path }
    //   );
    //   console.log({ node: Node.get(editor, path) });
    //   console.groupEnd()
    // }
    normalizeNode(entry);
  };

  return editor;
}

const findLastIndex = (node: Element | Text): number => {
  if (Element.isElement(node)) {
    return findLastIndex(node.children[node.children.length - 1]);
  } else if (Text.isText(node)) {
    return node.devtools_index as number;
  } else {
    throw new Error("FindLastIndex will only accept either Element or Text");
  }
};
