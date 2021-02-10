/// <reference types="cypress" />

describe("Checking Editor Normal Behaviour", () => {
  it("Vists the webiste", () => {
    cy.visit("/");
    cy.get(`[data-cy-type=editor`).type("This is first unordered list")
    .type("{enter}").type("This is second unordered list")

    cy.get("[data-cy-type=editor]").find("[data-cy-icon=bullet]")
  });
});
