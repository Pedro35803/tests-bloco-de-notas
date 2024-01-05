import { v4 as uuidv4 } from "uuid";

describe("Testes envolvendo notepads", () => {
    beforeEach(() => {
        cy.visit("/");
        const email = `${uuidv4()}@gmail.com`;

        cy.get(`[data-cy="login-redirect_register"]`).click();

        cy.intercept({ method: "POST", url: "api/v1/*" }).as("routerPost");

        cy.register(email);
        cy.wait("@routerPost").its("response.statusCode").should("eq", 201);

        cy.wait(500);

        cy.login(email);
        cy.wait("@routerPost").its("response.statusCode").should("eq", 201);
        cy.wait(500);
        cy.visit("/");
        cy.wait(500);
    });

    it("Criação de novo notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click();

        const title = "Teste";
        const content = uuidv4();

        cy.intercept({ method: "POST", url: "api/v1/user/me/notepads" }).as(
            "notepadPost"
        );
        cy.formModal(title, content);
        cy.wait("@notepadPost").as("response");
        cy.get("@response").its("response.statusCode").should("eq", 201);
        cy.get("@response")
            .its("response.body.id")
            .then((id) => cy.verifyNotepad({ id, title, content }));
    });

    it("Verificando mensagem de error ao tentar criar novo notepad sem titulo", () => {
        cy.get(`[data-cy="add-notepad"]`).click();
        cy.get(`[data-cy="modal-action"]:visible`).click();
        cy.contains("p", "É nescessário informar o titulo").should(
            "be.visible"
        );
    });

    it("Edição de notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click();

        const title = "Title Primary";
        const content = uuidv4();

        cy.intercept({ method: "POST", url: "api/v1/user/me/notepads" }).as(
            "notepadPost"
        );
        cy.formModal(title, content);
        cy.wait("@notepadPost")
            .its("response.body.id")
            .then((id) => {
                cy.verifyNotepad({ id, title, content });
                const selectorNotepad = `[data-cy="notepad-${id}"]`;
                cy.get(`${selectorNotepad} [data-cy="notepad-edit"]`).click();

                const titleUpdate = "Title Update";

                cy.intercept({
                    method: "PATCH",
                    url: `api/v1/user/me/notepads/${id}`,
                }).as("notepadPatch");
                cy.formModal(titleUpdate, content);

                cy.wait("@notepadPatch")
                    .its("response.statusCode")
                    .should("eq", 203);
                cy.verifyNotepad({ id, title: titleUpdate, content });
            });
    });

    it("Excluindo notepad com sucesso", () => {
        cy.get(`[data-cy="add-notepad"]`).click();

        const title = "Title";
        const content = uuidv4();

        cy.intercept({ method: "POST", url: "api/v1/user/me/notepads" }).as(
            "notepadPost"
        );
        cy.formModal(title, content);
        // cy.wait("@notepadPost").its("response.statusCode").should("eq", 201);
        cy.wait("@notepadPost").its("response.body.id").as("idNotepad");
        cy.get("@idNotepad").then((id) => {
            cy.verifyNotepad({ id, title, content });
            const selectorNotepad = `[data-cy="notepad-${id}"]`;
            cy.get(`${selectorNotepad} [data-cy="notepad-delete"]`).click();

            cy.intercept({
                method: "DELETE",
                url: `api/v1/user/me/notepads/${id}`,
            }).as("notepadDelete");

            cy.get(`[data-cy="modal-action"]:visible`).click();

            cy.wait("@notepadDelete")
                .its("response.statusCode")
                .should("eq", 204);
            cy.get(selectorNotepad).should("not.exist");
        });
    });
});
