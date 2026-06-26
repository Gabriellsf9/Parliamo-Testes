describe('Workspace Navigation', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve navegar entre canais', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
    const firstUrl = cy.url();
    cy.get('a[href*="/channel/"]').eq(1).click({ force: true });
    cy.url().should('not.equal', firstUrl);
  });

  it('deve navegar para DM', () => {
    cy.get('[href*="/dm/"]').first().click({ force: true });
    cy.url().should('include', '/dm/');
  });

  it('deve abrir command palette', () => {
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
  });

  it('deve executar comando de novo grupo', () => {
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('novo grupo');
    cy.contains('Novo grupo').click({ force: true });
    cy.get('[data-testid="create-channel-modal"]').should('be.visible');
  });
});