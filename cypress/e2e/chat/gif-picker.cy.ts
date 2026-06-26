describe('Gif Picker', () => {
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

  it('deve abrir o GIF picker ao clicar no botão', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="gif-picker"]').should('be.visible');
  });

  it('deve buscar GIFs', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="gif-picker-search"]').type('happy');
    cy.get('[data-testid="gif-picker-results"] img').should('have.length.at.least', 1);
  });

  it('deve inserir GIF na mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="gif-picker-results"] img').first().click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').should('not.be.empty');
  });

  it('deve enviar mensagem com GIF', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="gif-picker-results"] img').first().click({ force: true });
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('img[src*="gif"]').should('be.visible');
  });
});