import { v4 as uuidv4 } from "uuid";

describe("Testes envolvendo realizar login", () => {
    it("Realizando login com sucesso", () => {
        const email = uuidv4();

        cy.intercept({ method: "POST" }).as("methodPost");

        cy.get(`[data-cy="login-redirect_register"]`).click();
        cy.register(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);

        cy.get(`[data-cy="account-redirect_login"]`).click();
        cy.login(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);
    });
});
