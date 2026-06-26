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

  it('deve executar comando "Nova DM"', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('nova dm');
    cy.contains('Nova mensagem direta').click({ force: true });
    cy.get('[data-testid="new-dm-modal"]').should('be.visible');
  });

  it('deve executar comando "Configurações"', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('config');
    cy.contains('Configurações').click({ force: true });
    cy.get('[data-testid="settings-modal"]').should('be.visible');
  });

  it('deve navegar com setas', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid="command-palette"] [aria-selected="true"]').should('exist');
    cy.get('body').type('{downarrow}');
    cy.get('[data-testid="command-palette"] [aria-selected="true"]').should('exist');
  });

  it('deve executar comando selecionado com Enter', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('body').type('{downarrow}');
    cy.get('body').type('{enter}');
    cy.get('[data-testid="command-palette"]').should('not.exist');
  });

  it('deve fechar com ESC', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="command-palette"]').should('not.exist');
  });

  it('deve mostrar atalhos de teclado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"]').should('be.visible');
    cy.contains('⌘K').should('be.visible');
    cy.contains('⌘/').should('be.visible');
  });

  it('deve executar comando "Tema escuro"', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="command-palette"] input').type('tema escuro');
    cy.contains('Tema escuro').click({ force: true });
    cy.get('html').should('have.class', 'dark');
  });
});