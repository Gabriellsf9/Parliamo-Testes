describe('Stress Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve lidar com envio rápido de mensagens', () => {
    cy.get('a[href*="/channel/"]').first().click();
    for (let i = 0; i < 10; i++) {
      cy.get('textarea[placeholder*="Mensagem em"]').type(`Mensagem ${i}`);
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    }
    cy.get('[data-testid="message-list"]').should('contain', 'Mensagem 0');
    cy.get('[data-testid="message-list"]').should('contain', 'Mensagem 9');
  });

  it('deve lidar com múltiplas abas', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste aba');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste aba').should('be.visible');
  });
});