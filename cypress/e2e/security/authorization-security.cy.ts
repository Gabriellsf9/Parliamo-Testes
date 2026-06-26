describe('Security: Authorization', () => {
  it('deve bloquear acesso não autorizado a admin', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').first().type('usuario@teste.com');
    cy.get('input[type="password"]').first().type('Senha@123');
    cy.get('button[type="submit"]').first().click({ force: true });
    cy.visit('/admin', { failOnStatusCode: false });
    cy.url().should('include', '/auth/login');
  });

  it('deve permitir admin acessar painel admin', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').first().type('admin@parliamo.com.br');
    cy.get('input[type="password"]').first().type('Admin@123');
    cy.get('button[type="submit"]').first().click({ force: true });
    cy.visit('/admin');
    cy.url().should('include', '/admin');
  });
});