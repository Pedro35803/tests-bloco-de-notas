import { v4 as uuidv4 } from "uuid";

const email = `${uuidv4()}@gmail.com`;

describe("Testes envolvendo realizar login", () => {
    before(() => {
        cy.visit("/");
        cy.intercept({ method: "POST" }).as("methodPost");

        cy.get(`[data-cy="login-redirect_register"]`).click();
        cy.register(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);
    });

    beforeEach(() => {
        cy.visit("/");
        cy.intercept({ method: "POST" }).as("methodPost");
    });

    it("Realizando login com sucesso", () => {
        cy.login(email);
        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);
    });

    it("Verificando se mensagens de error estão corretas", () => {
        const wrongEmail = `${uuidv4()}@hortmail.com`;
        cy.login(wrongEmail);
        cy.wait("@methodPost").its("response.statusCode").should("not.eq", 201);
        cy.wait(500);
        cy.get("p.text-tertiary").each((element) =>
            cy.wrap(element).should("be.visible")
        );
    });

    it("Deslogando com sucesso após realizar login", () => {
        cy.login(email);
        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);

        cy.get(`[data-cy="logout"]`).click();
        cy.url().should("include", "/login");
    });
});
