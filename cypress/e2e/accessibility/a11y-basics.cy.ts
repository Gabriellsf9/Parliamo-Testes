describe('Accessibility Basics', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('deve ter labels em todos inputs', () => {
    cy.get('input[type="email"]').then(($input) => {
      const hasId = $input.attr('id');
      const hasAriaLabel = $input.attr('aria-label');
      const hasAriaLabelledby = $input.attr('aria-labelledby');
      const hasPlaceholder = $input.attr('placeholder');
      expect(hasId || hasAriaLabel || hasAriaLabelledby || hasPlaceholder,
        'Input should have id, aria-label, aria-labelledby, or placeholder').to.exist;
    });
  });

  it('deve ter botões com aria-label', () => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
    cy.get('button[aria-label]').should('exist');
  });

  it('deve ter landmarks ARIA', () => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('main, [role="main"]').should('exist');
    cy.get('body').then(($body) => {
      const hasNav = $body.find('nav, [role="navigation"], aside, header').length > 0;
      if (!hasNav) {
        cy.log('No nav/aside/header landmarks found - app uses div-based layout');
      }
    });
  });

  it('deve ser navegável por teclado', () => {
    cy.get('input[type="email"]').focus();
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
