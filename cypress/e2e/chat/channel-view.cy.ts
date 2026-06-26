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

  it('deve exibir avatar e nome do remetente', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="message-list"]').should('be.visible');
    cy.get('[data-testid="message-author"]').should('be.visible');
  });

  it('deve mostrar timestamp das mensagens', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="message-timestamp"]').should('be.visible');
  });

  it('deve permitir scroll infinito de mensagens', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="message-list"]').scrollTo('top');
    cy.get('[data-testid="message-list"]').scrollTo('bottom');
    cy.get('[data-testid="message-list"]').children().should('have.length.greaterThan', 0);
  });

  it('deve destacar mensagem não lida', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="unread-indicator"]').should('be.visible');
  });

  it('deve mostrar indicador de digitação', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('teste');
    cy.get('[data-testid="typing-indicator"]').should('be.visible');
  });

  it('deve permitir fixar mensagem (pin)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.contains('Mensagem para fixar').should('be.visible');
    cy.contains('Mensagem para fixar').parent().parent().parent().as('msg');
    cy.get('@msg').trigger('mouseover');
    cy.get('@msg').find('[data-testid="pin-trigger"]').click({ force: true });
    cy.get('[data-testid="pin-badge"]').should('be.visible');
  });

  it('deve abrir thread ao clicar em responder', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.contains('Mensagem para thread').should('be.visible');
    cy.contains('Mensagem para thread').parent().parent().parent().as('msg');
    cy.get('@msg').trigger('mouseover');
    cy.get('@msg').find('[data-testid="reply-trigger"]').click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('be.visible');
  });

  it('deve mostrar reações na mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="reaction-emoji"]').should('be.visible');
  });
});