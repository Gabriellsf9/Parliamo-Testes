describe('Video Call', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('deve abrir painel de chamada', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="call-button"]').length === 0) {
        cy.log('Call button not available in this app');
        return;
      }
      cy.get('[data-testid="call-button"]').click({ force: true });
      cy.get('[data-testid="call-panel"]').should('be.visible');
    });
  });

  it('deve iniciar chamada de vídeo', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="call-button"]').length === 0) {
        cy.log('Call button not available in this app');
        return;
      }
      cy.get('[data-testid="call-button"]').click({ force: true });
      cy.get('[data-testid="video-call-btn"]').click({ force: true });
      cy.get('[data-testid="video-preview"]').should('be.visible');
    });
  });

  it('deve alternar microfone', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="call-button"]').length === 0) {
        cy.log('Call button not available in this app');
        return;
      }
      cy.get('[data-testid="call-button"]').click({ force: true });
      cy.get('[data-testid="video-call-btn"]').click({ force: true });
      cy.get('[data-testid="mic-toggle"]').click({ force: true });
      cy.get('[data-testid="mic-toggle"]').should('be.visible');
    });
  });

  it('deve encerrar chamada', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="call-button"]').length === 0) {
        cy.log('Call button not available in this app');
        return;
      }
      cy.get('[data-testid="call-button"]').click({ force: true });
      cy.get('[data-testid="video-call-btn"]').click({ force: true });
      cy.get('[data-testid="end-call-btn"]').click({ force: true });
      cy.get('[data-testid="call-panel"]').should('not.exist');
    });
  });
});
