/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should get message that email is incorrect", () => {
    cy.get('[data-test-id="email"]').type("test");
    cy.contains("Некорректная почта.");
  });
});
