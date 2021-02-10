/// <reference types="cypress" />

describe("Checking Editor Normal Behaviour", () => {
  it("Vists the webiste", () => {
    cy.visit("/");
    cy.get("[role=textbox]")
      .type("Hello this is normal")
      .click()
      .type("This is second normal")
      .contains("")
  });
});
