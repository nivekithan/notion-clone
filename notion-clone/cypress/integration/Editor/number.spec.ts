/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />

// describe("Unordered list behaviour", () => {
//   it("Testing the text content and rendering of bullet icon", () => {
//     const firstText = "This is first unordered list";
//     const secondText = "This is second unordered list";

//     cy.visit("/");
//     cy.getByAttr("type", "editor")
//       .type(firstText)
//       .type("{enter}")
//       .type(secondText);

//     cy.getByAttr("type", "editor")
//       .findByAttr("type", "unordered-list")
//       .each(($el, i) => {
//         if (i === 0) {
//           cy.wrap($el).should("contain.text", firstText)
//           cy.wrap($el).findByAttr("icon", "bullet").should("have.length", 1);
//         } else if (i === 1) {
//           cy.wrap($el).should("contain.text", secondText);
//           cy.wrap($el).findByAttr("icon", "bullet").should("have.length", 1);
//         }
//       });
//   });
// });

describe("Tesitng number-list behaviour", () => {
  describe("The number should stay syn", () => {
    it("The number should increase with value", () => {
      const firstNumberText = "The number should be one";
      const secondNumberText = "The number Should be two";
      const thirdNumberText = "THe number should be three";
      cy.visit("/");

      // Typing the text content
      cy.getByAttr("type", "editor")
        .click()
        .type(firstNumberText)
        .type("{enter}")
        .type(secondNumberText)
        .type("{enter}")
        .type(thirdNumberText);

      /*
        Making sure that with enter the number stay syn
      */
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 3);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
          Making sure that deleting last entry in number-list does not break order
        */

      cy.getByAttr("label", "3").type(
        Array(thirdNumberText.length + 1)
          .fill("{backspace}")
          .join("")
      );

      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 2);
          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
          Making sure that deleting the middle entry doesnt break order
        */

      cy.getByAttr("type", "editor")
        .type(`{enter}${thirdNumberText}`)
        // Go to end of second number-list
        .type("{uparrow}{end}")
        // Delete the entier second number-list
        .type(
          Array(secondNumberText.length + 1)
            .fill("{backspace}")
            .join("")
        );
      // Checking if the the number gets syn
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 2);
          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
          Making sure that pressing enter from 1st list when there is 2nd list wont break any order
        */

      cy.getByAttr("type", "editor")

        .type("{enter}")
        .type(secondNumberText);

      // Asserting the value
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 3);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
        Making sure that deleting the first  list when there is more than one list item wont break order
      */

      cy.getByAttr("type", "editor")
        // Going to end of first list
        .type("{uparrow}{end}")
        // Deleting the complete first list
        .type(
          Array(firstNumberText.length + 1)
            .fill("{backspace}")
            .join("")
        );

      // Asserting that order didnt break
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 2);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
        Making sure that number-list sync even after deleting the first list 
      */
      cy.getByAttr("type", "editor")
        .click()
        .type("{downarrow}{end}")
        .type("{enter}")
        .type(firstNumberText);

      /*
        After this the order should been changed as
          1) secondNumberText
          2) thirdNumberText
          3) firstNumbertext
      */

      /*
        Assterting the above mentioned order
      */
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list).should("have.length", 3);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .findByAttr("label-number", i + 1)
              .should("have.length", 1);
          }
        });

      /*
          Checking if we can delete entire number-list
        */

      cy.getByAttr("type", "editor")

        // Deleting the complete number-list
        .type(
          Array(
            firstNumberText.length +
              secondNumberText.length +
              thirdNumberText.length +
              3
          )
            .fill("{backspace}")
            .join("")
        )
        .end();

      // If there is no error then the test passed
    });

    it("The number should not break with indention", () => {
      const firstNumberText = "The number is  1";
      const secondNumberText = "THe number is 2";
      const thirdNumberText = "THe number is 3";
      const fourthNumberText = "The number is 4";
      const fifthNumberText = "The number is 5";

      cy.visit("/");

      cy.getByAttr("type", "editor")
        .type(firstNumberText)
        .type("{enter}")
        .type(secondNumberText)
        .type("{enter}")
        .type(thirdNumberText)
        .type("{enter}")
        .type(fourthNumberText);

      /*
        The test above tested the normal behaviour of number so there is no need to do it again.

        we have to test only if number-list doesnt break order with indentation
      */

      /*
        Checking if tying "Tab" in last will break order in number-list
      */

      cy.getByAttr("label", "4")
        .typeTab()
        .type("{enter}")
        .type(fifthNumberText);

      /*
        After this the number list should ressemble this format

            1. firstNumberText
            2. secondNumberText
            3. thirdNumberText
                1. fourthNumberText
                2. fifthNumberText

      */

      /*
        Asserting the above order
    */

      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list)
            .should("have.length", 5)
            .filterByAttr("depth", 0)
            .should("have.length", 3);
          cy.wrap($list).filterByAttr("depth", 1).should("have.length", 2);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 3)
              .should("have.length", 1);
          } else if (i === 3) {
            cy.wrap($el)
              .should("contain.text", fourthNumberText)
              .should("have.attr", "data-cy-depth", "1")
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 4) {
            cy.wrap($el)
              .should("contain.text", fifthNumberText)
              .should("have.attr", "data-cy-depth", "1")
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          }
        });

      cy.getByAttr("type", "editor")
        .type(
          Array(fifthNumberText.length + fourthNumberText.length + 2)
            .fill("{backspace}")
            .join("")
        )
        .type("{enter}")
        .type(fifthNumberText)
        .type("{uparrow}")
        .typeTab()
        .type("{enter}")
        .type(fourthNumberText);

      /*
          The order should resemble this
              1. firstNumberText
              2. SecondNumberText
                1. thirdNumberText
                2. fourthNumberText
              3. fifthNumberText
        */

      /*
          Asserting the above order
        */

      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list)
            .should("have.length", 5)
            .filterByAttr("depth", 0)
            .should("have.length", 3);
          cy.wrap($list).filterByAttr("depth", 1).should("have.length", 2);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .should("have.attr", "data-cy-depth", "1")
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 3) {
            cy.wrap($el)
              .should("contain.text", fourthNumberText)
              .should("have.attr", "data-cy-depth", "1")
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 4) {
            cy.wrap($el)
              .should("contain.text", fifthNumberText)
              .should("have.attr", "data-cy-depth", "0")
              .findByAttr("label-number", 3)
              .should("have.length", 1);
          }
        });

      cy.getByAttr("type", "editor")
        .type(
          Array(
            secondNumberText.length +
              thirdNumberText.length +
              fourthNumberText.length +
              3
          )
            .fill("{backspace}")
            .join("")
        )
        .type("{enter}" + thirdNumberText + "{enter}" + fourthNumberText)
        .type("{uparrow}{uparrow}{end}")
        .typeTab()
        .type("{enter}" + secondNumberText);

      /*
          After the above commands the order should be
                  1. firstNumberText
                  2. secondNumberText
                1. thirdNumberText
                2. secondNumberText
                3. thirdNumberText
        */

      /*
          Asserting the above order
        */

      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list)
            .should("have.length", 5)
            .filterByAttr("depth", 0)
            .should("have.length", 3);
          cy.wrap($list).filterByAttr("depth", 1).should("have.length", 2);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .should("have.attr", "data-cy-depth", 1)
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .should("have.attr", "data-cy-depth", 1)
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 3) {
            cy.wrap($el)
              .should("contain.text", fourthNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 4) {
            cy.wrap($el)
              .should("contain.text", fifthNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 3)
              .should("have.length", 1);
          }
        });

      cy.getByAttr("type", "editor")
        .type(
          Array(secondNumberText.length + firstNumberText.length + 2)
            .fill("{backspace}")
            .join("")
        )
        .type("{downarrow}{end}")
        .type(Array(thirdNumberText.length).fill("{backspace}").join(""))
        .type(
          firstNumberText +
            "{enter}" +
            secondNumberText +
            "{enter}" +
            thirdNumberText
        )
        .type("{uparrow}{uparrow}{end}")
        .typeTab()
        .type("{downarrow}{end}")
        .typeTab();

      /*
          After this the order should be 
                1. firstNumberText
                2. secondNumberText
              1. thirdNumberText
              2. fourthNumberText
              3. fifthNumberText
        */

      /*
          Asserting the above order
        */
      cy.getByAttr("type", "editor")
        .findByAttr("type", "number-list")
        .each(($el, i, $list) => {
          cy.wrap($list)
            .should("have.length", 5)
            .filterByAttr("depth", 0)
            .should("have.length", 3);
          cy.wrap($list).filterByAttr("depth", 1).should("have.length", 2);

          if (i === 0) {
            cy.wrap($el)
              .should("contain.text", firstNumberText)
              .should("have.attr", "data-cy-depth", 1)
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 1) {
            cy.wrap($el)
              .should("contain.text", secondNumberText)
              .should("have.attr", "data-cy-depth", 1)
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 2) {
            cy.wrap($el)
              .should("contain.text", thirdNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 1)
              .should("have.length", 1);
          } else if (i === 3) {
            cy.wrap($el)
              .should("contain.text", fourthNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 2)
              .should("have.length", 1);
          } else if (i === 4) {
            cy.wrap($el)
              .should("contain.text", fifthNumberText)
              .should("have.attr", "data-cy-depth", 0)
              .findByAttr("label-number", 3)
              .should("have.length", 1);
          }
        });

      cy.getByAttr("type", "editor")
        .type(
          Array(secondNumberText.length + firstNumberText.length + 2)
            .fill("{backspace}")
            .join("")
        )
        .type("{downarrow}{end}")
        .type(Array(thirdNumberText.length).fill("{backspace}").join(""))
        .type(
          firstNumberText +
            "{enter}" +
            secondNumberText +
            "{enter}" +
            thirdNumberText
        )
        .type("{downarrow}{downarrow}{end}")
        .type(
          Array(fifthNumberText.length + 1)
            .fill("{backspace}")
            .join("")
        )
        .typeTab()
        .type("{uparrow}{end}")
        .typeTab()
        .type("{downarrow}{end}{enter}")
        .type(fifthNumberText);

      /*
         Now the order should look like
              1. firstNumberText
              2. secondNumberText
                1. thirdNumberText
                2.fourthNumberText
                3. fithNumberText
       */
      cy.getByAttr("type", "editor")
      .findByAttr("type", "number-list")
      .each(($el, i, $list) => {
        cy.wrap($list)
          .should("have.length", 5)
          .filterByAttr("depth", 0)
          .should("have.length", 2);
        cy.wrap($list).filterByAttr("depth", 1).should("have.length", 3);

        if (i === 0) {
          cy.wrap($el)
            .should("contain.text", firstNumberText)
            .should("have.attr", "data-cy-depth", 0)
            .findByAttr("label-number", 1)
            .should("have.length", 1);
        } else if (i === 1) {
          cy.wrap($el)
            .should("contain.text", secondNumberText)
            .should("have.attr", "data-cy-depth", 0)
            .findByAttr("label-number", 2)
            .should("have.length", 1);
        } else if (i === 2) {
          cy.wrap($el)
            .should("contain.text", thirdNumberText)
            .should("have.attr", "data-cy-depth", 1)
            .findByAttr("label-number", 1)
            .should("have.length", 1);
        } else if (i === 3) {
          cy.wrap($el)
            .should("contain.text", fourthNumberText)
            .should("have.attr", "data-cy-depth", 1)
            .findByAttr("label-number", 2)
            .should("have.length", 1);
        } else if (i === 4) {
          cy.wrap($el)
            .should("contain.text", fifthNumberText)
            .should("have.attr", "data-cy-depth", 1)
            .findByAttr("label-number", 3)
            .should("have.length", 1);
        }
      });
      cy.getByAttr("type", "editor").type("{uparrow}{uparrow}{uparrow}{uparrow}{end}").typeTab().type("{downarrow}").typeTab();

      /*
        Order should look like 
                1.firstNumberText
                2. secondNumberText
                1. thirdNumberText
                2. fourthNumberText
                3. fifthNumberText
      */    
     cy.getByAttr("type", "editor")
     .findByAttr("type", "number-list")
     .each(($el, i, $list) => {
       cy.wrap($list)
         .should("have.length", 5)
         .filterByAttr("depth", 0)
         .should("have.length", 0);
       cy.wrap($list).filterByAttr("depth", 1).should("have.length", 5);

       if (i === 0) {
         cy.wrap($el)
           .should("contain.text", firstNumberText)
           .should("have.attr", "data-cy-depth", 1)
           .findByAttr("label-number", 1)
           .should("have.length", 1);
       } else if (i === 1) {
         cy.wrap($el)
           .should("contain.text", secondNumberText)
           .should("have.attr", "data-cy-depth", 1)
           .findByAttr("label-number", 2)
           .should("have.length", 1);
       } else if (i === 2) {
         cy.wrap($el)
           .should("contain.text", thirdNumberText)
           .should("have.attr", "data-cy-depth", 1)
           .findByAttr("label-number", 1)
           .should("have.length", 1);
       } else if (i === 3) {
         cy.wrap($el)
           .should("contain.text", fourthNumberText)
           .should("have.attr", "data-cy-depth", 1)
           .findByAttr("label-number", 2)
           .should("have.length", 1);
       } else if (i === 4) {
         cy.wrap($el)
           .should("contain.text", fifthNumberText)
           .should("have.attr", "data-cy-depth", 1)
           .findByAttr("label-number", 3)
           .should("have.length", 1);
       }
     });
    });
  });
});
