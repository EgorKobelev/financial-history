/// <reference types="cypress" />

describe("gains", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("1000");
    cy.get('[data-test-id="balance-modal"]').click();
  });

  it("good gain", () => {
    cy.get('[data-test-id="categories-card"]').last().click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("100").should("have.value", "100");
    cy.get('[data-test-id="categories-card-open-value"]').should("have.text", "₽ 100");
    cy.get('button[type="submit"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 1100");
    cy.get('[data-test-id="categories-card-value"]').last().should("have.text", "₽ 100");
  });
  it("delete gain operation", () => {
    cy.get('[alt="Удалить"]').should("have.length", 1);
    cy.get('[alt="Удалить"]').last().click();
    cy.contains("Да").click();
    cy.get('[alt="Удалить"]').should("have.length", 0);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 900");
  });
});
