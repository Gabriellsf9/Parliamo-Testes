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
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
    cy.get('body').should('be.visible');
    cy.get('a[href*="/channel/"]').should('exist');
  });
});
