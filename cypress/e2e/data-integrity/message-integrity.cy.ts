describe('Message Integrity', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve persistir mensagem após envio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem persistência');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem persistência').should('be.visible');
    
    cy.reload();
    cy.contains('Mensagem persistência').should('be.visible');
  });

  it('deve manter ordem cronológica', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Primeira');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').type('Segunda');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').type('Terceira');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    
    cy.get('[data-testid="message-list"]').within(() => {
      cy.contains('Primeira').should('be.visible');
      cy.contains('Segunda').should('be.visible');
      cy.contains('Terceira').should('be.visible');
    });
  });
});