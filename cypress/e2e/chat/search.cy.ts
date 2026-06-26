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

  it('deve filtrar por canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('teste');
    cy.get('[data-testid="search-filter-channel"]').click({ force: true });
    cy.contains('#geral').click({ force: true });
    cy.contains('Mensagem única para busca').should('be.visible');
  });

  it('deve filtrar por usuário', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('teste');
    cy.get('[data-testid="search-filter-user"]').click({ force: true });
    cy.contains('souzagamer14').click({ force: true });
    cy.contains('Mensagem única para busca').should('be.visible');
  });

  it('deve navegar para mensagem ao clicar resultado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para navegar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para navegar').should('be.visible');
    
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('navegar');
    cy.contains('Mensagem para navegar').click({ force: true });
    cy.url().should('include', 'msg=');
  });

  it('deve buscar por data', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('ontem');
    cy.get('[data-testid="search-filter-date"]').click({ force: true });
    cy.get('[data-testid="date-picker"]').should('be.visible');
  });

  it('deve mostrar resultados paginados', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('teste');
    cy.get('[data-testid="search-results"]').children().should('have.length.at.least', 10);
    cy.get('[data-testid="search-load-more"]').click({ force: true });
    cy.get('[data-testid="search-results"]').children().should('have.length.greaterThan', 10);
  });

  it('deve destacar termo buscado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem com termo destacado');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem com termo destacado').should('be.visible');
    
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('destacado');
    cy.get('[data-testid="search-results"]').should('contain', 'destacado');
  });

  it('deve limpar busca', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('teste');
    cy.get('[data-testid="search-clear"]').click({ force: true });
    cy.get('[data-testid="search-modal"] input').should('have.value', '');
  });
});