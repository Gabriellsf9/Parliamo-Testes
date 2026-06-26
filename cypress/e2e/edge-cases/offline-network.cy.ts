describe('Offline Network', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve exibir indicador offline', () => {
    cy.window().then((win) => {
      win.dispatchEvent(new Event('offline'));
    });
    cy.contains(/offline|sem conexão/i).should('be.visible');
  });

  it('deve exibir indicador de reconexão', () => {
    cy.window().then((win) => {
      win.dispatchEvent(new Event('offline'));
    });
    cy.contains(/offline|sem conexão/i).should('be.visible');
    
    cy.window().then((win) => {
      win.dispatchEvent(new Event('online'));
    });
    cy.contains(/reconectando|reconectar/i).should('be.visible');
  });

  it('deve manter mensagens pendentes offline', () => {
    cy.intercept('POST', '**/rest/v1/messages', { forceNetworkError: true }).as('networkError');
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem offline');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click();
    cy.wait('@networkError');
    cy.contains(/offline|pendente|salvo localmente/i).should('be.visible');
  });
});