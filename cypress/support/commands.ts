/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): void;
      getByTestId(testId: string): Chainable;
      pageIsReady(): void;
      waitForLoading(): void;
      dismissCookieConsent(): void;
    }
  }
}

Cypress.Commands.add('dismissCookieConsent', () => {
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="cookie-consent-reject"]').length > 0) {
      cy.get('[data-testid="cookie-consent-reject"]').click({ force: true });
    }
  });
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('pageIsReady', () => {
  cy.get('body', { timeout: 15000 }).should('be.visible');
  cy.document().its('body').should('not.be.empty');
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/auth/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem('parliamo:cookie_consent', 'rejected');
      }
    });
    cy.get('input[type="email"]').clear().type(email);
    cy.get('input[type="password"]').clear().type(password);
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
    cy.window().then((win) => {
      win.localStorage.setItem('parliamo:cookie_consent', 'rejected');
    });
  }, { cacheAcrossSpecs: true });
});

Cypress.Commands.add('waitForLoading', () => {
  cy.get('body').should('be.visible');
  cy.wait(500);
});

Cypress.Commands.overwrite('visit', function(originalFn: any, url: any, options: any) {
  const originalOnBeforeLoad = options?.onBeforeLoad;
  const patchedOptions = {
    ...options,
    onBeforeLoad(win: Cypress.AUTWindow) {
      win.localStorage.setItem('parliamo:cookie_consent', 'rejected');
      if (typeof originalOnBeforeLoad === 'function') {
        originalOnBeforeLoad(win);
      }
    }
  };
  return originalFn(url, patchedOptions);
});
