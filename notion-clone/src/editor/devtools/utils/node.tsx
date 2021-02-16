import { Node, Text, Editor, Range, Operation, Element } from "slate";
import {isPlainObject} from "./isPlainObject"

export const DevNode = {
    isNode(value : any) : value is Node {
        return (
            Text.isText(value) || DevElement.isElement(value) || DevEditor.isEditor(value)
        )
    },

    
  isNodeList(value: any): value is Node[] {
    return Array.isArray(value) && value.every(val => DevNode.isNode(val))
  },
}


export const DevElement = {
    isElement(value: any): value is Element {
        return (
          isPlainObject(value) &&
          DevNode.isNodeList(value.children) &&
          !Editor.isEditor(value)
        )
      },
}

export const DevEditor = {
    isEditor(value: any): value is Editor {
        return (
          isPlainObject(value) &&
          typeof value.addMark === 'function' &&
          typeof value.apply === 'function' &&
          typeof value.deleteBackward === 'function' &&
          typeof value.deleteForward === 'function' &&
          typeof value.deleteFragment === 'function' &&
          typeof value.insertBreak === 'function' &&
          typeof value.insertFragment === 'function' &&
          typeof value.insertNode === 'function' &&
          typeof value.insertText === 'function' &&
          typeof value.isInline === 'function' &&
          typeof value.isVoid === 'function' &&
          typeof value.normalizeNode === 'function' &&
          typeof value.onChange === 'function' &&
          typeof value.removeMark === 'function' &&
          (value.marks === null || isPlainObject(value.marks)) &&
          (value.selection === null || Range.isRange(value.selection)) &&
          DevNode.isNodeList(value.children) &&
          Operation.isOperationList(value.operations)
        )
      },
}