import { v4 as uuidv4 } from "uuid";

describe("Testes envolvendo notepads", () => {
    before(() => {
        cy.visit("/");
        const email = `${uuidv4()}@gmail.com`;

        cy.intercept({ method: "POST" }).as("methodPost");

        cy.get(`[data-cy="login-redirect_register"]`).click();
        cy.register(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);

        // cy.get(`[data-cy="register-redirect_login"]`).click();
        cy.login(email);

        cy.wait("@methodPost").its("response.statusCode").should("eq", 201);
    })

    beforeEach(() => {
        cy.visit("/");
    })

    it("Criação de novo notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click()
        
        const content = uuidv4()
        cy.formModal("Teste", content)

        cy.get(`[data-cy="notepad"]`).each(notepad => {
            cy.wrap(notepad).within(() => {
                cy.get(`[data-cy="notepad-title"]`).should("be.visible").and("eq", "Title")
                cy.get(`[data-cy="notepad-content"]`).should("be.visible").and("eq", content)
            })
        })
    })

    it("Verificando mensagem de error ao tentar criar novo notepad sem titulo", () => {
        cy.get(`[data-cy="add-notepad"]`).click()
        
        cy.get("modal-action").click();

        cy.contain("p", "É nescessário informar o titulo").should("be.visible")
    })

    it("Edição de notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click()
        
        const content = uuidv4()
        cy.formModal("Teste", content)

        cy.get(`[data-cy="notepad-title"]`).should("be.visible").and("eq", "Title")
        cy.get(`[data-cy="notepad-content"]`).should("be.visible").and("eq", content)
    })

    it("Excluindo notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click()
        
        const content = uuidv4()
        cy.formModal("Teste", content)

        
    })
})