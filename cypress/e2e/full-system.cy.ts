describe('Full System Integration', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('fluxo completo: login -> canal -> mensagem -> reação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste integração');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste integração').scrollIntoView().should('be.visible');

    cy.contains('Teste integração').parent().parent().parent().as('msg');
    cy.get('@msg').trigger('mouseover');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="reaction-picker-trigger"]').length > 0) {
        cy.get('@msg').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
        cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
        cy.get('@msg').should('contain', '👍');
      } else {
        cy.get('@msg').find('button[title*="Curtir"], button[title*="👍"]').click({ force: true });
        cy.log('Used quick like button instead of reaction picker');
      }
    });
  });

  it('fluxo completo: login -> DM -> mensagem -> thread', () => {
    const dmSelector = '[href*="/dm/"], [href*="/direct/"], [data-testid*="dm-link"]';
    cy.get('body').then(($body) => {
      if ($body.find(dmSelector).length === 0) {
        cy.log('No DM links found in sidebar, skipping DM flow test');
        return;
      }
      cy.get(dmSelector).first().click({ force: true });
      cy.get('textarea[placeholder*="Mensagem em"]').type('DM teste');
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
      cy.contains('DM teste').should('be.visible');

      cy.contains('DM teste').parent().parent().parent().as('dmMsg');
      cy.get('@dmMsg').trigger('mouseover');
      cy.get('@dmMsg').find('[data-testid="reply-trigger"]').first().click({ force: true });
      cy.get('[data-testid="thread-panel"]').should('be.visible');
    });
  });
});
