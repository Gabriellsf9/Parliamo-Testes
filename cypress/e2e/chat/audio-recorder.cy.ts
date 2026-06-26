describe('Audio Recorder', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve carregar o canal corretamente', () => {
    cy.get('a[href*="/channel/"]').should('exist');
  });

  it('deve navegar para o canal ao clicar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
  });

  it('deve ter input de mensagem no canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
  });

  it('deve abrir gravador de áudio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-recorder"]').should('be.visible');
  });

  it('deve iniciar e parar gravação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').should('have.attr', 'aria-label', 'Parar gravação');
    cy.wait(1000);
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').should('have.attr', 'aria-label', 'Iniciar gravação');
  });

  it('deve cancelar gravação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-cancel-button"]').click({ force: true });
    cy.get('[data-testid="audio-recorder"]').should('not.be.visible');
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

  it('deve mostrar duração da gravação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(1500);
    cy.get('[data-testid="audio-duration"]').should('be.visible');
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
  });

  it('deve mostrar waveform durante gravação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-waveform"]').should('be.visible');
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
  });

  it('deve permitir pausar/retomar gravação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="audio-pause-button"]').click({ force: true });
    cy.get('[data-testid="audio-pause-button"]').should('have.attr', 'aria-label', 'Retomar');
    cy.get('[data-testid="audio-pause-button"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
  });

  it('deve deletar áudio gravado gravado antes de enviar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-delete-button"]').click({ force: true });
    cy.get('[data-testid="audio-recorder"]').should('not.be.visible');
  });

  it('deve reproduzir áudio enviado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-send-button"]').click({ force: true });
    cy.get('[data-testid="audio-player"]').should('be.visible');
    cy.get('[data-testid="audio-player-play"]').click({ force: true });
    cy.get('[data-testid="audio-player-play"]').should('have.attr', 'aria-label', 'Pausar');
  });

  it('deve mostrar duração do áudio enviado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="audio-recorder-trigger"]').click({ force: true });
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="audio-record-button"]').click({ force: true });
    cy.get('[data-testid="audio-send-button"]').click({ force: true });
    cy.get('[data-testid="audio-duration"]').should('be.visible');
  });
});