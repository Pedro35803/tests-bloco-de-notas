Cypress.Commands.add("login", (email) => {
    cy.get(`[data-cy="login-email"]`).type(email);
    cy.get(`[data-cy="login-password"]`).type(Cypress.env("password"));
    cy.get(`[data-cy="login-save"]`).click();
});

Cypress.Commands.add("register", (email) => {
    cy.get(`[data-cy="register-name"]`).type(Cypress.env("username"));
    cy.get(`[data-cy="register-email"]`).type(email);
    cy.get(`[data-cy="register-password"]`).type(Cypress.env("password"));
    cy.get(`[data-cy="register-password_confirm"]`).type(
        Cypress.env("password")
    );
    cy.get(`[data-cy="register-save"]`).click();
});

Cypress.Commands.add("formModal", (title, content) => {
    cy.get(`[data-cy="modal-form"]:visible`).within(() => {
        cy.get(`[data-cy="modal-title"]`).clear().type(title);
        cy.get(`[data-cy="modal-content"]`).clear().type(content);
        cy.get(`[data-cy="modal-action"]`).click();
    });
});

Cypress.Commands.add("verifyNotepad", ({ id, title, content }) => {
    cy.get(`[data-cy="notepad-${id}"]`).within(() => {
        cy.get(`[data-cy="notepad-title"]`)
            .should("be.visible")
            .invoke("text")
            .should("eq", title);
        cy.get(`[data-cy="notepad-content"]`)
            .should("be.visible")
            .invoke("text")
            .should("eq", content);
    });
})