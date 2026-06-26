describe('Threads', () => {
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

  it('deve abrir thread ao responder mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para thread');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para thread').should('be.visible');
    
    cy.contains('Mensagem para thread').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="reply-trigger"]').first().click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('be.visible');
  });

  it('deve enviar resposta na thread', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para thread');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para thread').should('be.visible');
    
    cy.contains('Mensagem para thread').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="reply-trigger"]').first().click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('be.visible');
    
    cy.get('[data-testid="thread-panel"] textarea').type('Resposta na thread');
    cy.get('[data-testid="thread-panel"] button[type="submit"]').click({ force: true });
    cy.contains('Resposta na thread').should('be.visible');
  });

  it('deve fechar painel de thread', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para fechar thread');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para fechar thread').should('be.visible');
    
    cy.contains('Mensagem para fechar thread').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="reply-trigger"]').first().click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('be.visible');
    
    cy.get('[data-testid="thread-panel"] button[aria-label*="fechar"]').click({ force: true });
    cy.get('[data-testid="thread-panel"]').should('not.be.visible');
  });
});