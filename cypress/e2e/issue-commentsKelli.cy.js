describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const Textarea = 'textarea[placeholder="Add a comment..."]';
    const IssueComment = '[data-testid="issue-comment"]';

    it('Should create a comment successfully', () => {
        const comment = 'Testig 123';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get(Textarea).type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get(IssueComment).should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const Newcomment = 'Testing 1234 updated now';

        getIssueDetailsModal().within(() => {
            cy.get(IssueComment)
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get(Textarea)
                .should('contain', previousComment)
                .clear()
                .type(Newcomment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get(IssueComment)
                .should('contain', 'Edit')
                .and('contain', Newcomment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find(IssueComment)
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find(IssueComment)
            .should('not.exist');
    });
});
