/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("/register");
  });
  it("should get message that email is incorrect", () => {
    cy.get('[data-test-id="email"]').as("email");
    cy.get("@email").type("test");
    cy.contains("Некорректная почта.");
  });
});
