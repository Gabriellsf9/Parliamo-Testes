describe('Bookmarks & Pins', () => {
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

  it('deve fixar mensagem (pin)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para fixar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para fixar').should('be.visible');
    
    cy.contains('Mensagem para fixar').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="pin-trigger"]').click({ force: true });
    cy.get('[data-testid="pin-badge"]').should('be.visible');
  });

  it('deve adicionar aos favoritos (bookmark)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para favoritar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para favoritar').should('be.visible');
    
    cy.contains('Mensagem para favoritar').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="bookmark-trigger"]').click({ force: true });
    cy.get('@msgContainer').find('[data-testid="bookmark-active"]').should('be.visible');
  });

  it('deve abrir painel de pins', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="pins-panel-trigger"]').click({ force: true });
    cy.get('[data-testid="pins-panel"]').should('be.visible');
  });

  it('deve abrir painel de favoritos', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="bookmarks-panel-trigger"]').click({ force: true });
    cy.get('[data-testid="bookmarks-panel"]').should('be.visible');
  });
});