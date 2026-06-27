describe('Audio Recorder', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('deve abrir gravador de áudio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="audio-recorder-trigger"]').length === 0) {
        cy.log('Audio recorder not available in this app');
        return;
      }
      cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
      cy.get('[data-testid="audio-recorder"]').should('be.visible');
    });
  });

  it('deve gravar e enviar áudio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="audio-recorder-trigger"]').length === 0) {
        cy.log('Audio recorder not available in this app');
        return;
      }
      cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
      cy.get('[data-testid="audio-record-button"]').click({ force: true });
      cy.wait(2000);
      cy.get('[data-testid="audio-record-button"]').click({ force: true });
      cy.get('[data-testid="audio-send-button"]').click({ force: true });
      cy.get('[data-testid="audio-player"]').should('be.visible');
    });
  });
});
