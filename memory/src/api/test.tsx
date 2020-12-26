import { nanoid } from "nanoid";
import { Node } from "slate";
import { useUpdateTest } from "../hooks";
import { TestDB } from "../types";

// ---------------------------------------------------------------
interface DoubleLinkedElements<T> {
  [index: string]: { _next: string | null; _prev: string | null; data: T };
}

interface DoubleLinkedConsArg<T> {
  start: string | null;
  end: string | null;
  data: DoubleLinkedElements<T>;
}

// ---------------------------------------------------------------
export class DoubleLinked<T> {
  start: string | null;
  end: string | null;
  data: DoubleLinkedElements<T>;

  constructor(initialState?: DoubleLinkedConsArg<T>) {
    this.start = initialState
      ? initialState.start
        ? initialState.start
        : null
      : null;
    this.end = initialState
      ? initialState.end
        ? initialState.end
        : null
      : null;
    this.data = initialState
      ? initialState.data
        ? initialState.data
        : {}
      : {};
  }

  [Symbol.iterator]() {
    let nextID = this.start;
    return {
      next: () => {
        if (nextID === null) {
          return {
            done: true,
          };
        }

        let next_id = nextID;
        nextID = this.data[next_id]._next;

        return {
          done: false,
          value: { data: this.data[next_id].data, id: next_id },
        };
      },
    };
  }

  isEmpty() {
    return this.start === null && this.end === null;
  }

  isStart(id: string) {
    return this.start === id;
  }

  isEnd(id: string) {
    return this.end === id;
  }

  has(id: string) {
    return !!this.data[id];
  }

  hasSingleElement() {
    if (this.isEmpty()) return false;
    return this.start === this.end;
  }

  getBefore(id: string) {
    if (this.isEmpty()) throw new Error("The DoubleLinked in empty");
    if (!this.has(id))
      throw new Error("There is no element with the id: " + id);
    if (this.hasSingleElement() || this.isStart(id))
      throw new Error(
        "There is no element after the element with the id " + id
      );

    const givenElement = this.data[id];
    const beforeID = givenElement._prev as string;
    const beforeElement = this.data[beforeID];

    return {
      element: beforeElement,
      id: beforeID,
    };
  }

  getAfter(id: string) {
    if (this.isEmpty()) throw new Error("The DoubleLinked in empty");
    if (!this.has(id))
      throw new Error("There is no element with the id: " + id);
    if (this.hasSingleElement() || this.isEnd(id))
      throw new Error(
        "There is no element after the element with the id " + id
      );

    const givenElement = this.data[id];
    const afterID = givenElement._next as string;
    const afterElement = this.data[afterID];

    return {
      element: afterElement,
      id: afterID,
    };
  }

  getEnd() {
    if (this.isEmpty()) throw new Error("There is no element");

    const endID = this.end as string;
    const endElement = this.data[endID];

    return {
      element: endElement,
      id: endID,
    };
  }

  getStart() {
    if (this.isEmpty()) throw new Error("There is no element");

    const startID = this.start as string;
    const startElement = this.data[startID];

    return {
      element: startElement,
      id: startID,
    };
  }
  append(arg: T, id: string) {
    if (this.isEmpty()) {
      this.start = id;
      this.end = id;
      this.data[id] = {
        _next: null,
        _prev: null,
        data: arg,
      };
    } else {
      const endElement = this.getEnd();

      this.data[id] = {
        _next: null,
        _prev: endElement.id,
        data: arg,
      };

      endElement.element._next = id;
      this.end = id;
    }
  }

  shift(arg: T, id: string) {
    if (this.isEmpty()) {
      this.start = id;
      this.end = id;
      this.data[id] = {
        _next: null,
        _prev: null,
        data: arg,
      };
    } else {
      const startElement = this.getStart();

      this.data[id] = {
        _next: startElement.id,
        _prev: null,
        data: arg,
      };

      this.start = id;
      startElement.element._prev = id;
    }
  }

  insertBefore(arg: T, argID: string, whatID: string) {
    if (this.isEmpty()) throw new Error("The DoubleLinked is empty");
    if (!this.has(whatID))
      throw new Error("There is no element with the id " + whatID);

    if (this.isStart(whatID)) {
      this.data[argID] = {
        _next: this.start,
        _prev: null,
        data: arg,
      };
      const startElement = this.getStart();

      this.start = argID;
      startElement.element._prev = argID;
    } else {
      const beforeElement = this.getBefore(whatID);

      this.data[argID] = {
        _next: whatID,
        _prev: beforeElement.id,
        data: arg,
      };

      beforeElement.element._next = argID;
      this.data[whatID]._prev = argID;
    }
  }

