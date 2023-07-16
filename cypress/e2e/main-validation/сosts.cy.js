/// <reference types="cypress" />

describe("costs", () => {
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

  it("good cost", () => {
    cy.get('[data-test-id="categories-card"]').first().click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("100").should("have.value", "100");
    cy.get('[data-test-id="categories-card-open-value"]').should("have.text", "₽ 100");
    cy.get('button[type="submit"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 900");
    // cy.get('[data-test-id="categories-card-value"]').first().should("have.text", "₽ 100");
  });
  it("not enough money", () => {
    cy.get('[data-test-id="categories-card"]').first().click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("2000").should("have.value", "2000");
    cy.get('[data-test-id="categories-card-open-value"]').should("have.text", "₽ 2000");
    cy.contains("Пополните баланс.");
  });
  it("delete cost operation", () => {
    cy.get('[alt="Удалить"]').should("have.length", 1);
    cy.get('[alt="Удалить"]').first().click();
    cy.contains("Да").click();
    cy.get('[alt="Удалить"]').should("have.length", 0);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 1100");
  });
  it("add cost category", () => {
    cy.get('[data-test-id="categories-card"]').should("have.length", 12);
    cy.get('[data-test-id="categories-add"]').first().click();
    cy.get('[placeholder="Введите Название"]').type("Новый доход");
    cy.get('[type="Submit"]').click();
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
  });
  it("delete cost category", () => {
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.get('svg[width="10"]').click());
    cy.contains("Да").click();
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
  });
});
