describe('XSS Prevention', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve sanitizar script em mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('<script>alert("xss")</script>');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('<script>alert("xss")</script>').should('be.visible');
    cy.get('[data-testid="message-list"]').should('not.contain', '<script>');
  });

  it('deve sanitizar onerror em imagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('<img src=x onerror=alert(1)>');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('[data-testid="message-list"]').should('not.contain', 'onerror');
  });

  it('deve escapar HTML em busca', () => {
    cy.get('body').type('{meta}k');
    cy.get('[data-testid="search-modal"] input').type('<script>alert(1)</script>');
    cy.get('[data-testid="search-modal"]').should('not.contain', '<script>');
  });
});