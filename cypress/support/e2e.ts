import './commands';

beforeEach(() => {
  cy.viewport(1280, 720);
});

// Ignore common app-level errors that shouldn't cause test failures
Cypress.on('uncaught:exception', (err) => {
  // React hydration errors (418, 423, 425) happen when viewport changes rapidly
  if (err.message.includes('Minified React error')) {
    return false;
  }
  // Ignore Next.js navigation errors
  if (err.message.includes('Cancel rendering route')) {
    return false;
  }
  // Ignore ResizeObserver loop errors
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
  return true;
});

afterEach(() => {
  if (Cypress.config('video')) {
    cy.screenshot();
  }
});
