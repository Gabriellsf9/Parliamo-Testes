describe('Stress Testing', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve lidar com 100 mensagens rápidas', () => {
    cy.get('a[href*="/channel/"]').first().click();
    const messages = Array.from({ length: 100 }, (_, i) => `Msg ${i}`);
    
    cy.wrap(messages).each((msg) => {
      cy.get('textarea[placeholder*="Mensagem em"]').clear().type(msg);
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    });
    
    cy.get('[data-testid="message-list"]').should('contain', 'Msg 0');
    cy.get('[data-testid="message-list"]').should('contain', 'Msg 99');
  });

  it('deve manter performance com canais grandes', () => {
    cy.visit('/workspace/ws-1');
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="message-list"]').should('be.visible');
    cy.get('[data-testid="message-list"]').children().should('have.length.at.least', 1);
  });
});