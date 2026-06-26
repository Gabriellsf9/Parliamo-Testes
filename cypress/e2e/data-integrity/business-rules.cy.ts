describe('Business Rules', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve limitar tamanho da mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    const longMessage = 'a'.repeat(5000);
    cy.get('textarea[placeholder*="Mensagem em"]').type(longMessage);
    cy.get('button[type="submit"][style*="parliamo-accent"]').should('be.disabled');
  });

  it('deve impedir duplicação de canais', () => {
    cy.get('button[title*="Novo canal"]').click({ force: true });
    cy.get('input[placeholder*="nome do canal"]').type('geral');
    cy.contains('Criar').click({ force: true });
    cy.contains(/já existe|duplicado/i)).should('be.visible');
  });

  it('deve validar nome de canal', () => {
    cy.get('button[title*="Novo canal"]').click({ force: true });
    cy.get('input[placeholder*="nome do canal"]').type('Canal Inválido!');
    cy.contains('Criar').click({ force: true });
    cy.contains(/inválido|formato/i).should('be.visible');
  });
});