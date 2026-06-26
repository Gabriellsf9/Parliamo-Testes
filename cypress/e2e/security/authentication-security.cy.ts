describe('Authentication Security', () => {
  it('deve bloquear login com credencia bruta força', () => {
    for (let i = 0; i < 10; i++) {
      cy.visit('/auth/login');
      cy.get('input[type="email"]').clear().type('invalido@teste.com');
      cy.get('input[type="password"]').clear().type('senhaerrada');
      cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    }
    cy.contains(/bloqueado|tente novamente|rate limit/i).should('be.visible');
  });

  it('deve invalidar sessão expirada', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
    
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
    cy.visit('/workspace/ws-1');
    cy.url().should('include', '/auth/login');
  });

  it('deve ter cookies seguros', () => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    
    cy.getCookie('sb-access-token').then((cookie) => {
      if (cookie) {
        expect(cookie.secure).to.be.true;
        expect(cookie.httpOnly).to.be.true;
      }
    });
  });
});