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

  it('deve apagar uma mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para apagar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Mensagem para apagar').should('be.visible');
    
    cy.contains('Mensagem para apagar').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Apagar').click({ force: true });
    cy.contains('Confirmar').click({ force: true });
    cy.contains('Mensagem para apagar').should('not.exist');
  });

  it('deve não permitir editar mensagem de outro usuário', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.contains('Mensagem de outro').should('be.visible');
    cy.contains('Mensagem de outro').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').should('not.be.visible');
  });

  it('deve manter histórico de edições', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Original');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Original').should('be.visible');
    
    cy.contains('Original').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').clear().type('Editado 1');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').clear().type('Editado 2');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    
    cy.contains('Original').should('not.exist');
    cy.contains('Editado 1').should('not.exist');
    cy.contains('Editado 2').should('be.visible');
    cy.contains('editado').should('be.visible');
  });

  it('deve preservar anexos ao editar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('img[alt="test-image.png"]').should('be.visible');
    
    cy.contains('test-image.png').parent().parent().parent().as('msgContainer');
    cy.get('@msgContainer').trigger('mouseover');
    cy.get('@msgContainer').find('[data-testid="message-menu-trigger"]').click({ force: true });
    cy.contains('Editar').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').type(' Editado com anexo');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('img[alt="test-image.png"]').should('be.visible');
  });
});