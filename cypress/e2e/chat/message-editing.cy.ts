describe('Message Editing', () => {
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

  it('deve editar uma mensagem própria', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem original para editar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem original para editar').should('be.visible');
    
    cy.contains('Mensagem original para editar').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    
    cy.get('textarea[placeholder*="Mensagem em"]').clear().type('Mensagem editada');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem editada').should('be.visible');
    cy.contains('Mensagem original para editar').should('not.exist');
  });

  it('deve cancelar edição de mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para cancelar edição');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para cancelar edição').should('be.visible');
    
    cy.contains('Mensagem para cancelar edição').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    
    cy.get('textarea[placeholder*="Mensagem em"]').clear().type('Texto cancelado');
    cy.contains('Cancelar').click({ force: true });
    cy.contains('Mensagem para cancelar edição').should('be.visible');
    cy.contains('Texto cancelado').should('not.exist');
  });

  it('deve mostrar indicador de mensagem editada', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem com indicador editado');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem com indicador editado').should('be.visible');
    
    cy.contains('Mensagem com indicador editado').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    
    cy.get('textarea[placeholder*="Mensagem em"]').clear().type('Mensagem editada com indicador');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem editada com indicador').should('be.visible');
    cy.contains('editado').should('be.visible');
  });
});