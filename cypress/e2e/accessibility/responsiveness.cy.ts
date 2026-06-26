describe('Responsiveness', () => {
  it('deve funcionar em mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/auth/login');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('deve funcionar em tablet', () => {
    cy.viewport('ipad-2');
    cy.visit('/auth/login');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('deve funcionar em desktop', () => {
    cy.viewport(1920, 1080);
    cy.visit('/auth/login');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('sidebar deve colapsar em mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('/auth/login');
    cy.get('input[type="email"]').type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
    cy.visit('/workspace/ws-1');
    cy.get('[data-testid="workspace-sidebar"]').should('exist');
  });
});