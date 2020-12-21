interface DoubleLinkedElements<T> {
  [index: string]: { _next: string | null; _prev: string | null; data: T };
}

interface DoubleLinkedConsArg<T> {
  start: string | null;
  end: string | null;
  data: DoubleLinkedElements<T>;
}

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

  isEmpty() {
    return this.start === null && this.end === null;
  }

  isStart(id: string) {
    return (this.start = id);
  }

  isEnd(id: string) {
    return (this.end = id);
  }

  has(id: string) {
    return !!this.data[id];
  }

  hasSingleElement() {
    if (this.isEmpty()) return false;
    return this.start === this.end;
  }



  getBefore(id: string) {
    if (this.isEmpty()) return false;
    if (this.hasSingleElement()) return false;
    if (this.isStart(id)) return false;
    if (!this.has(id)) return false;

    const givenElement = this.data[id];
    const beforeID = givenElement._prev as string;
    const beforeElement = this.data[beforeID];

    return {
      beforeElement,
      beforeID,
    };
  }

  getAfter(id: string) {
    if (this.isEmpty()) return false;
    if (this.hasSingleElement()) return false;
    if (!this.has(id)) return false;
    if (this.isEnd(id)) return false;

    const givenElement = this.data[id];
    const afterID = givenElement._next as string;
    const afterElement = this.data[afterID];

    return {
      afterElement,
      afterID,
    };
  }

  getEnd() {
    if (this.isEmpty()) throw new Error("There is no element");

    const endID = this.end as string;
    const endElement = this.data[endID];

    return {
      endElement,
      endID,
    };
  }

  getStart() {
    if (this.isEmpty()) throw new Error("There is no element");

    const startID = this.start as string;
    const startElement = this.data[startID];

    return {
      startElement,
      startID,
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
      const { endElement, endID } = this.getEnd();

      this.data[id] = {
        _next: null,
        _prev: endID,
        data: arg,
      };

      endElement._next = id;
      this.end = id;
    }
  }

  shift(arg : T, id : string) {
      if (this.isEmpty()) {
          this.start = id;
          this.end = id;
          this.data[id] = {
              _next : null,
              _prev : null,
              data : arg
          }
      } else {
          const {startElement, startID} = this.getStart();

          this.data[id] = {
              _next : startID,
              _prev : null,
              data : arg
          }

          this.start = id;
          startElement._prev = id;
      } 
  }
}
