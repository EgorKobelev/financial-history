/// <reference types="cypress" />

describe("account", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
    cy.visit("/profile");
    cy.wait(1000);
  });

  it("change-name", () => {
    cy.contains("test");
    cy.get('[alt="Отредактировать"]').first().click({ force: true });
    cy.get('[placeholder="Имя"]').click().clear().type("test2");
    cy.get('button[type="submit"]').click();
    cy.get('[alt="кнопка выхода"]').click();
    cy.clearLocalStorage();
    cy.visit("/login");
    cy.wait(500);
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
    cy.visit("/profile");
    cy.wait(500);
    cy.contains("test2");
    cy.get('[alt="Отредактировать"]').first().click({ force: true });
    cy.get('[placeholder="Имя"]').clear().type("test");
    cy.get('button[type="submit"]').click();
  });
  it("change-email", () => {
    cy.get('[alt="Отредактировать"]').eq(1).click({ force: true });
    cy.get('[placeholder="Почта"]').clear().type("test2@gmail.com");
    cy.get('button[type="submit"]').click();
    cy.get('[alt="кнопка выхода"]').click();
    cy.clearLocalStorage();
    cy.visit("/login");
    cy.wait(500);
    cy.get('[data-test-id="email"]').type("test2@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyu");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
    cy.visit("/profile");
    cy.wait(500);
    cy.get('[alt="Отредактировать"]').eq(1).click({ force: true });
    cy.get('[placeholder="Почта"]').should("have.value", "test2@gmail.com").clear().type("test@gmail.com");
    cy.get('button[type="submit"]').click();
  });
  it("change-password", () => {
    cy.get('[alt="Отредактировать"]').last().click({ force: true });
    cy.get('[placeholder="Новый Пароль"]').type("qwertyui");
    cy.get('button[type="submit"]').click();
    cy.get('[alt="кнопка выхода"]').click();
    cy.clearLocalStorage();
    cy.visit("/login");
    cy.wait(500);
    cy.get('[data-test-id="email"]').type("test@gmail.com");
    cy.get('[data-test-id="password"]').type("qwertyui");
    cy.get('[data-test-id="login-button"]').click();
    cy.wait(500);
    cy.visit("/profile");
    cy.wait(500);
    cy.get('[alt="Отредактировать"]').last().click({ force: true });
    cy.get('[placeholder="Новый Пароль"]').clear().type("qwertyu");
    cy.get('button[type="submit"]').click();
  });
});
