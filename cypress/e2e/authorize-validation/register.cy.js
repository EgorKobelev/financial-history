/// <reference types="cypress" />

describe("register", () => {
  beforeEach(() => {
    cy.visit("/register");
  });
  it("should get error message that email is incorrect", () => {
    cy.get('[data-test-id="email"]').as("email");
    cy.get("@email").type("test");
    cy.contains("Некорректная почта.");
  });
  it("should get error message that password is incorrect", () => {
    cy.get('[data-test-id="password"]').as("password");
    cy.get("@password").type("12345");
    cy.contains("Минимум 6 символов.");
    cy.get("@password").type("1234567");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
    cy.get("@password").type("ываврылары");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
  });
  it("should get error message that passwords don't match", () => {
    cy.get('[data-test-id="password"]').as("password");
    cy.get("@password").type("12345");
    cy.contains("Минимум 6 символов.");
    cy.get("@password").type("1234567");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
    cy.get("@password").type("ываврылары");
    cy.contains("Должны быть буквы латинского алфавита. Может включать цифры и символы.");
  });
});
