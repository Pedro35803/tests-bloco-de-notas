import { v4 as uuidv4 } from "uuid";

describe("Testes envolvendo registro de usuário", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get(`[data-cy="login-redirect_register"]`).click();
    });

    it("Registrando novo usuário com sucesso", () => {
        const email = `${uuidv4()}@gmail.com`;

        cy.intercept({ method: "POST" }).as("routerPost");
        cy.register(email);

        cy.wait("@routerPost").its("response.statusCode").should("eq", 201);
        // cy.url().should("not.include", "/register");
    });

    it("Inpedindo registro de novo usuário se já existir", () => {
        const email = uuidv4();

        cy.intercept({ method: "POST" }).as("routerPost");
        cy.register(email);

        cy.wait("@routerPost").its("response.statusCode").should("eq", 201);
        cy.url().should("not.include", "/register");
    });
});
