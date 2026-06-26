describe('Channel View', () => {
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

  it('deve exibir lista de mensagens no canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="message-list"]').should('exist');
  });

  it('deve mostrar nome do canal no header', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('h1, [data-testid="channel-header"]').should('be.visible');
  });

  it('deve permitir navegar entre canais pela sidebar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    const firstUrl = cy.url();
    cy.get('a[href*="/channel/"]').eq(1).click({ force: true });
    cy.url().should('not.equal', firstUrl);
  });

  it('deve mostrar botão de configurações do canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('button[title*="configurações" i], button[aria-label*="configurações" i]').should('exist');
  });
});