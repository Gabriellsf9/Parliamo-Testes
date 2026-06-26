describe('Workspace Sidebar', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve exibir lista de canais na sidebar', () => {
    cy.get('a[href*="/channel/"]').should('have.length.at.least', 1);
  });

  it('deve conter # no nome dos canais', () => {
    cy.get('a[href*="/channel/"]').first().should('contain', '#');
  });

  it('deve navegar para canal ao clicar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
  });

  it('deve expandir/recolher seção de canais', () => {
    cy.get('button[aria-label*="recolher"], button[aria-label*="expandir"]').first().click({ force: true });
  });

  it('deve criar novo canal', () => {
    cy.get('button[title*="Novo canal"], button[aria-label*="novo canal"]').click({ force: true });
    cy.get('input[placeholder*="nome do canal"]').type('novo-canal-teste');
    cy.contains('Criar').click({ force: true });
    cy.contains('#novo-canal-teste').should('be.visible');
  });

  it('deve buscar canais na sidebar', () => {
    cy.get('button[aria-label*="pesquisar"]').click({ force: true });
    cy.get('input[placeholder*="pesquisar"]').type('geral');
    cy.get('a[href*="/channel/"]').should('be.visible');
  });
});