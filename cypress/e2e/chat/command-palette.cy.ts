describe('Command Palette', () => {
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

  it('deve abrir command palette com Cmd+K', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
  });

  it('deve mostrar comandos disponíveis', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
    cy.contains('Novo grupo').should('be.visible');
    cy.contains('Nova mensagem direta').should('be.visible');
    cy.contains('Configurações').should('be.visible');
  });

  it('deve filtrar comandos ao digitar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('grupo');
    cy.contains('Novo grupo').should('be.visible');
  });

  it('deve executar comando "Novo grupo"', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('novo grupo');
    cy.contains('Novo grupo').click({ force: true });
    cy.get('[data-testid="create-channel-modal"]').should('be.visible');
  });
});