describe('Login', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('body').should('be.visible');
  });

  it('deve exibir formulário de login', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button[type="submit"]', 'Entrar').should('be.visible');
  });

  it('deve fazer login com credenciais válidas', () => {
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve mostrar erro para credenciais inválidas', () => {
    cy.get('input[type="email"]').clear().type('invalido@email.com');
    cy.get('input[type="password"]').clear().type('senhaerrada');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 15000 }).should('include', '/auth/login');
  });

  it('deve alternar para aba Recuperar', () => {
    cy.contains('Recuperar').click();
    cy.get('input[type="email"]').should('be.visible');
  });

  it('deve alternar para aba Magic Link', () => {
    cy.contains('Magic Link').click();
    cy.get('input[type="email"]').should('be.visible');
  });
});