describe('Loading Performance', () => {
  it('deve carregar login em menos de 3s', () => {
    const start = Date.now();
    cy.visit('/auth/login');
    cy.get('input[type="email"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(3000);
    });
  });

  it('deve carregar workspace em menos de 5s', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    
    const start = Date.now();
    cy.visit('/workspace/ws-1');
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(5000);
    });
  });

  it('deve carregar canal em menos de 3s', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar").click({ force: true });
    
    const start = Date.now();
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
    cy.then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(3000);
    });
  });
});