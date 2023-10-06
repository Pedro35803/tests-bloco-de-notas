import { v4 as uuidv4 } from "uuid";

describe("Testes envolvendo realizar login", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Realizando login com sucesso", () => {
        const email = `${uuidv4()}@gmail.com`;

        cy.intercept({ method: "POST" }).as("methodPost");

        cy.get(`[data-cy="login-redirect_register"]`).click();
        cy.register(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);

        // cy.get(`[data-cy="register-redirect_login"]`).click();
        cy.login(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);
    });
});
