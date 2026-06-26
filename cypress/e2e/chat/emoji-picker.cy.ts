describe('Emoji Picker', () => {
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

  it('deve abrir o emoji picker ao clicar no botão', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="emoji-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="emoji-picker"]').should('be.visible');
  });

  it('deve inserir emoji na mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="emoji-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="emoji-picker-emoji-👍"]').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '👍');
  });

  it('deve inserir múltiplos emojis', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="emoji-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="emoji-picker-emoji-👍"]').click({ force: true });
    cy.get('[data-testid="emoji-picker-emoji-❤️"]').click({ force: true });
    cy.get('[data-testid="emoji-picker-emoji-🎉"]').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '👍❤️🎉');
  });

  it('deve fechar o emoji picker ao clicar fora', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="emoji-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="emoji-picker"]').should('be.visible');
    cy.get('body').click(0, 0);
    cy.get('[data-testid="emoji-picker"]').should('not.be.visible');
  });
});