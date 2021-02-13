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
    const firstNumberText = "The number should be one";
    const secondNumberText = "The number Should be two";
    const thirdNumberText = "THe number should be three";

    it("The number should increase with value", () => {
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
    });
  });
});
