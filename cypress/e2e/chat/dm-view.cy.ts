describe('DM View', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve carregar o canal corretamente', () => {
    cy.get('a[href*="/channel/"]').should('exist');
  });

  it('deve navegar para o canal ao clicar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
  });

  it('deve ter input de mensagem no canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
  });

  it('deve abrir DM ao clicar em usuário na sidebar', () => {
    cy.get('[href*="/dm/"]').first().click({ force: true });
    cy.url().should('include', '/dm/');
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
  });

  it('deve enviar mensagem em DM', () => {
    cy.get('[href*="/dm/"]').first().click({ force: true });
    cy.url().should('include', '/dm/');
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem privada');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem privada').should('be.visible');
  });

  it('deve alternar entre canal e DM', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
    cy.get('[href*="/dm/"]').first().click({ force: true });
    cy.url().should('include', '/dm/');
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
  });
});