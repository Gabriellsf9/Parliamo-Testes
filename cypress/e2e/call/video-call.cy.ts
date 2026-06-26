describe('Video Call', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve abrir painel de chamada', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="call-button"]').click({ force: true });
    cy.get('[data-testid="call-panel"]').should('be.visible');
  });

  it('deve iniciar chamada de vídeo', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="call-button"]').click({ force: true });
    cy.get('[data-testid="video-call-btn"]').click({ force: true });
    cy.get('[data-testid="video-preview"]').should('be.visible');
  });

  it('deve alternar microfone', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="call-button"]').click({ force: true });
    cy.get('[data-testid="video-call-btn"]').click({ force: true });
    cy.get('[data-testid="mic-toggle"]').click({ force: true });
  });

  it('deve encerrar chamada', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="call-button"]').click({ force: true });
    cy.get('[data-testid="video-call-btn"]').click({ force: true });
    cy.get('[data-testid="end-call-btn"]').click({ force: true });
    cy.get('[data-testid="call-panel"]').should('not.exist');
  });
});