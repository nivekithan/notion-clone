import { DoubleLinked } from "../test.tsx";

const COMMON_RESULT_3 = {
  start: "000",
  end: "002",
  data: {
    "000": {
      _next: "001",
      _prev: null,
      data: { "0": "0" },
    },
    "001": {
      _prev: "000",
      _next: "002",
      data: { "1": "1" },
    },
    "002": {
      _prev: "001",
      _next: null,
      data: { "2": "2" },
    },
  },
};

describe("Running test in DoubleLinked class", () => {
  describe("Checking constructor function", () => {
    test("Empty arg", () => {
      const newDouble = new DoubleLinked();

      expect(newDouble).toEqual({ start: null, end: null, data: {} });
    });

    test("With arg", () => {
      const param = {
        start: "34565623",
        end: "2345569540",
        data: {
          _next: "354tte",
          _prev: "35445466",
          data: ["something"],
        },
      };

      const newDouble = new DoubleLinked(param);

      expect(newDouble).toEqual(param);
    });
    test("With falsey values", () => {
      const newDouble = new DoubleLinked({
        start: undefined,
        end: "",
        data: {},
      });

      expect(newDouble).toEqual({
        start: null,
        end: null,
        data: {},
      });
    });
  });

  describe("Checking isEmpty method", () => {
    test("Empty arg in construction", () => {
      const newDouble = new DoubleLinked();
      expect(newDouble.isEmpty()).toEqual(true);
    });

    test("Args with falsey values", () => {
      const newDouble = new DoubleLinked({
        start: undefined,
        end: "",
        data: {},
      });

      expect(newDouble.isEmpty()).toEqual(true);
    });
  });

  describe("Checking hasSingleElement method", () => {
    test("Arg with one element", () => {
      const newDouble = new DoubleLinked({
        start: "24346",
        end: "24346",
        data: {
          "24346": {
            cake: 24,
          },
        },
      });

      expect(newDouble.hasSingleElement()).toEqual(true);
    });

    test("Arg with no element", () => {
      const newDouble = new DoubleLinked();

      expect(newDouble.hasSingleElement()).toEqual(false);
    });

    test("with more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "1": "1" }, "001");
      newDouble.append({ "2": "2" }, "002");

      expect(newDouble.hasSingleElement()).toEqual(false);
    });
  });

  describe("Checking append method", () => {
    test("class initialised with no arg", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ 3: "something" }, "345");

      expect(newDouble.data["345"]).toEqual({
        _next: null,
        _prev: null,
        data: {
          3: "something",
        },
      });
    });

    test("Doing three times", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "0": "0" }, "000");
      newDouble.append({ "1": "1" }, "001");
      newDouble.append({ "2": "2" }, "002");
      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking Shift method", () => {
    test("with three shifts", () => {
      const newDouble = new DoubleLinked();

      newDouble.shift({ "2": "2" }, "002");
      newDouble.shift({ "1": "1" }, "001");
      newDouble.shift({ "0": "0" }, "000");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("With no arg during initialized", () => {
      const newDouble = new DoubleLinked();

      newDouble.shift({ "1": "1" }, "001");

      expect(newDouble).toEqual({
        start: "001",
        end: "001",
        data: {
          "001": {
            _next: null,
            _prev: null,
            data: { "1": "1" },
          },
        },
      });
    });
  });

  describe("Checking insertBefore method", () => {
    test("On inserting before start element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "1": "1" }, "001");
      newDouble.append({ "2": "2" }, "002");

      newDouble.insertBefore({ "0": "0" }, "000", "001");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("On inserting middle", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "0": "0" }, "000");
      newDouble.append({ "2": "2" }, "002");

      newDouble.insertBefore({ "1": "1" }, "001", "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking insertAfter method", () => {
    test("On inserting after end element", () => {
      const newDouble = new DoubleLinked();

      newDouble.shift({ "1": "1" }, "001");
      newDouble.shift({ "0": "0" }, "000");

      newDouble.insertAfter({ "2": "2" }, "002", "001");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("On inserting in middle", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "2": "2" }, "002");
      newDouble.shift({ "0": "0" }, "000");

      newDouble.insertAfter({ "1": "1" }, "001", "000");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking insert Method", () => {
    test("On giving no options", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("On giving options", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "0": "0" }, "000", "001", {
        before: true,
        after: false,
      });
      newDouble.insert({ "2": "2" }, "002", "001", { after: true });

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking pop method", () => {
    test("Using when there is only on element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "0": "0" }, "000");

      newDouble.pop();

      expect(newDouble).toEqual({
        start: null,
        end: null,
        data: {},
      });
    });

    test("When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");
      newDouble.insert({ "3": "3" }, "003");

      newDouble.pop();

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("Poping while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.append({ "3": "3" }, "003");
      newDouble.pop();

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking unShift method", () => {
    test("Using when there is only on element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "0": "0" }, "000");

      newDouble.unShift();

      expect(newDouble).toEqual({
        start: null,
        end: null,
        data: {},
      });
    });

    test("When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      newDouble.unShift();

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("unShifting while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.unShift();
      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking removeBefore method", () => {
    test("When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      newDouble.removeBefore("000");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("removing while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");

      newDouble.removeBefore("000");

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });
  describe("Checking removeAfter method", () => {
    test("When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "3": "3" }, "003");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      newDouble.removeAfter("000");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("removing while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.append({ "3": "3" }, "003");
      newDouble.insert({ "1": "1" }, "001");

      newDouble.removeAfter("000");

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });
  describe("Checking remove method", () => {
    test("Checking remove with after options: When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "3": "3" }, "003");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      newDouble.remove("000", { after: true, before: false });

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("Checking remove with after options: removing while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.append({ "3": "3" }, "003");
      newDouble.insert({ "1": "1" }, "001");

      newDouble.remove("000", { after: true });

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
    test("Checking removeBefore: When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");

      newDouble.remove("000", { before: true });

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("Checking removeBefore: removing while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "3": "3" }, "003");
      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");

      newDouble.remove("000", { before: true });

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
    test("Checking with no options : Using when there is only on element", () => {
      const newDouble = new DoubleLinked();

      newDouble.append({ "0": "0" }, "000");

      newDouble.remove();

      expect(newDouble).toEqual({
        start: null,
        end: null,
        data: {},
      });
    });

    test("Checking with no options :When there is more than one element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.insert({ "2": "2" }, "002");
      newDouble.insert({ "3": "3" }, "003");

      newDouble.remove();

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });

    test("Checking with no options : removing while more than one element and then adding element", () => {
      const newDouble = new DoubleLinked();

      newDouble.insert({ "0": "0" }, "000");
      newDouble.insert({ "1": "1" }, "001");
      newDouble.append({ "3": "3" }, "003");
      newDouble.remove();

      newDouble.insert({ "2": "2" }, "002");

      expect(newDouble).toEqual(COMMON_RESULT_3);
    });
  });

  describe("Checking for...of loop", () => {
    const newDouble = new DoubleLinked();

    newDouble.insert({ "0": "0" }, "000");
    newDouble.insert({ "1": "1" }, "001");
    newDouble.insert({ "2": "2" }, "002");

    const checkObj = {};

    for (let { data, id } of newDouble) {
      checkObj[id] = data;
    }

    expect(checkObj).toEqual({
      "000": { "0": "0" },
      "001": { "1": "1" },
      "002": { "2": "2" },
    });
  });
});
