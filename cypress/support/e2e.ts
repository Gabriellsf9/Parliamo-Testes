import './commands';

beforeEach(() => {
  cy.viewport(1280, 720);
});

afterEach(() => {
  if (Cypress.config('video')) {
    cy.screenshot();
  }
});