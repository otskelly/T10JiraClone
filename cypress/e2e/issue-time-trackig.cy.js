//Time estimation
describe('Issue time', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
     
    });
  });

  const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
  const getTimeTrackingModal = () =>
  cy.get('[data-testid="modal:tracking"]');
  const StopWatch = '[data-testid="icon:stopwatch"]';
  const AddTime = '[placeholder="Number"]'
  const EstimateTime= '25'
  const EditEstimateTime= '17'
  const TimeSpent='12'
  const TimeSpentEdited='13'
  const TimeRemaining = '5'
  const TimeRemainingEdited = '4'


it('Add, edit and remove estimate time', () => {
//Adding estimate time
  getIssueDetailsModal().within(() => {
    cy.get(AddTime).clear().type(EstimateTime);
    cy.contains('25h estimated').should('be.visible');
});
// Editing estimate time
  getIssueDetailsModal().within(() => {
    cy.get(AddTime).clear().type(EditEstimateTime);
    cy.contains('17h estimated').should('be.visible');
});

// Remove estimate time
  getIssueDetailsModal().within(() => {
    cy.get(AddTime).clear();
    cy.contains('estimated').should('not.exist');
});

});

//Time Logging Functionality
it('Add, edit and remove logged time', () => {
  //Add logged time
  cy.get(StopWatch).click();
  getTimeTrackingModal().within(() => {
    cy.get('input[placeholder="Number"][value="4"]').clear().type(TimeSpent);
    cy.get('input[placeholder="Number"][value=""]').type(TimeRemaining);
    cy.contains('button', 'Done').click();   
  });
    cy.contains('12h logged').should('be.visible');
    cy.contains('5h remaining').should('be.visible');


//Edit logged time
cy.get(StopWatch).click();
getTimeTrackingModal().within(() => {
  cy.get('[placeholder="Number"][value="12"]').clear().type(TimeSpentEdited);
  cy.get('[placeholder="Number"][value="5"]').clear().type(TimeRemainingEdited);
  cy.contains('button', 'Done').click();
});
  cy.contains('13h logged').should('be.visible');
  cy.contains('4h remaining').should('be.visible');

//Remove logged time
cy.get(StopWatch).click();
getTimeTrackingModal().within(() => {
  cy.get('input[placeholder="Number"][value="13"]').clear();
  cy.get('[placeholder="Number"][value="4"]').clear();
  cy.contains('button', 'Done').click();
});
  cy.contains('No time logged').should('be.visible');
  cy.contains('8h estimated').should('be.visible')
  cy.contains('6h remaining').should('not.exist');
});
});
