interface DoubleLinkedData<T> {
  [index: string]: { _next: string | null; _prev: string | null; data: T };
}

interface DoubleLinkedArg<T> {
  readonly id: string;
  readonly data: T;
}

interface DoubleLinkedArgAfter<T> extends DoubleLinkedArg<T> {
  readonly options: {
    afterID: string;
  };
}

interface DoubleLinkedArgBefore<T> extends DoubleLinkedArg<T> {
  readonly options: {
    beforeID: string;
  };
}

interface DoubleLinkedArgInsert<T> extends DoubleLinkedArg<T> {
  readonly options: {
    afterID?: string;
    beforeID?: string;
  };
}

interface DoubleLinkedDeleteArg {
  id: string;
}

interface DoubleLinkedDeleteArgEither extends DoubleLinkedDeleteArg {
  after?: boolean;
  before?: boolean;
}

export class DoubleLinked<T> {
  start: string | null;
  end: string | null;
  dataField: DoubleLinkedData<T>;

  constructor() {
    this.start = null;
    this.end = null;
    this.dataField = {};
  }

  [Symbol.iterator]() {
    let nextID = this.start;
    return {
      next: () => {
        if (!nextID) {
          return { done: false };
        } else {
          let present_id = nextID;
          nextID = this.dataField[nextID]._next;

          return {
            done: false,
            value: this.dataField[present_id].data,
          };
        }
      },
    };
  }

  isEmpty(): boolean {
    return this.start !== null;
  }

  hasOnlySingleElement(): boolean {
    return this.isEmpty() ? false : this.start === this.end;
  }

  append(arg: DoubleLinkedArg<T>) {
    const { id, data } = arg;

    if (this.isEmpty()) {
      this.start = id;
      this.end = id;
      this.dataField[id] = {
        _next: null,
        _prev: null,
        data,
      };
    } else {
      const beforeAppendID = this.end as string;
      const beforeAppendElement = this.dataField[beforeAppendID];

      this.end = id;
      beforeAppendElement._next = id;

      this.dataField[id] = {
        _next: null,
        _prev: beforeAppendID,
        data,
      };
    }
  }

  shift(arg: DoubleLinkedArg<T>) {
    const { id, data } = arg;

    if (this.isEmpty()) {
      this.start = id;
      this.end = id;
      this.dataField[id] = {
        _next: null,
        _prev: null,
        data,
      };
    } else {
      const afterShiftID = this.start as string;
      const afterShiftElement = this.dataField[afterShiftID];

      this.start = id;
      afterShiftElement._prev = id;

      this.dataField[id] = {
        _next: afterShiftID,
        _prev: null,
        data,
      };
    }
  }

  insert(arg: DoubleLinkedArgInsert<T>) {
    if (arg.options.afterID && arg.options.beforeID) {
      throw new Error(
        "Both afterID and beforeID options is specifed specify either only one of them"
      );
    }
    const { id, data } = arg;

    if (arg.options.afterID) {
      return this.insertAfter({
        id,
        data,
        options: { afterID: arg.options.afterID },
      });
    }

    if (arg.options.beforeID) {
      return this.insertBefore({
        id,
        data,
        options: { beforeID: arg.options.beforeID },
      });
    }
  }

  insertAfter(arg: DoubleLinkedArgAfter<T>) {
    const { id, data } = arg;

    const beforeInsertID = arg.options.afterID; // The previous element ID after we inserted the given element
    const beforeInsertElement = this.dataField[beforeInsertID];

    if (!beforeInsertElement)
      throw new Error(
        `There is no element with the id: ${arg.options.afterID}`
      );

    // if the specifed the afterID element is the last element then run append method
    if (!beforeInsertElement._next) {
      return this.append({ id, data });
    }

    const afterInsertID = beforeInsertElement._next;
    const afterInsertElement = this.dataField[afterInsertID];

    beforeInsertElement._next = id;
    afterInsertElement._prev = id;

    this.dataField[id] = {
      _next: afterInsertID,
      _prev: beforeInsertID,
      data,
    };
  }
  insertBefore(arg: DoubleLinkedArgBefore<T>) {
    const { id, data } = arg;

    const afterInsertID = arg.options.beforeID;
    const afterInsertElement = this.dataField[afterInsertID];

    if (!afterInsertElement)
      throw new Error(
        `There is no element with the id: ${arg.options.beforeID}`
      );

    if (!afterInsertElement._prev) {
      return this.shift({ id, data });
    }

    const beforeInsertID = afterInsertElement._prev;
    const beforeInsertElement = this.dataField[beforeInsertID];

    afterInsertElement._prev = id;
    beforeInsertElement._next = id;

    this.dataField[id] = {
      _next: afterInsertID,
      _prev: beforeInsertID,
      data,
    };
  }

