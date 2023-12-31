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
        cy.get(`[data-cy="modal-title"]`).type(title);
        cy.get(`[data-cy="modal-content"]`).type(content);
        
        cy.intercept({ method: "POST" }).as("methodPost");
        cy.get(`[data-cy="modal-action"]`).click()
        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
    })

});
