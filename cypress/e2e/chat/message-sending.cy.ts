describe('Message Sending', () => {
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

  it('deve enviar mensagem de texto', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste de mensagem automática');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste de mensagem automática').should('be.visible');
  });

  it('deve enviar múltiplas mensagens em sequência', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Primeira mensagem');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Primeira mensagem').should('be.visible');
    
    cy.get('textarea[placeholder*="Mensagem em"]').type('Segunda mensagem');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Segunda mensagem').should('be.visible');
  });

  it('deve enviar mensagem com Enter (sem Shift)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem com Enter{enter}');
    cy.contains('Mensagem com Enter').should('be.visible');
  });

  it('deve permitir quebra de linha com Shift+Enter', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Linha 1{shift+enter}Linha 2{enter}');
    cy.contains('Linha 1').should('be.visible');
    cy.contains('Linha 2').should('be.visible');
  });

  it('deve desabilitar botão enviar quando input vazio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').clear();
    cy.get('button[type="submit"][style*="parliamo-accent"]').should('be.disabled');
  });
});