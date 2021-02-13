import { nanoid } from "nanoid";
import {
  Editor,
  Node,
  NodeEntry,
  Path,
  Transforms,
  Element,
  Range,
} from "slate";
import { ReactEditor } from "slate-react";
import { shallowEqualArrays } from "shallow-equal";

export const SlateEditor = {
  start(editor: ReactEditor, at: Range): NodeEntry {
    const startPath = Editor.start(editor, at).path;
    const startNode = Node.get(editor, startPath);

    return [startNode, startPath];
  },

  replace(
    editor: ReactEditor,
    propterties: Partial<Node>,
    options: { match?: (n: Node) => boolean; reverse?: boolean } = {}
  ): void {
    for (const [, path] of Editor.nodes(editor, { ...options, at: [] })) {
      Transforms.setNodes(editor, propterties, { at: path });
    }
  },

  findPathById(editor: ReactEditor, id: string): Path {
    for (const [node, path] of Editor.nodes(editor, { at: [] })) {
      if (node.id === id) return path;
    }

    throw new Error("There is no path with the id: " + id);
  },

  findElementEntryById(editor: ReactEditor, id: string): [Element, Path] {
    const path = this.findPathById(editor, id);

    const node = Node.get(editor, path);

    if (Element.isElement(node)) {
      return [node, path];
    } else {
      throw new Error(`The node returned by id: ${id} is not an element1`);
    }
  },

  updateStartId(
    editor: ReactEditor,
    startId: string,
    options: { match?: (n: Node) => boolean } = {}
  ): string | void {
    const {
      match = (node: Node) => {
        if (node.startId === startId) {
          return true;
        } else {
          return false;
        }
      },
    } = options;

    for (const [node, path] of Editor.nodes(editor, { match, at: [] })) {
      const { startId, id } = node;

      if (typeof id !== "string") {
        Transforms.setNodes(editor, { id: nanoid() }, { at: path });
        return this.updateStartId(editor, startId as string, { match });
      }

      Transforms.setNodes(editor, { startId: id }, { at: path });
      this.replace(editor, { startId: id }, { match: match });
      return id;
    }
  },

  *sibilings(
    editor: ReactEditor,
    at: Path,
    options: {
      reverse?: boolean;
      match?: (n: Node) => boolean;
      voids?: boolean;
    } = {}
  ) {
    const newMatch = (node: Node): boolean => {
      const path = this.findPathById(editor, node.id as string);

      /*
        If the path of node is not of same length of given `at : Path` length then the node is not sibling. 
        if the path of parent of node is not same as given `at : Path` length then the node is not asibling
      */
      if (
        path.length !== at.length ||
        !shallowEqualArrays(path.slice(0, -1), at.slice(0, -1)) ||
        path[path.length - 1] < at[path.length - 1]
      ) {
        return false;
      } else {
        /*
          If the there is no match paramter then return true. 
          If there is match paramter then return the value returned by that function
        */
        const { match } = options;

        if (!match) {
          return true;
        } else {
          return match(node);
        }
      }
    };

    for (const entry of Editor.nodes(editor, {
      ...options,
      match: newMatch,
      at: [],
    })) {
      yield entry;
    }
  },

  synNumber(editor: ReactEditor, startId: string): void {
    let startIdElementEntry: [Element, Path] | null;

    try {
      startIdElementEntry = this.findElementEntryById(editor, startId);
    } catch (err) {
      const newStartId = this.updateStartId(editor, startId);
      if (!newStartId) {
        /*
             If there is no element with the startId as given startId only then there will be no newStartId
             this is the case if the user deleted last and only number-list whose startId is given startId.

             In that case there will be no number-list we need syn so we can just stop exceutation of function
           */
        return;
      }
      return this.synNumber(editor, newStartId);
    }

    const [startIdNode, startIdPath] = startIdElementEntry;
    let currentNumber = 1;

    for (const [siblingNode, siblingPath] of this.sibilings(
      editor,
      startIdPath
    )) {
      /*
          Condition when to break the this cycle
                * If the the sibling node is not  type of number-list with one exception case (1)
                * if the sibling node is is of number-list but its startId is different from given startId
                * 

            Exception cases
                * If sibling node is of type normal and its content is empty or whitespaces then we should not break the cycle
        */
      if (
        (siblingNode.type !== "number-list" ||
          siblingNode.startId !== startId) &&
        !(
          siblingNode.type === "normal" &&
          Node.string(siblingNode).trim() === ""
        )
      ) {
        break;
      } else if (
        /*
            Condition when to ignore the sibling the node and go to next
                    * If the sibling node is of type normal and its content is empty or whitespaces
          */

        siblingNode.type === "normal" &&
        Node.string(siblingNode).trim() === ""
      ) {
        continue;
      } else {
        Transforms.setNodes(
          editor,
          { number: currentNumber },
          { at: siblingPath }
        );
        currentNumber++;
      }
    }
  },

  insertBreakNumber(editor: ReactEditor) {
    const { selection } = editor;
    if (!selection) return;
    Editor.insertBreak(editor);

    const [startNode, startPath] = this.start(editor, selection);

    const startId = startNode.startId;

    if (typeof startId === "string") {
      this.synNumber(editor, startId);
    }
  },
};
