describe('Loading Performance', () => {
  it('deve carregar login em menos de 10s', () => {
    const start = Date.now();
    cy.visit('/auth/login');
    cy.get('input[type="email"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(10000);
    });
  });

  it('deve carregar workspace em menos de 15s', () => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    const start = Date.now();
    cy.visit('/auth/login');
    cy.get('a[href*="/channel/"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(15000);
    });
  });

  it('deve carregar canal em menos de 10s', () => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
    const start = Date.now();
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(10000);
    });
  });
});
