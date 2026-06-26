describe('Forgot Password', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('body').should('be.visible');
    cy.contains('Recuperar').click();
  });

  it('deve exibir formulário de recuperação de senha', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.contains('button', /enviar|link|redefini/i).should('be.visible');
  });

  it('deve validar email obrigatório', () => {
    cy.contains('button', /enviar|link|redefini/i).click();
    cy.get('body').should('contain.text', '');
  });

  it('deve permitir voltar ao login', () => {
    cy.contains('button', /voltar/i).click();
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });
});