  pop() {
    if (this.isEmpty()) throw new Error("There is no element to remove");

    if (this.hasOnlySingleElement()) {
      this.start = null;
      this.end = null;
      this.dataField = {};
      return;
    }

    const removeID = this.end as string;
    const removeElement = this.dataField[removeID];

    const beforeRemoveID = removeElement._prev as string;
    const beforeRemoveElement = this.dataField[beforeRemoveID];

    beforeRemoveElement._next = null;
    this.end = beforeRemoveID;

    delete this.dataField[removeID];
  }

  unShift() {
    if (this.isEmpty()) throw new Error("There is no element to remove");

    if (this.hasOnlySingleElement()) {
      this.start = null;
      this.end = null;
      this.dataField = {};
      return;
    }

    const removeID = this.start as string;
    const removeElement = this.dataField[removeID];

    const afterRemoveID = removeElement._next as string;
    const afterRemoveElement = this.dataField[afterRemoveID];

    afterRemoveElement._prev = null;
    this.start = afterRemoveID;

    delete this.dataField[removeID];
  }

  deleteBefore(arg: DoubleLinkedDeleteArg) {
    const { id } = arg;

    if (this.isEmpty()) throw new Error("There is no element to delete");

    const afterRemoveID = id;
    const afterRemoveElement = this.dataField[afterRemoveID];

    if (!afterRemoveElement)
      throw new Error("There is no element with the ID: " + afterRemoveID);

    if (this.hasOnlySingleElement()) {
      this.start = null;
      this.end = null;
      this.dataField = {};
      return;
    }

    const removeID = afterRemoveElement._prev;

    if (!removeID) {
      throw new Error("There is no element before id: " + afterRemoveID);
    }

    const removeElement = this.dataField[removeID];

    const beforeRemoveID = removeElement._prev;

    if (!beforeRemoveID) {
      return this.unShift();
    }

    const beforeRemoveElement = this.dataField[beforeRemoveID];

    beforeRemoveElement._next = afterRemoveID;
    afterRemoveElement._prev = beforeRemoveID;

    delete this.dataField[removeID];
  }

  deleteAfter(arg: DoubleLinkedDeleteArg) {
    const beforeRemoveId = arg.id;

    const beforeRemoveElement = this.dataField[beforeRemoveId];

    if (!beforeRemoveElement)
      throw new Error("There is no element with the id: " + beforeRemoveId);

    const removeID = beforeRemoveElement._next;

    if (!removeID)
      throw new Error(
        "There is no element after the given element with the id: " +
          beforeRemoveId
      );

    const removeElement = this.dataField[removeID];

    const afterRemoveId = removeElement._next;

    if (!afterRemoveId) {
      // If the element we want to remove does not have _next property then
      // that element is last element so we can call pop method to deal with it
      return this.pop();
    }

    const afterRemoveElement = this.dataField[afterRemoveId];

    afterRemoveElement._prev = beforeRemoveId;
    beforeRemoveElement._next = afterRemoveId;

    delete this.dataField[removeID];
  }

  delete(arg : DoubleLinkedDeleteArgEither) {
    
    if (!arg.before && !arg.after) {
        const removeElement = this.dataField[arg.id];

        if (!removeElement) throw new Error("there is no element with the id: " + arg.id);

        if (this.hasOnlySingleElement()) {
            this.start = null;
            this.end = null;
            this.dataField = {};
            return;
        }

        const beforeRemoveID = removeElement._prev;

        if (!beforeRemoveID) {
            return this.unShift()
        }

        this.deleteBefore({id : beforeRemoveID})

        return;
    } 

    if (arg.after) {
        return this.deleteAfter({id : arg.id})
    }
    if (arg.before) {
        return this.deleteBefore({id : arg.id})
    }




}
}
