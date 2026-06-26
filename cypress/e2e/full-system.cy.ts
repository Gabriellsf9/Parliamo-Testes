describe('Full System Integration', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('fluxo completo: login -> canal -> mensagem -> reação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste integração');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste integração').should('be.visible');
    
    cy.contains('Teste integração').parent().parent().parent().as('msg');
    cy.get('@msg').trigger('mouseover');
    cy.get('@msg').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msg').should('contain', '👍');
  });

  it('fluxo completo: login -> DM -> mensagem -> thread', () => {
    cy.get('[href*="/dm/"]').first().click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').type('DM teste');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('DM teste').should('be.visible');
    
    cy.contains('DM teste').parent().parent().parent().as('dmMsg');
    cy.get('@dmMsg').trigger('mouseover');
    cy.get('@dmMsg').find('[data-testid="reply-trigger"]').first().click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('be.visible');
  });
});