/// <reference types="cypress" />

describe("costs", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
  });
  it("set balance", () => {
    cy.get('[data-test-id="balance"]').click();
    cy.get("input[type='text']").clear().type("1000").should("have.value", "1000");
    cy.get('[data-test-id="balance-modal"]').click();
  });
  it("good cost", () => {
    cy.get('[data-test-id="operation-card"]').should("have.length", 0);
    cy.get('[data-test-id="categories-card"]').first().click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("100").should("have.value", "100");
    cy.get('[data-test-id="categories-card-open-value"]').should("have.text", "₽ 100");
    cy.get('button[type="submit"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 900");
    cy.get('[data-test-id="categories-card"]')
      .first()
      .within(() => cy.get("p").should("have.text", "₽ 100"));
    cy.get('[data-test-id="finance-card"]')
      .last()
      .within(() => cy.get("p").should("have.text", "₽ 100"));
    cy.get('[data-test-id="operation-card"]').should("have.length", 1);
    cy.get('[data-test-id="operation-card"]')
      .last()
      .within(() => cy.contains("100 ₽"));
  });
  it("second good cost", () => {
    cy.get('[data-test-id="categories-card"]').eq(1).click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("200");
    cy.get('button[type="submit"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 700");
    cy.get('[data-test-id="categories-card"]')
      .eq(1)
      .within(() => cy.get("p").should("have.text", "₽ 200"));
    cy.get('[data-test-id="finance-card"]')
      .last()
      .within(() => cy.get("p").should("have.text", "₽ 300"));
    cy.get('[data-test-id="operation-card"]').should("have.length", 2);
    cy.get('[data-test-id="operation-card"]')
      .last()
      .within(() => cy.contains("200 ₽"));
  });
  it("not enough money", () => {
    cy.get('[data-test-id="categories-card"]').first().click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("2000").should("have.value", "2000");
    cy.get('[data-test-id="categories-card-open-value"]').should("have.text", "₽ 2000");
    cy.contains("Пополните баланс.");
  });
  it("delete first cost operation", () => {
    cy.get('[alt="Удалить"]').first().click();
    cy.contains("Да").click();
    cy.get('[data-test-id="operation-card"]').should("have.length", 1);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 800");
    cy.get('[data-test-id="categories-card"]')
      .first()
      .within(() => cy.get("p").should("have.text", "₽ 0"));
    cy.get('[data-test-id="finance-card"]')
      .last()
      .within(() => cy.get("p").should("have.text", "₽ 200"));
  });
  it("delete second first cost operation", () => {
    cy.get('[alt="Удалить"]').first().click();
    cy.contains("Да").click();
    cy.get('[data-test-id="operation-card"]').should("have.length", 0);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 1000");
    cy.get('[data-test-id="categories-card"]')
      .eq(1)
      .within(() => cy.get("p").should("have.text", "₽ 0"));
    cy.get('[data-test-id="finance-card"]')
      .last()
      .within(() => cy.get("p").should("have.text", "₽ 0"));
  });
  it("add cost category", () => {
    cy.get('[data-test-id="categories-card"]').should("have.length", 12);
    cy.get('[data-test-id="categories-add"]').first().click();
    cy.get('[placeholder="Введите Название"]').type("Новый расход");
    cy.get('[type="Submit"]').click();
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.contains("Новый расход"));
    cy.get('[data-test-id="categories-card"]').eq(11).click();
    cy.get("input[placeholder='Введите Сумму']").clear().type("150");
    cy.get('button[type="submit"]').click();
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 850");
  });
  it("add cost category with long name", () => {
    cy.get('[data-test-id="categories-add"]').first().click();
    cy.get('[placeholder="Введите Название"]').type("Супер пупер мега омега длинное название, которое не влазит");
    cy.contains("Слишком длинное название");
  });
  it("change category name", () => {
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.get("svg").first().click());
    cy.get("input").clear().type("Очень новый доход");
    cy.get('[type="Submit"]').click();
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.contains("Очень новый доход"));
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
  });
  it("change category type", () => {
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.get("svg").first().click());
    cy.get("select").select("Доходы");
    cy.get('[type="Submit"]').click();
    cy.get('[data-test-id="categories-card"]')
      .eq(12)
      .within(() => cy.contains("Очень новый доход"));
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 1150");
  });
  it("change category type back", () => {
    cy.get('[data-test-id="categories-card"]')
      .eq(12)
      .within(() => cy.get("svg").first().click());
    cy.get("select").select("Расходы");
    cy.get('[type="Submit"]').click();
    cy.get('[data-test-id="categories-card"]').should("have.length", 13);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 850");
  });
  it("delete cost category", () => {
    cy.get('[data-test-id="categories-card"]')
      .eq(11)
      .within(() => cy.get("svg").last().click());
    cy.contains("Да").click();
    cy.get('[data-test-id="categories-card"]').should("have.length", 12);
    cy.get('[data-test-id="balance-value"]').should("have.text", "₽ 1000");
  });
});
