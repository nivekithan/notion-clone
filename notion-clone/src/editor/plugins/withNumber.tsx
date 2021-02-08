import { Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { SlateEditor } from "../slateEditor";

export const withNumber = (editor: ReactEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (
      Element.isElement(node) &&
      node.type === "numbered-list" &&
      node._startId === node._id &&
      node.number !== 1
    ) {
      Transforms.setNodes(editor, { number: 1 }, { at: path });
      SlateEditor.synNumber(editor, node._startId + "", node.depth as number);
      return;
    }

    if (
      node.type === "numbered-list" &&
      !isValidStartId(editor, node, node._startId as string)
    ) {
      SlateEditor.updateStartId(
        editor,
        node._startId as string,
        node.depth as number
      );
      return;
    }

    normalizeNode(entry);
  };

  return editor;
};

/*
  Following function will not return true if

        * If the startNode is not there
        * IF the startNode is not of type numbered-list
        * If the startNode's depth is not same as node's depth


  */

const isValidStartId = (editor: ReactEditor, node: Node, startId: string) => {
  try {
    const [startNode] = SlateEditor.getNodeById(editor, startId);
    if (startNode.type !== "numbered-list" || startNode.depth !== node.depth) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
};
