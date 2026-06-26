describe('Error Handling', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve exibir página 404 para rota inexistente', () => {
    cy.visit('/rota-inexistente', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
  });

  it('deve lidar com sessão expirada', () => {
    cy.intercept('POST', '**/rest/v1/v1/v1/messages', (req) => {
      req.reply({ statusCode: 401, body: { error: 'JWT expired' } });
    }).as('expiredSession');
    
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste sessão expirada');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click();
    cy.wait('@expiredSession');
    cy.url({ timeout: 10000 }).should('include', '/auth/login');
  });

  it('deve exibir erro amigável para permissão negada', () => {
    cy.intercept('GET', '**/rest/v1/channels*', {
      statusCode: 403,
      body: { error: 'Forbidden' },
    });
    cy.visit('/workspace/ws-1/channel/ch-restrito', { failOnStatusCode: false });
    cy.contains('permissão').should('be.visible');
  });
});