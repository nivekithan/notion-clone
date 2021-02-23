import { Node, Path } from "slate";
import { ReactEditor } from "slate-react";

export const findPathByDevtoolsId = (
  editor: ReactEditor,
  devToolsId: string
): Path => {
  for (const [node, path] of Node.nodes(editor)) {
    if (node.devtools_id === devToolsId) {
      return path;
    }
  }

  throw new Error("There is node with devtools_id: " + devToolsId);
};
