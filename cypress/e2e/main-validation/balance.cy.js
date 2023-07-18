/// <reference types="cypress" />

describe("balance", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
  });

  it("good number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("123").should("have.value", "123");
    cy.get('[data-test-id="balance-modal"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 123");
  });
  it("good fractional number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("0.12").should("have.value", "0.12");
    cy.get('[data-test-id="balance-modal"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 0.12");
  });
  it("big fractional number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("7.932").should("have.value", "7.932");
    cy.contains("Дробная часть только до сотых.");
  });
  it("negative number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("-928").should("have.value", "-928");
    cy.contains("Только положительные числа");
  });
  it("not number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("some-text").should("have.value", "some-text");
    cy.contains("Только числа.");
    cy.get("input[type='text']").clear().type("{}[]:><&*").should("have.value", "{}[]:><&*");
    cy.contains("Только числа.");
  });
  it("long number", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("1234567891234567").should("have.value", "1234567891234567");
    cy.contains("Максимум 15 символов.");
  });
});
