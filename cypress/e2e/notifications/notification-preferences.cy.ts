describe('Notification Preferences', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve abrir preferências de notificação', () => {
    cy.contains('Configurações').click({ force: true });
    cy.contains('Notificações').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('deve alternar notificações push', () => {
    cy.contains('Configurações').click({ force: true });
    cy.contains('Notificações').click({ force: true });
    cy.get('[data-testid="push-toggle"]').click({ force: true });
  });

  it('deve configurar notificações de menção', () => {
    cy.contains('Configurações').click({ force: true });
    cy.contains('Notificações').click({ force: true });
    cy.get('[data-testid="mention-toggle"]').click({ force: true });
  });
});