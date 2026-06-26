describe('Channel Settings', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve abrir modal de configurações do canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('button[title*="configurações"]').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Configurações do canal').should('be.visible');
  });

  it('deve alterar nome do canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('button[title*="configurações"]').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('input[placeholder*="nome"]').clear().type('novo-nome-canal');
    cy.contains('Salvar').click({ force: true });
    cy.contains('#novo-nome-canal').should('be.visible');
  });

  it('deve alterar descrição do canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('button[title*="configurações"]').click({ force: true });
    cy.get('textarea[placeholder*="descrição"]').clear().type('Nova descrição');
    cy.contains('Salvar').click({ force: true });
    cy.contains('Nova descrição').should('be.visible');
  });

  it('deve fechar modal de configurações', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('button[title*="configurações"]').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label*="fechar"]').click({ force: true });
    cy.get('[role="dialog"]').should('not.exist');
  });
});