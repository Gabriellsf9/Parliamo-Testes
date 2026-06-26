describe('MFA', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('body').should('be.visible');
  });

  it('deve exibir formulário MFA com campo de código', () => {
    cy.contains('MFA').click();
    cy.get('input[type="text"][maxlength="6"]').should('be.visible');
    cy.contains('button', /verificar|confirmar/i).should('be.visible');
  });

  it('deve validar código obrigatório', () => {
    cy.contains('MFA').click();
    cy.contains('button', /verificar|confirmar/i).click();
    cy.contains(/obrigatório|required|inválido|error/i).should('be.visible');
  });

  it('deve validar código de 6 dígitos', () => {
    cy.contains('MFA').click();
    cy.get('input[type="text"][maxlength="6"]').type('123');
    cy.contains('button', /verificar|confirmar/i).click();
    cy.contains(/inválido|tamanho|muito curto|6 dígitos/i).should('be.visible');
  });
});