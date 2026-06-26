describe('Audio Recorder', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve abrir gravador de áudio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-recorder"]').should('be.visible');
  });

  it('deve gravar e enviar áudio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(2000);
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-send-button"]').click({ force: true });
    cy.get('[data-testid="audio-player"]').should('be.visible');
  });
});