describe('Message Reactions', () => {
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

  it('deve reagir a uma mensagem com emoji rápido', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para reagir');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para reagir').should('be.visible');
    
    cy.contains('Mensagem para reagir').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msgContainer').should('contain', '👍');
  });

  it('deve remover reação ao clicar novamente no mesmo emoji', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para testar remover reação');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para testar remover reação').should('be.visible');
    
    cy.contains('Mensagem para testar remover reação').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-❤️"]').click({ force: true });
    cy.get('@msgContainer').should('contain', '❤️');
    
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-❤️"]').click({ force: true });
    cy.get('@msgContainer').should('not.contain', '❤️');
  });

  it('deve adicionar múltiplas reações diferentes', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem multi-reactions');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem multi-reactions').should('be.visible');
    
    cy.contains('Mensagem multi-reactions').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-🎉"]').click({ force: true });
    cy.get('@msgContainer').should('contain', '👍').and('contain', '🎉');
  });

  it('deve mostrar contador de reações', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem com contador');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem com contador').should('be.visible');
    
    cy.contains('Mensagem com contador').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msgContainer').should('contain', '2');
  });

  it('deve reagir com emoji personalizado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste emoji custom');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste emoji custom').should('be.visible');
    
    cy.contains('Teste emoji custom').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-custom"]').click({ force: true });
    cy.get('@msgContainer').should('contain', 'custom');
  });

  it('deve mostrar tooltip ao hover na reação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste tooltip');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste tooltip').should('be.visible');
    
    cy.contains('Teste tooltip').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
    cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
    cy.get('@msgContainer').find('.reaction-emoji').first().trigger('mouseover');
    cy.get('[data-testid="reaction-tooltip"]').should('be.visible');
  });
});