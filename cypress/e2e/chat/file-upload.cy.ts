describe('File Upload', () => {
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

  it('deve abrir seletor de arquivo ao clicar no clipe', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').should('exist');
  });

  it('deve fazer upload de imagem e mostrar preview', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.get('[data-testid="file-upload-remove"]').should('be.visible');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('img[alt="test-image.png"]').should('be.visible');
  });

  it('deve fazer upload de arquivo PDF', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-document.pdf', { force: true });
    cy.get('[data-testid="file-upload-remove"]').should('be.visible');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('test-document.pdf').should('be.visible');
    cy.get('[data-testid="file-upload-download"]').should('be.visible');
  });

  it('deve remover arquivo pendente antes de enviar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.get('[data-testid="file-upload-remove"]').click({ force: true });
    cy.get('[data-testid="file-upload-remove"]').should('not.exist');
  });

  it('deve fazer upload de múltiplos arquivos', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile([
      'cypress/fixtures/test-image.png',
      'cypress/fixtures/test-document.pdf'
    ], { force: true });
    cy.get('[data-testid="file-upload-remove"]').should('have.length', 2);
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('img[alt="test-image.png"]').should('be.visible');
    cy.contains('test-document.pdf').should('be.visible');
  });

  it('deve rejeitar arquivo muito grande', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/large-file.zip', { force: true });
    cy.contains(/muito grande|tamanho excedido|limite/i).should('be.visible');
  });

  it('deve rejeitar tipo de arquivo não permitido', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/malware.exe', { force: true });
    cy.contains(/tipo não permitido|formato inválido|não suportado/i).should('be.visible');
  });

  it('deve mostrar progresso do upload', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.get('[data-testid="upload-progress"]').should('be.visible');
    cy.get('[data-testid="upload-progress"]').should('contain', '%');
  });

  it('deve permitir download do arquivo enviado', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-document.pdf', { force: true });
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('test-document.pdf').should('be.visible');
    cy.get('[data-testid="file-download"]').click({ force: true });
    cy.readFile('cypress/downloads/test-document.pdf').should('exist');
  });

  it('deve mostrar preview de imagem antes de enviar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('[data-testid="file-upload-trigger"]').click({ force: true });
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.get('[data-testid="file-preview"]').should('be.visible');
    cy.get('[data-testid="file-preview"]').should('have.attr', 'src');
  });
});