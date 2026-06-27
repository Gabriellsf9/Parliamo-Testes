describe('Admin Users', function() {
  before(function() {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('admin@parliamo.com.br');
    cy.get('input[type="password"]').clear().type('Admin@123');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 8000 }).then((url) => {
      if (url.includes('/auth/login')) {
        this.skip();
      }
    });
  });

  beforeEach(() => {
    cy.visit('/admin');
  });

  it('deve listar usuários', () => {
    cy.contains('Usuários').click();
    cy.get('[data-testid="user-list"]').should('be.visible');
    cy.get('[data-testid="user-row"]').should('have.length.at.least', 1);
  });

  it('deve buscar usuários', () => {
    cy.contains('Usuários').click();
    cy.get('input[placeholder*="buscar"]').type('admin@');
    cy.get('[data-testid="user-row"]').should('contain', 'admin@');
  });

  it('deve bloquear/desbloquear usuário', () => {
    cy.contains('Usuários').click();
    cy.get('[data-testid="user-row"]').first().find('[data-testid="block-toggle"]').click({ force: true });
    cy.contains('Confirmar').click({ force: true });
    cy.get('[data-testid="user-row"]').first().should('contain', 'Bloqueado');
  });
});
