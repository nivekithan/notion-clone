import { DoubleLinked } from "../doubleLinked.tsx";

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

        expect(newDouble.hasSingleElement()).toEqual(false)
    })
  });


  describe("Checking append method", () => {
      test("class initialised with no arg", () => {
          const newDouble = new DoubleLinked();

          newDouble.append({3 : "something"}, "345");

          expect(newDouble.data["345"]).toEqual({
              _next : null,
              _prev : null,
              data : {
                  3 : "something"
              }
          }) 
      })

      test("Doing append two times", () => {
          const newDouble = new DoubleLinked();

          newDouble.append({"1" : "1"}, "001")
          newDouble.append({"2" : "2"}, "002")
            newDouble.append({"3" : "3"}, "003")
          expect(newDouble).toEqual({
              start : "001",
              end : "003",
              data : {
                  "001" : {
                      _next : "002",
                      _prev : null,
                      data : {"1" : "1"}
                  },

                  "002" : {
                      _next : "003",
                      _prev : "001",
                      data : {"2" : "2"}
                  },

                  "003" : {
                      _next : null,
                      _prev : "002",
                      data : {"3" : "3"}
                  }
              }
          }) 
      })
  })

});
