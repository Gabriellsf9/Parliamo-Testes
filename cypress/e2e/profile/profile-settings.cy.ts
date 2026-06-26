describe('Profile Settings', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve abrir configurações do perfil', () => {
    cy.contains('Configurações').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Perfil').should('be.visible');
  });

  it('deve alterar nome do perfil', () => {
    cy.contains('Configurações').click({ force: true });
    cy.get('input[placeholder*="nome"]').clear().type('Novo Nome');
    cy.contains('Salvar').click({ force: true });
    cy.contains('Novo Nome').should('be.visible');
  });

  it('deve alternar tema', () => {
    cy.contains('Configurações').click({ force: true });
    cy.contains('Tema').click({ force: true });
    cy.contains('Escuro').click({ force: true });
    cy.get('html').should('have.class', 'dark');
  });

  it('deve fechar modal de configurações', () => {
    cy.contains('Configurações').click({ force: true });
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label*="fechar"]').click({ force: true });
    cy.get('[role="dialog"]').should('not.exist');
  });
});