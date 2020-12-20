interface QuestionData {
  [index: string]: {
    _next: string | null;
    _prev: string | null;
    ques: {};
    ans: {};
  };
}
interface SingleQuestionData {
  ques: {};
  ans: {};
  id: string;
}

interface PageData {
    [index : string] : {
        _next : string | null;
        _perv : string | null;
        questions :  Questions
    }
}

// --------------------------------------------------------------------------------
export class Questions {
  start: string | null;
  end: string | null;
  data: QuestionData;

  constructor(initalState ? :  {
    start: string;
    end: string;
    data: QuestionData;
  }) {
    this.start = initalState ? initalState.start : null;
    this.end = initalState ? initalState.end : null;
    this.data = initalState ? initalState.data : {};
  }

  [Symbol.iterator]() {
    let nextId = this.start;

    return {
      next: () => {
        if (!this.start || !this.end || !nextId) {
          return { done: true };
        }
        let next_id = nextId;
        nextId = this.data[next_id]._next;
        return {
          done: false,
          value: {
            ans: this.data[next_id].ans,
            ques: this.data[next_id].ques,
            id: next_id,
          },
        };
      },
    };
  }

  isEmpty() {
    return this.start ? false : true;
  }

  hasOnlySingleElement() {
    return this.start === this.end;
  }

  append(oneinitalState: SingleQuestionData) {
    this.data[oneinitalState.id] = {
      ques: oneinitalState.ques,
      ans: oneinitalState.ans,
      _next: null,
      _prev: this.end,
    };
    if (!this.end) {
      this.start = oneinitalState.id;
      this.end = oneinitalState.id;
    }

    this.data[this.end]._next = oneinitalState.id;
    this.end = oneinitalState.id;
  }

  shift(oneinitalState: SingleQuestionData) {
    this.data[oneinitalState.id] = {
      ques: oneinitalState.ques,
      ans: oneinitalState.ans,
      _next: this.start,
      _prev: null,
    };

    if (!this.start) {
      this.start = oneinitalState.id;
      this.end = oneinitalState.id;
    }
    this.data[this.start]._prev = oneinitalState.id;
    this.start = oneinitalState.id;
  }
  insert(
    oneinitalState: SingleQuestionData,
    { afterID, beforeID }: { afterID?: string; beforeID?: string }
  ) {
    if (afterID && beforeID) {
      throw new Error(
        "You should not give both after and before options. Give either one of them"
      );
    }

    if (afterID) {
      const afterElement = this.data[afterID];

      if (!afterElement._next) {
        throw new Error(
          "You should not use insert method with afterID option while the element is last, you should use append method"
        );
      }
      this.data[oneinitalState.id] = {
        ques: oneinitalState.ques,
        ans: oneinitalState.ans,
        _prev: afterID,
        _next: afterElement._next,
      };

      this.data[afterElement._next]._prev = oneinitalState.id;
      afterElement._next = oneinitalState.id;
    } else if (beforeID) {
      const beforeElement = this.data[beforeID];

      if (!beforeElement._prev) {
        throw new Error(
          "You should not use insert method with beforeID option while the element is first, you should use shift method "
        );
      }

      this.data[oneinitalState.id] = {
        ques: oneinitalState.ques,
        ans: oneinitalState.ans,
        _next: beforeID,
        _prev: beforeElement._prev,
      };

      this.data[beforeElement._prev]._next = oneinitalState.id;
      beforeElement._prev = oneinitalState.id;
    }
  }

  pop() {
    if (this.isEmpty())
      throw new Error("The initalState is empty there is nothing to remove");

    if (this.hasOnlySingleElement()) {
      this.start = null;
      this.end = null;
      this.data = {};
      return;
    }
    const deleteID = this.end as string;
    const shouldDeleteElement = this.data[deleteID];
    const beforeDeleteID = shouldDeleteElement._prev as string;

    const beforeDeleteElement = this.data[beforeDeleteID];
    beforeDeleteElement._next = null;
    this.end = beforeDeleteID;
    delete this.data[deleteID];
  }

  unShift() {
    if (this.isEmpty())
      throw new Error("There is nothing in the object to remove");
    if (this.hasOnlySingleElement()) {
      this.start = null;
      this.end = null;
      this.data = {};
    }

    const deleteID = this.start as string;
    const shouldDeleteElement = this.data[deleteID];
    const afterDeleteID = shouldDeleteElement._next as string;
    const afterDeleteElement = this.data[afterDeleteID];

    this.start = afterDeleteID;
    afterDeleteElement._prev = null;
    delete this.data[deleteID];
  }

  remove(id: string) {
    if (this.isEmpty()) throw new Error("There is no element in the object");

    const shouldDeleteElement = this.data[id];

    if (!shouldDeleteElement)
      throw new Error(`There is no element with the id: ${id}`);

    const beforeID = shouldDeleteElement._prev;
    const afterID = shouldDeleteElement._next;

    if (beforeID) {
      const beforeDeleteElement = this.data[beforeID];
      beforeDeleteElement._next = shouldDeleteElement._next;
    }

    if (afterID) {
      const afterDeleteElement = this.data[afterID];
      afterDeleteElement._prev = shouldDeleteElement._prev;
    }

    delete this.data[id];
  }
}




class Pages {

    start : string | null;
    end : string | null;
    data: PageData;


    constructor(initialState? : {start : string, end : string, data : PageData}) {
        this.start = initialState ? initialState.start : null;
        this.end = initialState ? initialState.start : null;
        this.data = initialState ? initialState.data : {}
    }

    [Symbol.iterator]() {

        let nextID = this.start 
        return {
            next: () => {
                if (this.isEmpty()) return {done : true};

                return {
                    done : false,
                    value : this.data[nextID as string].questions
                }
            }
        }
    }

    isEmpty() {
        return !this.start
    }

    hasOnlySingleElement() {
        return this.start === this.end
    }

    _changePreNextid(id : string){
        
        const element = this.data[id]

        if (!element) throw new Error(`There is no element with id ${id}`)

        const beforeElementID = element._perv 

    }


}