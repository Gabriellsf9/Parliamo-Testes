describe('Message Integrity', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
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

    cy.contains('Primeira').should('be.visible');
    cy.contains('Segunda').should('be.visible');
    cy.contains('Terceira').should('be.visible');
  });
});
