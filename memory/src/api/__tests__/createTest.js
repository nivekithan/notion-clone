import { createTest } from "../test";

const secanrio1 = {
  start: "0000",
  end: "0000",
  data: {
    "0000": {
      _next: null,
      _prev: null,
      data: {
        start: "000",
        end: "001",
        data: {
          "000": {
            _next: "001",
            _prev: null,
            data: {
              type: "000",
              ques: {},
              ans: {},
            },
          },

          "001": {
            _next: null,
            _prev: "001",
            data: {
              type: "001",
              ques: {},
              ans: {},
            },
          },
        },
      },
    },
  },
};


describe("Checking Create Test", () => {
  test("Best case scenario", () => {
      const checkClass = createTest(secanrio1);
      expect(checkClass).toEqual(secanrio1)
  });
});
