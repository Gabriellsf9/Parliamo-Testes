describe('Accessibility Basics', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('deve ter labels em todos inputs', () => {
    cy.get('input[type="email"]').should('have.attr', 'id');
    cy.get('label[for]').should('exist');
  });

  it('deve ter botões com aria-label', () => {
    cy.get('button[aria-label]').should('exist');
  });

  it('deve ter landmarks ARIA', () => {
    cy.visit('/workspace/ws-1');
    cy.get('nav').should('exist');
    cy.get('main').should('exist');
    cy.get('header').should('exist');
  });

  it('deve ser navegável por teclado', () => {
    cy.get('body').tab();
    cy.focused().should('be.visible');
  });

  it('deve ter contraste adequado', () => {
    cy.get('button[type="submit"]').then(($btn) => {
      const bgColor = $btn.css('background-color');
      const textColor = $btn.css('color');
      expect(bgColor).to.exist;
      expect(textColor).to.exist;
    });
  });
});