  insertAfter(arg: T, argID: string, whatID: string) {
    if (this.isEmpty()) throw new Error("The DoubleLinked is empty");
    if (!this.has(whatID))
      throw new Error("There is no element with the id: " + whatID);

    if (this.isEnd(whatID)) {
      this.data[argID] = {
        _next: null,
        _prev: whatID,
        data: arg,
      };
      const endElement = this.getEnd();
      this.end = argID;
      endElement.element._next = argID;
    } else {
      const afterElement = this.getAfter(whatID);
      this.data[argID] = {
        _next: afterElement.id,
        _prev: whatID,
        data: arg,
      };
      afterElement.element._prev = argID;
      this.data[whatID]._next = argID;
    }
  }

  insert(
    arg: T,
    argID: string,
    whatID: string = "",
    options?: { after?: boolean; before?: boolean }
  ) {
    if (options) {
      if (options.after && options.before)
        throw new Error(
          "In options both after and before has been checked true, check only one to be true"
        );
      if (!options.after && !options.before)
        throw new Error(
          "In options neither option after nor option before has been checked, check either one to be true"
        );
      if (whatID === "") throw new Error("There is no whatID");

      if (options.after) {
        this.insertAfter(arg, argID, whatID);
      } else if (options.before) {
        this.insertBefore(arg, argID, whatID);
      }
    } else {
      this.append(arg, argID);
    }
  }

  pop() {
    if (this.isEmpty()) throw new Error("There is no element");
    if (this.hasSingleElement()) {
      this.end = null;
      this.start = null;
      this.data = {};
    } else {
      const beforeDeleteElement = this.getBefore(this.end as string);

      delete this.data[this.end as string];

      beforeDeleteElement.element._next = null;
      this.end = beforeDeleteElement.id;
    }
  }

  unShift() {
    if (this.isEmpty()) throw new Error("There is no element");
    if (this.hasSingleElement()) {
      this.end = null;
      this.start = null;
      this.data = {};
    } else {
      const afterDeleteElement = this.getAfter(this.start as string);

      delete this.data[this.start as string];

      afterDeleteElement.element._prev = null;
      this.start = afterDeleteElement.id;
    }
  }

  removeBefore(id: string) {
    if (this.isEmpty()) throw new Error("There is no element");
    if (!this.has(id))
      throw new Error("There is no element with the id: " + id);
    if (this.isStart(id))
      throw new Error("There is no element before id: " + id);

    const deleteElement = this.getBefore(id);
    if (this.isStart(deleteElement.id)) {
      this.unShift();
    } else {
      const beforeDeleteElement = this.getBefore(deleteElement.id);

      beforeDeleteElement.element._next = id;
      this.data[id]._prev = beforeDeleteElement.id;

      delete this.data[deleteElement.id];
    }
  }

  removeAfter(id: string) {
    if (this.isEmpty()) throw new Error("There is no element");
    if (!this.has(id))
      throw new Error("There is no element with the id: " + id);
    if (this.isEnd(id)) throw new Error("There is no element before id: " + id);

    const deleteElement = this.getAfter(id);
    if (this.isEnd(deleteElement.id)) {
      this.pop();
    } else {
      const afterDeleteElement = this.getAfter(deleteElement.id);

      afterDeleteElement.element._prev = id;
      this.data[id]._next = afterDeleteElement.id;

      delete this.data[deleteElement.id];
    }
  }

  remove(id: string = "", options?: { after: boolean; before: boolean }) {
    if (options) {
      if (options.after && options.before)
        throw new Error(
          "You specified both after and before, only specify either one of them"
        );
      if (options.after && options.before)
        throw new Error(
          "You specified both after and before to be false, specify either one of them"
        );

      if (options.after) {
        this.removeAfter(id);
      } else if (options.before) {
        this.removeBefore(id);
      }
    } else if (!options) {
      this.pop();
    }
  }
}
// --------------------------------------

export interface Ques {
  type: string;
  ques: {children : Node[]};
  ans: {children : Node[]};
}
// -------------------------------------------------------

export const createTest = (arg?: TestDB): DoubleLinked<DoubleLinked<Ques>> => {
  if (!arg || !arg.start) {
    const firstPageID = nanoid();

    const initialParam = {
      start: firstPageID,
      end: firstPageID,
      data: {
        [firstPageID]: {
          _next: null,
          _prev: null,
          data: {
            start: null,
            end: null,
            data: {},
          },
        },
      },
    };

    return createTest(initialParam);
  } else {
    for (let key in arg.data) {
      arg.data[key].data = new DoubleLinked<Ques>(arg.data[key].data);
    }
    const finishedClass = new DoubleLinked<DoubleLinked<Ques>>(
      arg as DoubleLinkedConsArg<DoubleLinked<Ques>>
    );

    return finishedClass;
  }
};
