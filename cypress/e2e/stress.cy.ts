describe('Stress Tests', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('deve lidar com envio rápido de mensagens', () => {
    cy.get('a[href*="/channel/"]').first().click();
    for (let i = 0; i < 5; i++) {
      cy.get('textarea[placeholder*="Mensagem em"]').type(`Mensagem stress ${i}`);
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
      cy.wait(300);
    }
    cy.contains('Mensagem stress 0').should('be.visible');
    cy.contains('Mensagem stress 4').should('be.visible');
  });

  it('deve lidar com múltiplas abas', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste aba');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste aba').should('be.visible');
  });
});
