Cypress.Commands.add("login", (email) => {
    cy.get(`[data-cy="login-email"]`).type(email);
    cy.get(`[data-cy="login-password"]`).type(Cypress.env("password"));
    cy.get(`[data-cy="login-save"]`).click();
})

Cypress.Commands.add("register", (email) => {
    cy.get(`[data-cy="register-name"]`).type(Cypress.env("username"));
    cy.get(`[data-cy="register-email"]`).type(email);
    cy.get(`[data-cy="register-password"]`).type(Cypress.env("password"));
    cy.get(`[data-cy="register-password_confirm"]`).type(Cypress.env("password"));
    cy.get(`[data-cy="register-save"]`).click();
})