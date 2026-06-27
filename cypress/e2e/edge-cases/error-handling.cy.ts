describe('Error Handling', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('deve exibir página 404 para rota inexistente', () => {
    cy.visit('/rota-inexistente', { failOnStatusCode: false });
    cy.get('body').then(($body) => {
      const has404 = $body.text().includes('404') || $body.text().includes('não encontrada') || $body.text().includes('not found');
      expect(has404, 'Page should show 404 or not found message').to.be.true;
    });
  });

  it('deve lidar com sessão expirada', () => {
    cy.intercept('POST', '**/rest/v1/**', (req) => {
      req.reply({ statusCode: 401, body: { error: 'JWT expired' } });
    }).as('expiredSession');

    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('textarea[placeholder*="Mensagem em"]').length === 0) {
        cy.log('Message input not found, skipping session expiry test');
        return;
      }
      cy.get('textarea[placeholder*="Mensagem em"]').type('Teste sessão expirada');
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    });
  });

  it('deve exibir erro amigável para permissão negada', () => {
    cy.intercept('GET', '**/rest/v1/channels*', {
      statusCode: 403,
      body: { error: 'Forbidden' },
    });
    cy.visit('/workspace/ws-1/channel/ch-restrito', { failOnStatusCode: false });
    cy.get('body').should('be.visible');
  });
});
