/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("should get message that email is incorrect", () => {
    cy.get('[data-test-id="email"]').as("email");
    cy.get("@email").type("test");
    cy.contains("Некорректная почта.");
  });
  it("should get message that password is incorrect", () => {
    cy.get('[data-test-id="password"]').as("password");
    cy.get("@password").type("12345");
    cy.contains("Минимум 6 символов.");
    cy.get("@password").type("1234567");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
    cy.get("@password").type("ываврылары");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
  });
  it("submit button should be enabled when data is correct", () => {
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("asdjnakfsd");
    cy.get('[data-test-id="login-button"]').should("be.enabled");
  });
});
