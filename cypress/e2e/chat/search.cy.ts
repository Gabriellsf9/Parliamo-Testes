describe('Search', () => {
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

  it('deve abrir modal de busca com Cmd+K', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"]').should('be.visible');
  });

  it('deve buscar mensagens por termo', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem única para busca');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem única para busca').should('be.visible');
    
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('única para busca');
    cy.contains('Mensagem única para busca').should('be.visible');
  });

  it('deve fechar modal de busca', () => {
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"]').should('be.visible');
    cy.get('[data-testid="search-modal"] button[aria-label*="fechar"]').click({ force: true });
    cy.get('[data-testid="search-modal"]').should('not.be.visible');
  });
});